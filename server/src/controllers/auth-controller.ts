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
        password: string
    }
}

const userValidation = (username: string, email: string, password: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    
    if (!username || !email || !password) {
        return "All fields are required";
    }

    if (!emailRegex.test(email)) {
        return "Invalid email address";
    }

    if (!passwordRegex.test(password)) {
        return "Your password must be at least 8 characters long, contain at least one number and have a mixture of uppercase and lowercase letters";
    }

    return true;
}

const login = async (req: AuthRequest, res: Response) => {
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
        return res.status(500).json({ error: "JWT not found" })
    }
    const token: string = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
    res.cookie("token", token, { httpOnly: true })
    res.json({ message: "Logged in" })
}

const register = async (req: AuthRequest, res: Response) => {
    const { username, email, password } = req.body as User
    const validation: string | boolean = userValidation(username, email, password)
    if (validation !== true) {
        return res.status(400).json({ error: validation })
    }
    const hashedPassword = await argon2.hash(password)
    const user: User = {
        username,
        email,
        password: hashedPassword
    }
    await prisma.user.create({
        data: user
    }).then(user => {
        res.status(201).json({ user })
    }).catch(error => {
        res.status(400).json({ error })
    })
}

export {
    login,
    register
}