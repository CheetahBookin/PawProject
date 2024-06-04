import {Request, Response} from "express";
import {PrismaClient} from '@prisma/client'
import {getUserData, logout, givePermission, forgotPassword, resetPassword, updateEmail, updatePhone, updateNickname} from "../controllers/user-controller";
import nodemailer from 'nodemailer'
import fs from 'fs'
import path from 'path'
import argon2 from 'argon2'

jest.mock('@prisma/client', ()=>{
    const mPrismaClient = {
        user: {
            findUnique: jest.fn(),
            update: jest.fn()
        }
    }
    return{
        PrismaClient: jest.fn(()=> mPrismaClient)
    }
})

jest.mock('argon2', () => ({
    verify: jest.fn(),
    hash: jest.fn((password: string) => Promise.resolve(`hashed_${password}`))
}))

jest.mock('nodemailer')

const readFileSyncMock = jest.spyOn(fs, 'readFileSync').mockReturnValue('template content')

//tests for getUserData
describe('getUserData', ()=>{
    let req: Partial<Request>
    let res: Partial<Response>
    let prisma: PrismaClient

    beforeEach(()=>{
        req = {
            user: {
                email: 'test@example.com',
                id: 1
            }
        }
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
        prisma = new PrismaClient()
    })

    it('should return user data when user is found', async () => {
        const userData = {
            id: 1,
            username: 'testUser',
            email: 'test@example.com',
            orders: []
        };

        (prisma.user.findUnique as jest.Mock).mockReturnValue(userData)

        await getUserData(req as Request, res as Response)

        expect(prisma.user.findUnique).toHaveBeenCalledWith({
            where: { id: 1 },
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

        expect(res.json).toHaveBeenCalledWith(userData)
    })

    it('should return 400 if user is not found', async () => {
        (prisma.user.findUnique as jest.Mock).mockReturnValue(null)

        await getUserData(req as Request, res as Response)

        expect(prisma.user.findUnique).toHaveBeenCalledWith({
            where: { id: 1 },
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

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ error: "User not found" })
    });

    it('should return 500 if there is an error', async () => {
        (prisma.user.findUnique as jest.Mock).mockRejectedValue(new Error('Database error'))

        await getUserData(req as Request, res as Response)

        expect(prisma.user.findUnique).toHaveBeenCalledWith({
            where: { id: 1 },
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

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({ error: "Can't reach user data" })
    });
})

//tests for logout
describe('logout', ()=>{
    let req: Partial<Request>
    let res: Partial<Response>
    let json: jest.Mock
    let clearCookie: jest.Mock

    beforeEach(() => {
        req = {}
        json = jest.fn()
        clearCookie = jest.fn().mockReturnValue({ json })
        res = {
            json,
            clearCookie
        }
    })

    it('should clear the token cookie and return a message with redirect info', async () => {
        await logout(req as Request, res as Response)

        expect(clearCookie).toHaveBeenCalledWith("token")
        expect(json).toHaveBeenCalledWith({ message: "Logged out", redirectTo: "/login" })
    })
})

//tests for givePermission
describe('givePermission', ()=>{
    let req: Partial<Request>
    let res: Partial<Response>

    beforeEach(()=>{
        req = {}
        res = {
            json: jest.fn()
        }
    })

    it('should return a message indicating user is logged in', async () => {
        await givePermission(req as Request, res as Response)

        expect(res.json).toHaveBeenCalledWith({ message: "User is logged in" })
    })
})

//tests for forgotPassword
describe('forgotPassword', ()=>{
    let req: Partial<Request>
    let res: Partial<Response>
    let prisma: PrismaClient

    beforeEach(()=>{
        req = {
            body: { email: 'test@example.com' }
        }
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
        prisma = new PrismaClient();

        (nodemailer.createTransport as jest.Mock).mockReturnValue({
            sendMail: jest.fn().mockImplementation((mailOptions, callback) => {
                callback(null, { response: 'Email sent' });
            })
        })
    })

    it('should return error if user is not found', async () => {
        (prisma.user.findUnique as jest.Mock).mockReturnValue(null)

        await forgotPassword(req as Request, res as Response)

        expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: 'test@example.com' } })
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ error: "User not found" })
    })

    it('should send reset email if user is found', async () => {
        const user = { email: 'test@example.com', username: 'testUser' };

        (prisma.user.findUnique as jest.Mock).mockReturnValue(user)

        const updateMock = prisma.user.update as jest.Mock

        await forgotPassword(req as Request, res as Response)

        expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: 'test@example.com' } })
        expect(nodemailer.createTransport).toHaveBeenCalled()
        expect(readFileSyncMock).toHaveBeenCalledWith(path.join(__dirname, '..', 'templates', 'forgotPassword.html'), 'utf-8')
        expect(updateMock).toHaveBeenCalledWith({
            where: { email: 'test@example.com' },
            data: expect.objectContaining({ resetCode: expect.any(String) })
        })
        expect(res.json).toHaveBeenCalledWith({ message: "Reset code sent" })
    })

    it('should return 500 if there is an error during the process', async () => {
        (prisma.user.findUnique as jest.Mock).mockRejectedValue(new Error('Database error'))

        await forgotPassword(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({ error: "Can't send email" })
    })
})

