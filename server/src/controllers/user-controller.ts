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

const updateEmail = async (req: Request, res: Response) => {
    try{
        const { userId, email } = req.body;
        if(!userId || !email){
            return res.status(400).json({ error: "Missing required information" })
        }
        const user = await prisma.user.findUnique({
            where: { id: userId }
        })
        if (!user) {
            return res.status(400).json({ error: "User not found" })
        }
        const mail = user.email
        if(mail === email){
            return res.status(400).json({ error: "New email can't be the same as the old one" });
        }
        await prisma.user.update({
            where: { id: userId },
            data: {
                email
            }
        })
        res.status(200).json({ message: "Email updated" });
    }catch(error){
        res.status(500).json({ error: "Can't update user profile" })
    }
}

const updatePassword = async (req: Request, res: Response) => {
    try{
        const { userId, currentPassword, newPassword } = req.body;
        if(!userId || !currentPassword || !newPassword){
            return res.status(400).json({ error: "Missing required information" })
        }
        const user = await prisma.user.findUnique({
            where: { id: userId }
        })
        if (!user) {
            return res.status(400).json({ error: "User not found" })
        }
        const isSamePassword = await argon2.verify(user.password, newPassword);
        if (isSamePassword) {
            return res.status(400).json({ error: "New password can't be the same as the old one" });
        }
        const isPasswordCorrect = await argon2.verify(user.password, currentPassword);
        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Incorrect current password" });
        }
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
        if (!passwordRegex.test(newPassword)) {
            return res.status(400).json({ error: "Your password must be at least 8 characters long, contain at least one number and have a mixture of uppercase and lowercase letters" })
        }
        const hashedPassword = await argon2.hash(newPassword);
        await prisma.user.update({
            where: { id: userId },
            data: {
                password: hashedPassword
            }
        })
        res.status(200).json({ message: "Password updated" });
    }catch(error){
        res.status(500).json({ error: "Can't update user profile" })
    }
}

const updatePhone = async (req: Request, res: Response) => {
    try{
        const { userId, phone } = req.body;
        if(!userId || !phone){
            return res.status(400).json({ error: "Missing required information" })
        }
        const user = await prisma.user.findUnique({
            where: { id: userId }
        })
        if (!user) {
            return res.status(400).json({ error: "User not found" })
        }
        const phoneNum = user.phoneNumber
        if(phoneNum === phone){
            return res.status(400).json({ error: "New phone number can't be the same as the old one" });
        }
        if(phone.length !== 9){
            return res.status(400).json({ error: "Phone number must be 9 digits long" });
        }
        await prisma.user.update({
            where: { id: userId },
            data: {
                phoneNumber: phone
            }
        })
        res.status(200).json({ message: "Phone updated" });
    }catch(error){
        res.status(500).json({ error: "Can't update user profile" })
    }
}

const updateNickname = async (req: Request, res: Response) => {
    try{
        const { userId, nickname } = req.body;
        if(!userId || !nickname){
            return res.status(400).json({ error: "Missing required information" })
        }
        const user = await prisma.user.findUnique({
            where: { id: userId }
        })
        if (!user) {
            return res.status(400).json({ error: "User not found" })
        }
        const nick = user.username
        if(nick === nickname){
            return res.status(400).json({ error: "New nickname can't be the same as the old one" });
        }
        await prisma.user.update({
            where: { id: userId },
            data: {
                username: nickname
            }
        })
        res.status(200).json({ message: "Nickname updated" });
    }catch(error){
        res.status(500).json({ error: "Can't update user profile" })
    }
}

export {
    getUserData,
    logout,
    givePermission,
    forgotPassword,
    resetPassword,
    updateEmail,
    updatePassword,
    updatePhone,
    updateNickname
}