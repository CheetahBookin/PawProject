"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from "react"
import { givePermission } from "@/services/userService"

type UserContextType = {
    isLogged: boolean,
    setIsLogged: (value: boolean) => void
}

export const UserContext = createContext<UserContextType | null>(null)

export function useUserContext() {
    const context = useContext(UserContext)
    if(!context) {
        throw new Error('useUserContext must be used within a UserContextProvider')
    }
    return context
}

type UserContextProviderProps = {
    children: ReactNode
}

export function UserContextProvider({children}: UserContextProviderProps) {
    const [isLogged, setIsLogged] = useState<boolean>(false)

    useEffect(() => {
        const checkToken = async () => {
            const tokenExists: boolean = await checkTokenInCookies(); 
            setIsLogged(tokenExists);
        }
        checkToken()
    }, []);

    return (
        <UserContext.Provider value={{isLogged, setIsLogged}}>
            {children}
        </UserContext.Provider>
    )
}

const checkTokenInCookies = async() => {
    try {
        const response = await givePermission()
        if(response.status === 200) {
            return true
        }
        return false
    } catch (error) {
        console.log(error)
        return false
    }
}