//tests for resetPassword
describe('resetPassword', ()=>{
    let req: Partial<Request>
    let res: Partial<Response>
    let prisma: PrismaClient

    beforeEach(()=>{
        req = {
            body: {
                email: 'test@example.com',
                resetCode: 'validResetCode',
                newPassword: 'NewPassword123!'
            }
        }
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
        prisma = new PrismaClient()
    })

    it('should return error if user is not found', async () => {
        (prisma.user.findUnique as jest.Mock).mockReturnValue(null)

        await resetPassword(req as Request, res as Response)

        expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: 'test@example.com' } })
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ error: "User not found" })
    })

    it('should return error if reset code is invalid', async () => {
        const user = { email: 'test@example.com', resetCode: 'invalidResetCode' };

        (prisma.user.findUnique as jest.Mock).mockReturnValue(user)

        await resetPassword(req as Request, res as Response)

        expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: 'test@example.com' } })
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ error: "Invalid reset code" })
    })

    it('should return error if new password does not meet criteria', async () => {
        req.body.newPassword = 'short'

        const user = { email: 'test@example.com', resetCode: 'validResetCode' };

        (prisma.user.findUnique as jest.Mock).mockReturnValue(user)

        await resetPassword(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ error: "Your password must be at least 8 characters long, contain at least one number and have a mixture of uppercase and lowercase letters" })
    })

    it('should return error if new password is the same as the old one', async () => {
        const user = { email: 'test@example.com', resetCode: 'validResetCode', password: 'oldHashedPassword' };

        (prisma.user.findUnique as jest.Mock).mockReturnValue(user);
        (argon2.verify as jest.Mock).mockReturnValue(true)

        await resetPassword(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ error: "New password can't be the same as the old one" })
    })



    it('should return 500 if there is an error during the process', async () => {
        (prisma.user.findUnique as jest.Mock).mockRejectedValue(new Error('Database error'))

        await resetPassword(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({ error: "Can't reset password" })
    })
})

//tests for updateEmail
describe('updateEmail', ()=>{
    let req: Partial<Request>
    let res: Partial<Response>
    let prisma: PrismaClient

    beforeEach(()=>{
        req = {
            body: {
                userId: '1',
                email: 'newemail@example.com'
            }
        }
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
        prisma = new PrismaClient()
    })

    it('should return error if required information is missing', async () => {
        req.body = {}

        await updateEmail(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ error: "Missing required information" })
    })

    it('should return error if user is not found', async () => {
        (prisma.user.findUnique as jest.Mock).mockReturnValue(null)

        await updateEmail(req as Request, res as Response)

        expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: '1' } })
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ error: "User not found" })
    })

    it('should return error if new email is the same as the old one', async () => {
        const user = { id: '1', email: 'newemail@example.com' };

        (prisma.user.findUnique as jest.Mock).mockReturnValue(user)

        await updateEmail(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ error: "New email can't be the same as the old one" })
    })

    it('should update the email if everything is valid', async () => {
        const user = { id: '123', email: 'oldemail@example.com' };

        (prisma.user.findUnique as jest.Mock).mockResolvedValue(user)

        await updateEmail(req as Request, res as Response)

        expect(prisma.user.update).toHaveBeenCalledWith({
            where: { id: '1' },
            data: { email: 'newemail@example.com' }
        })
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({ message: "Email updated" })
    })

    it('should return 500 if there is an error during the process', async () => {
        (prisma.user.findUnique as jest.Mock).mockRejectedValue(new Error('Database error'))

        await updateEmail(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({ error: "Can't update user profile" })
    })
})

