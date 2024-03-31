import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const createUserProfile = async (req: Request, res: Response) => {
    try{
        const { userId, darkMode } = req.body;
        let { firstName, lastName, country, address, profileImage } = req.body;
        if(!userId){
            return res.status(400).json({ error: "Missing required information" })
        }
        if(!firstName){
            firstName = ""
        }else if(!lastName){
            lastName = ""
        }else if(!country){
            country = ""
        }else if(!address){
            address = ""
        }else if(!profileImage){
            profileImage = ""
        }
        const userProfile = await prisma.userProfile.create({
            data: {
                userId,
                firstName,
                lastName,
                country,
                address,
                profileImage,
                darkMode
            }
        })
        res.status(201).json(userProfile);
    }catch(error){
        res.status(500).json({ error: "Can't create user profile" })
    }
}

const getUserProfile = async (req: Request, res: Response) => {
    try{
        const userId = Number(req.params.id)
        if(!userId){
            return res.status(400).json({ error: "User id not found" })
        }
        const userProfile = await prisma.userProfile.findUnique({
            where: { userId }
        })
        if (!userProfile) {
            return res.status(400).json({ error: "User profile not found" })
        }
        res.status(200).json(userProfile);
    }catch(error){
        res.status(500).json({ error: "Can't reach user profile" })
    }
}

const updateUserProfile = async (req: Request, res: Response) => {
    try{
        const { userId, darkMode } = req.body;
        let { firstName, lastName, country, address, profileImage } = req.body;
        if(!userId){
            return res.status(400).json({ error: "Missing required information" })
        }
        if(!firstName){
            firstName = ""
        }else if(!lastName){
            lastName = ""
        }else if(!country){
            country = ""
        }else if(!address){
            address = ""
        }else if(!profileImage){
            profileImage = ""
        }
        const existingUserProfile = await prisma.userProfile.findUnique({
            where: { userId }
        })
        if (!existingUserProfile) {
            return res.status(400).json({ error: "User profile not found" })
        }
        const userProfile = await prisma.userProfile.update({
            where: { userId },
            data: {
                firstName,
                lastName,
                country,
                address,
                profileImage,
                darkMode
            }
        })
        res.status(200).json(userProfile);
    }catch(error){
        res.status(500).json({ error: "Can't update user profile" })
    }
}

const getMode = async (req: Request, res: Response) => {
    try{
        const userId = Number(req.params.id)
        if(!userId){
            return res.status(400).json({ error: "User id not found" })
        }
        const userProfile = await prisma.userProfile.findUnique({
            where: { userId }
        })
        if (!userProfile) {
            return res.status(400).json({ error: "User profile not found" })
        }
        let mode
        userProfile.darkMode ? mode = "dark" : mode = "light"
        res.status(200).json({ mode });
    }catch(error){
        res.status(500).json({ error: "Can't reach user profile" })
    }
}

export { createUserProfile, getUserProfile, updateUserProfile, getMode }