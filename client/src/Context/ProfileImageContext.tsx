"use client"

import { createContext, useState, useContext } from "react";

type ProfileImageContextType = {
  profileImage: string;
  setProfileImage: React.Dispatch<React.SetStateAction<string>>;
};

type ProfileImageProviderProps = {
    children: React.ReactNode;
};

const ProfileImageContext = createContext<ProfileImageContextType | undefined>(undefined);

export const ProfileImageProvider = ({ children }: ProfileImageProviderProps) => {
    const [profileImage, setProfileImage] = useState("/assets/profile.webp");

    return (
        <ProfileImageContext.Provider value={{ profileImage, setProfileImage }}>
            {children}
        </ProfileImageContext.Provider>
    );
}

export const useProfileImage = () => {
    const context = useContext(ProfileImageContext);
    if (context === undefined) {
        throw new Error("useProfileImage must be used within a ProfileImageProvider");
    }
    return context;
}