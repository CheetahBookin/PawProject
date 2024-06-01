import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import verifyJWT from "../middlewares/verifyJWT";

jest.mock('jsonwebtoken', () => ({
    verify: jest.fn()
}))

//tests for verifyJWT
describe('verifyJWT', ()=>{
    let req: Partial<Request>
    let res: Partial<Response>
    let next: jest.Mock

    beforeEach(() => {
        req = {
            cookies: {
                token: 'mockToken'
            }
        }
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
        next = jest.fn();
    })

    it('should return 401 if no token is provided', () => {
        req.cookies.token = undefined

        verifyJWT(req as Request, res as Response, next)

        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized' })
    })

    it('should return 401 if token verification fails', () => {
        (jwt.verify as jest.Mock).mockImplementation(() => {
            throw new Error('Invalid token');
        })

        verifyJWT(req as Request, res as Response, next)

        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized' })
    })

    it('should set user payload and call next if token verification succeeds', () => {
        const decodedPayload = { id: 1, email: 'test@example.com' };

        (jwt.verify as jest.Mock).mockReturnValue(decodedPayload)

        verifyJWT(req as Request, res as Response, next)

        expect(req.user).toEqual(decodedPayload)
        expect(next).toHaveBeenCalled()
    })
})