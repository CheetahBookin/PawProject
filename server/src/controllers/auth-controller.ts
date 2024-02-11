import { Request, Response } from 'express'
import  { PrismaClient } from '@prisma/client'
import { User, FullUser } from '../types/User'
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

interface AuthRequest extends Request {
    body: {
        username: string
        email: string
        agreement: boolean
        password: string
        confirmPassword: string
    }
}

const userValidation = (username: string, email: string, agreement: boolean, password: string, confirmPassword: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    
    if (!username || !email || !password || !confirmPassword) {
        return "All fields are required";
    }

    if (!emailRegex.test(email)) {
        return "Invalid email address";
    }

    if (!passwordRegex.test(password)) {
        return "Your password must be at least 8 characters long, contain at least one number and have a mixture of uppercase and lowercase letters";
    }

    if (password !== confirmPassword) {
        return "Passwords do not match";
    }

    if (!agreement) {
        return "You must agree to the terms and conditions";
    }

    return true;
}

const login = async (req: AuthRequest, res: Response) => {
    try{
        const { email, password } = req.body as { email: string, password: string }
        const user: FullUser | null = await prisma.user.findUnique({
            where: { email }
        })
        if(!email || !password) {
            return res.status(400).json({ error: "All fields are required" })
        }
        if (!user) {
            return res.status(400).json({ error: "User not found" })
        }
        const validPassword = await argon2.verify(user.password, password)
        if (!validPassword) {
            return res.status(400).json({ error: "Incorrect Password" })
        }
        if(!process.env.JWT_SECRET) {
            return res.status(500).json({ error: "Internal server error" })
        }
        const token: string = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
        res.cookie("token", token, { httpOnly: true })
        res.status(200).json({ message: "Logged in" })
    }catch(error){
        res.status(500).json({ error })
    }
}

const register = async (req: AuthRequest, res: Response) => {
    try{
        const { username, email, agreement, password } = req.body as User
        const confirmPassword = req.body.confirmPassword as string
        const existingEmail: FullUser | null = await prisma.user.findUnique({
            where: { email }
        })
        const existingUser: FullUser | null = await prisma.user.findUnique({
            where: { username }
        })
        const validation: string | boolean = userValidation(username, email, agreement, password, confirmPassword)
        if (validation !== true) {
            return res.status(400).json({ error: validation })
        }
        const hashedPassword = await argon2.hash(password)
        const user: User = {
            username,
            email,
            agreement,
            password: hashedPassword
        }
        if (existingUser) {
            return res.status(400).json({ error: "Username is already taken" })
        }
        if (existingEmail) {
            return res.status(400).json({ error: "User with that email already exists" })
        }
        await prisma.user.create({
            data: user
        }).then(user => {
            res.status(201).json({ user })
        }).catch(error => {
            res.status(400).json({ error })
        })
    }catch(error){
        res.status(500).json({ error })
    }
}

export {
    login,
    register
}