//tests for updatePhone
describe('updatePhone', ()=>{
    let req: Partial<Request>
    let res: Partial<Response>
    let prisma: PrismaClient

    beforeEach(()=>{
        req = {
            body: {
                userId: '1',
                phone: '123456789'
            }
        }
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
        prisma = new PrismaClient()
    })

    it('should return error if required information is missing', async () => {
        req.body = {};

        await updatePhone(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ error: "Missing required information" })
    })

    it('should return error if user is not found', async () => {
        (prisma.user.findUnique as jest.Mock).mockReturnValue(null)

        await updatePhone(req as Request, res as Response)

        expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: '1' } })
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ error: "User not found" })
    })

    it('should return error if new phone number is the same as the old one', async () => {
        const user = { id: '1', phoneNumber: '123456789' };

        (prisma.user.findUnique as jest.Mock).mockReturnValue(user)

        await updatePhone(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ error: "New phone number can't be the same as the old one" })
    })

    it('should return error if phone number is not 9 digits long', async () => {
        req.body.phone = '12345'
        const user = { id: '1', phoneNumber: '987654321' };

        (prisma.user.findUnique as jest.Mock).mockReturnValue(user)

        await updatePhone(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ error: "Phone number must be 9 digits long" })
    });

    it('should update the phone number if everything is valid', async () => {
        const user = { id: '1', phoneNumber: '987654321' };

        (prisma.user.findUnique as jest.Mock).mockReturnValue(user)

        await updatePhone(req as Request, res as Response)

        expect(prisma.user.update).toHaveBeenCalledWith({
            where: { id: '1' },
            data: { phoneNumber: '123456789' }
        })

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: "Phone updated" })
    })

    it('should return 500 if there is an error during the process', async () => {
        (prisma.user.findUnique as jest.Mock).mockRejectedValue(new Error('Database error'))

        await updatePhone(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({ error: "Can't update user profile" })
    })
})

//tests for updateNickname
describe('updateNickname', ()=>{
    let req: Partial<Request>
    let res: Partial<Response>
    let prisma: PrismaClient

    beforeEach(()=>{
        req = {
            body: {
                userId: '123',
                nickname: 'newNickname'
            }
        }
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
        prisma = new PrismaClient()
    })

    it('should return error if required information is missing', async () => {
        req.body = {};

        await updateNickname(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ error: "Missing required information" })
    })

    it('should return error if user is not found', async () => {
        (prisma.user.findUnique as jest.Mock).mockReturnValue(null)

        await updateNickname(req as Request, res as Response)

        expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: '1' } })
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ error: "User not found" })
    })

    it('should return error if new nickname is the same as the old one', async () => {
        const user = { id: '1', username: 'newNickname' };

        (prisma.user.findUnique as jest.Mock).mockResolvedValue(user)

        await updateNickname(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ error: "New nickname can't be the same as the old one" })
    })

    it('should update the nickname if everything is valid', async () => {
        const user = { id: '1', username: 'oldNickname' };

        (prisma.user.findUnique as jest.Mock).mockReturnValue(user)

        await updateNickname(req as Request, res as Response)

        expect(prisma.user.update).toHaveBeenCalledWith({
            where: { id: '123' },
            data: { username: 'newNickname' }
        })

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({ message: "Nickname updated" })
    })

    it('should return 500 if there is an error during the process', async () => {
        (prisma.user.findUnique as jest.Mock).mockRejectedValue(new Error('Database error'))

        await updateNickname(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({ error: "Can't update user profile" })
    })
})