import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { MinimizedUser, FullUser } from '../types/User';
import nodemailer from 'nodemailer';
import argon2 from 'argon2';
import path from 'path';
import fs from 'fs';

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
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        const templatePath = path.join(__dirname, '..', 'templates', 'forgotPassword.html');
        let emailTemplate = fs.readFileSync(templatePath, 'utf-8');
        const logoPath = path.join(__dirname, '..', '..', '..', 'client', 'public', 'cheetahbooking-high-resolution-logo.png');
        emailTemplate = emailTemplate.replace('{{username}}', user.username);
        emailTemplate = emailTemplate.replace('{{resetCode}}', resetCode);
        emailTemplate = emailTemplate.replace('{{email}}', email);
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Reset your password',
            html: emailTemplate,
            attachments: [{
                filename: 'cheetahbooking-high-resolution-logo.png',
                path: logoPath,
                cid: 'logoID'
            }]
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
        console.log(error)
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