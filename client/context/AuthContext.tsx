import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { api } from "@/lib/axios";

export interface AuthContextType {
    isAuthenticated : boolean
}

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated : false
})

export const AuthProvider = ({ children } : { children : React.ReactNode }) => {
    const [user, setUser] = useState<AuthContextType>({ isAuthenticated : true });
    useEffect(() => {
        (async () => {
            const data = await api.get("/me");
            if (data.status === 200){
                setUser({ isAuthenticated : true });
            }else{
                setUser({ isAuthenticated : false });
            }
        })();
    } , []);
    return (
        <AuthContext.Provider value={{ isAuthenticated : user.isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}