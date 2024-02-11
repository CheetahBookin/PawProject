import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { MinimizedUser, FullUser } from '../types/User';

const prisma = new PrismaClient();

const getUserData = async (req: Request, res: Response) => {
    try{
        const userData = req.user as MinimizedUser
        const id = userData.id
        const user: FullUser | null = await prisma.user.findUnique({
            where: { id: id }
        })
        if (!user) {
            return res.status(400).json({ error: "User not found" })
        }
        res.json(user);
    }catch(error){
        res.status(500).json({ error: "Can't reach user data" })
    }
}

const logout = async (req: Request, res: Response) => {
    res.clearCookie("token").json({ message: "Logged out", redirectTo: "/login" });
}

const givePermission = async (req: Request, res: Response) => {
    res.json({ message: "User is logged in" })
}

export {
    getUserData,
    logout,
    givePermission
}