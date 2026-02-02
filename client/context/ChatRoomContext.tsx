"use client"
import React, { useEffect } from "react"
import { ChatRoom } from "@/components/DashboardPage"

import { createContext } from "react";

interface ChatRoomContextType {
    chatId : string
    setRoomId : (chatId : string) => void
}

export const ChatRoomContext = createContext<ChatRoomContextType>({
    chatId : "" ,
    setRoomId : (chatId : string) => {}
});


export const ChatRoomProvider = ({ children } : { children : React.ReactNode }) => {
    const [chatId, setChatId] = React.useState<string>("");
    const setRoomId = (chatId : string) => {
        setChatId(chatId)
    }
    return (
        <ChatRoomContext.Provider value={{ chatId, setRoomId }}>
            {children}
        </ChatRoomContext.Provider>
    )
}