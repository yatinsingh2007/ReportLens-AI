"use client"
import React, { useCallback, createContext, useState } from "react"

interface ChatRoomContextType {
    chatId : string
    setRoomId : (chatId : string) => void
}

export const ChatRoomContext = createContext<ChatRoomContextType>({
    chatId : "" ,
    setRoomId : () => {}
});


export const ChatRoomProvider = ({ children } : { children : React.ReactNode }) => {
    const [chatId, setChatId] = useState<string>("");
    
    const setRoomId = useCallback((chatId : string) => {
        setChatId(chatId)
    }, []);

    return (
        <ChatRoomContext.Provider value={{ chatId, setRoomId }}>
            {children}
        </ChatRoomContext.Provider>
    )
}