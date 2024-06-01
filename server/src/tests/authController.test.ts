import {Request, Response} from "express";
import {login} from "../controllers/auth-controller";
import {PrismaClient} from '@prisma/client'
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'

jest.mock('@prisma/client', ()=>{
    const mPrismaClient = {
        user: {
            create: jest.fn(),
            findUnique: jest.fn()
        }
    }
    return{
        PrismaClient: jest.fn(()=> mPrismaClient)
    }
})

jest.mock('argon2', () => ({
    verify: jest.fn()
}))

jest.mock('jsonwebtoken', () => ({
    sign: jest.fn()
}))

//tests for login
describe('login', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let prisma: PrismaClient;

    beforeEach(() => {
        req = {
            body: {}
        }
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            cookie: jest.fn()
        }
        prisma = new PrismaClient()
    })

    it('should return a 400 error if email or password is missing', async () => {
        req.body = { email: '', password: '' }

        await login(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ error: 'All fields are required' })
    })

    it('should return a 400 error if user is not found', async () => {
        req.body = { email: 'test@example.com', password: 'Password123!' };

        (prisma.user.findUnique as jest.Mock).mockReturnValue(null)

        await login(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ error: 'User not found' })
    })

    it('should return a 400 error if password is incorrect', async () => {
        req.body = { email: 'test@example.com', password: 'Password123!' }
        const mockUser = { id: 1, email: 'test@example.com', password: 'hashedPassword' };

        (prisma.user.findUnique as jest.Mock).mockReturnValue(mockUser);
        (argon2.verify as jest.Mock).mockReturnValue(false)

        await login(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ error: 'Incorrect Password' })
    });

    it('should return a 500 error if JWT_SECRET is not set', async () => {
        process.env.JWT_SECRET = ''
        req.body = { email: 'test@example.com', password: 'Password123!' }
        const mockUser = { id: 1, email: 'test@example.com', password: 'hashedPassword' };

        (prisma.user.findUnique as jest.Mock).mockReturnValue(mockUser);
        (argon2.verify as jest.Mock).mockReturnValue(true)

        await login(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' })
    })

    it('should return a 200 status and set a cookie with token if login is successful', async () => {
        process.env.JWT_SECRET = 'secret'
        req.body = { email: 'test@example.com', password: 'Password123!' }
        const mockUser = { id: 1, email: 'test@example.com', password: 'hashedPassword' }
        const mockToken = 'mockToken';

        (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
        (argon2.verify as jest.Mock).mockResolvedValue(true);
        (jwt.sign as jest.Mock).mockReturnValue(mockToken)

        await login(req as Request, res as Response)

        expect(prisma.user.findUnique).toHaveBeenCalledWith({
            where: { email: 'test@example.com' }
        })
        expect(argon2.verify).toHaveBeenCalledWith('hashedPassword', 'Password123!')
        expect(jwt.sign).toHaveBeenCalledWith({ id: mockUser.id }, 'secret')
        expect(res.cookie).toHaveBeenCalledWith('token', mockToken, { httpOnly: true })
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({ message: 'Logged in' })
    })

    it('should return a 500 error if something goes wrong', async () => {
        const error = new Error('Internal server error');

        (prisma.user.findUnique as jest.Mock).mockRejectedValue(error)

        await login(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({ error })
    })
})