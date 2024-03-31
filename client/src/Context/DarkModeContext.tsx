"use client"

import { getMode, updateUserProfile } from "@/services/userProfileService";
import { createContext, useEffect, useState } from "react";
import { useUserContext } from "./userContext";
import { getUser } from "@/services/userService";
import { User } from "@/types/userTypes";
import { useRouter } from "next/navigation";

type DarkModeContextType = {
    mode: string;
    updateProfile: (userId: number, firstName: string, lastName: string, country: string, address: string, profileImage: string, darkMode: boolean) => Promise<string | undefined>;
};

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export const DarkModeProvider = ({ children }: { children: React.ReactNode }) => {
    const { setIsLogged } = useUserContext();
    const [user, setUser] = useState<User | null>(null);
    const [mode, setMode] = useState<"light" | "dark">("light");
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUser();
            if (user.status === 200) {
                document.title = `Dashboard - ${user.data.username}`;
                setUser(user.data);
                setIsLogged(true);
            } else {
                setIsLogged(false);
                router.push("/login");
            }
        };
        fetchUser();
    }, []);

    const updateProfile = async (userId: number, firstName: string, lastName: string, country: string, address: string, profileImage: string, darkMode: boolean) => {
        const response = await updateUserProfile(userId, firstName, lastName, country, address, profileImage, darkMode);
        if (response.status === 200) {
            return "updated"
        }
    }

    useEffect(() => {
        const getModeFromServer = async () => {
          if (user) {
            const mode = await getMode(user.id)
            if (mode.status === 200) {
              setMode(mode.data.mode)
            }
          }
        }
        getModeFromServer()
      }, [user])

    useEffect(() => {
        document.body.className = mode
    }, [mode])

    return (
        <DarkModeContext.Provider value={{ mode, updateProfile }}>
            {children}
        </DarkModeContext.Provider>
    );
}

export { DarkModeContext }