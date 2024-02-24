import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { MinimizedUser, FullUser } from '../types/User';
import nodemailer from 'nodemailer';
import argon2 from 'argon2';

const prisma = new PrismaClient();

const getUserData = async (req: Request, res: Response) => {
    try{
        const userData = req.user as MinimizedUser
        const id = userData.id
        const user: FullUser | null = await prisma.user.findUnique({
            where: { id: id },
            include: {
                orders: {
                    select: {
                        id: true,
                        fromDate: true,
                        toDate: true,
                        adults: true,
                        children: true,
                        hotelId: true,
                        roomId: true,
                        fullPrice: true,
                        paid: true,
                        createdAt: true
                    }
                }
            }

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

const forgotPassword = async (req: Request, res: Response) => {
    try{
        const { email } = req.body;
        const user = await prisma.user.findUnique({
            where: { email: email }
        })
        if (!user) {
            return res.status(400).json({ error: "User not found" })
        }
        const generateUniqueCode = () => {
            return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
        }
        const resetCode = generateUniqueCode();
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        var mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Reset your password',
            html: `
                <p><h2>Hi ${user.username}!</h2></p>
                <p>Your reset code is: ${resetCode}</p>
                <p>Please visit this link to finish resetting your password: <a href="http://localhost:3000/reset-password/${email}">Reset Password</a></p>
                <p>If you didn't request this, please ignore this email. Your password won't change.</p>
                <p>Thanks, CheetahBooking Inc.</p>
                <p><img src="https://raw.githubusercontent.com/CheetahBookin/PawProject/main/client/public/cheetahbooking-high-resolution-logo.png?token=GHSAT0AAAAAACND6ZR2YX4GPR7YXWPCQOUCZOVDGCQ" alt="CheetahBooking Logo" style="width: 350px;"></p>
            `
        };        
        transporter.sendMail(mailOptions, async function(error, info){
            if (error) {
                return res.status(500).json({ error: "Can't send email" })
            } else {
                await prisma.user.update({
                    where: { email: email },
                    data: {
                        resetCode: resetCode
                    }
                })
                res.json({ message: "Reset code sent" })
            }
        });
    }catch(error){
        res.status(500).json({ error: "Can't send email" })
    }
}

const resetPassword = async (req: Request, res: Response) => {
    try{
        const { email, resetCode, newPassword } = req.body;
        console.log(email, resetCode, newPassword)
        const user = await prisma.user.findUnique({
            where: { email: email }
        })
        if (!user) {
            return res.status(400).json({ error: "User not found" })
        }
        if (user.resetCode !== resetCode) {
            return res.status(400).json({ error: "Invalid reset code" })
        }
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
        if (!passwordRegex.test(newPassword)) {
            return res.status(400).json({ error: "Your password must be at least 8 characters long, contain at least one number and have a mixture of uppercase and lowercase letters" })
        }
        const isSamePassword = await argon2.verify(user.password, newPassword);
        if (isSamePassword) {
            return res.status(400).json({ error: "New password can't be the same as the old one" });
        }
        const hashedPassword = await argon2.hash(newPassword);
        const updatedUser = await prisma.user.update({
            where: { email: email },
            data: {
                password: hashedPassword
            }
        })
        if(updatedUser){
            await prisma.user.update({
                where: { email: email },
                data: {
                    resetCode: null
                }
            })
        }
        res.json({ message: "Password updated" })
    }catch(error){
        res.status(500).json({ error: "Can't reset password" })
    }
}

export {
    getUserData,
    logout,
    givePermission,
    forgotPassword,
    resetPassword
}