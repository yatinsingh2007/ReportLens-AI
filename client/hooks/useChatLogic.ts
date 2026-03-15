import { useState, useRef, useEffect, useContext } from "react";
import { toast } from "react-hot-toast";
import { api } from "@/lib/axios";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { ChatRoomContext } from "@/context/ChatRoomContext";
import { AuthContext } from "@/context/AuthContext";
import { Message, ChatRoom } from "@/components/DashboardPage";

export function useChatLogic() {
    const router = useRouter();
    const { isAuthenticated } = useContext(AuthContext);
    const { chatId, setRoomId } = useContext(ChatRoomContext);
    
    const [messages, setMessages] = useState<Message[]>([]);
    const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
    const [showDashboard, setShowDashboard] = useState<boolean>(true);
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    
    const [inputValue, setInputValue] = useState<string>("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (!isAuthenticated) router.push('/login');
    }, [isAuthenticated, router]);

    const callChatIds = async (): Promise<void> => {
        try {
            const res = await api.get('/api/chat/getAllChatIds', { withCredentials: true });
            const chatData: ChatRoom[] = res.data;
            setChatRooms(chatData);
            if (chatData.length > 0) {
                setRoomId(chatData[0].id);
                setShowDashboard(true);
            } else {
                setShowDashboard(false);
            }
        } catch (err) {
            console.error(err);
            if (isAxiosError(err)) {
                if (err.response?.status === 401) {
                    router.push('/login');
                    toast.error("Unauthorized. Please Login.");
                }
                if (err.response?.status === 404) setShowDashboard(false);
            }
        }
    };

    const getAllMessagesOfChat = async (currentChatId: string): Promise<void> => {
        try {
            const res = await api.get(`/api/chat/messages/${currentChatId}`, { withCredentials: true });
            setMessages(res.data);
        } catch (err) {
            console.error("Error fetching messages:", err);
            toast.error("Could not load chat history");
        }
    };

    useEffect(() => {
        callChatIds();
    }, []);

    useEffect(() => {
        if (!chatId) return;
        getAllMessagesOfChat(chatId);
    }, [chatId]);

    const handleFileUpload = async (files: File[], query?: string): Promise<void | string> => {
        if (!chatId) {
            toast.error("Please select a chat first");
            return;
        }

        const file = files[0];
        const optimisticContent = query ? `${file.name}\n\nQuestion: ${query}` : file.name;
        const optimisticFileMessage: Message = {
            id: `file-opt-${Date.now()}`,
            role: "user",
            content: optimisticContent,
            filePresent: true,
        };
        setMessages((prev) => [...prev, optimisticFileMessage]);

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("chatId", chatId);
            if (query) formData.append("query", query);
            
            const resp = await api.post("/api/chat/fileUpload", formData);
            const data = resp.data;
            
            if (data?.id && data?.content !== undefined) {
                setMessages((prev) =>
                    prev.map((m) =>
                        m.id === optimisticFileMessage.id
                            ? { id: data.id, role: "user" as const, content: data.content, filePresent: !!data.filePresent }
                            : m
                    )
                );
            }
            setSelectedFile(null);
            toast.success("File uploaded successfully");
        } catch (err) {
            console.error(err);
            toast.error("Failed to upload file");
            setMessages((prev) => prev.filter((m) => m.id !== optimisticFileMessage.id));
        }
    };

    const handleCreateChat = async (e?: React.MouseEvent) => {
        if (e) e.preventDefault();
        try {
            const resp = await api.post("/api/chat/create", {}, { withCredentials: true });
            if (resp.data.message === "chat created successfully") {
                toast.success("New conversation created");
                await callChatIds();
            }
        } catch (e) {
            console.error(e);
            toast.error("Failed to create conversation");
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleRemoveStagedFile = () => {
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!inputValue.trim() && !selectedFile) return;

        const newMsg = inputValue.trim();
        setInputValue("");

        if (selectedFile) {
            setIsGenerating(true);
            await handleFileUpload([selectedFile], newMsg || undefined);
            setIsGenerating(false);
            return;
        }

        const optimisticUserMessage: Message = {
            id: `opt-${Date.now()}`,
            role: "user",
            content: newMsg,
        };
        setMessages((prev) => [...prev, optimisticUserMessage]);
        setIsGenerating(true);

        try {
            const resp = await api.post("/api/chat/userQuery", {
                query: newMsg,
                chatId: chatId,
            }, { withCredentials: true });
            const data = resp.data;
            setMessages(Array.isArray(data) ? data : data?.messages ? data.messages : []);
        } catch (err) {
            toast.error("Failed to send message");
            setMessages((prev) => prev.filter((m) => m.id !== optimisticUserMessage.id));
            console.error(err);
        } finally {
            setIsGenerating(false);
        }
    };

    return {
        messages, setMessages,
        chatRooms,
        showDashboard,
        isGenerating,
        inputValue,
        selectedFile,
        isMobileMenuOpen, setIsMobileMenuOpen,
        fileInputRef,
        handleFileUpload,
        handleCreateChat,
        handleFileSelect,
        handleRemoveStagedFile,
        triggerFileInput,
        handleInputChange,
        handleSubmit
    };
}
