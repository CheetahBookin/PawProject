import {Request, Response} from "express";
import {PrismaClient} from '@prisma/client'
import verifyResetCode from "../middlewares/verifyResetCode";

jest.mock('@prisma/client', ()=>{
    const mPrismaClient = {
        user: {
            findUnique: jest.fn()
        }
    }
    return{
        PrismaClient: jest.fn(()=> mPrismaClient)
    }
})

//tests for verifyResetCode
describe('verifyResetCode', ()=>{
    let req: Partial<Request>
    let res: Partial<Response>
    let prisma: PrismaClient
    let next: jest.Mock

    beforeEach(() => {
        req = {
            body: {
                email: 'test@example.com',
                resetCode: '123456'
            }
        }
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
        prisma = new PrismaClient()
        next = jest.fn()
    })

    it('should return 400 if user is not found', async () => {
        (prisma.user.findUnique as jest.Mock).mockReturnValue(null)

        await verifyResetCode(req as Request, res as Response, next)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ error: 'User not found' })
        expect(next).not.toHaveBeenCalled()
    })

    it('should return 400 if reset code is invalid', async () => {
        (prisma.user.findUnique as jest.Mock).mockReturnValue({ resetCode: '111111' })

        await verifyResetCode(req as Request, res as Response, next)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ error: 'Invalid reset code' })
        expect(next).not.toHaveBeenCalled()
    })

    it('should call next if user and reset code are valid', async () => {
        (prisma.user.findUnique as jest.Mock).mockReturnValue({ resetCode: '123456' })

        await verifyResetCode(req as Request, res as Response, next)

        expect(res.status).not.toHaveBeenCalled()
        expect(res.json).not.toHaveBeenCalled()
        expect(next).toHaveBeenCalled()
    })
})