import { Request, Response } from 'express'

interface AuthRequest extends Request {
    body: {
        nick: string
        email: string
        password: string
    }
}

const login = (req: AuthRequest, res: Response) => {
    const { email, password } = req.body
}

const register = (req: AuthRequest, res: Response) => {
    const { nick, email, password } = req.body
}

export {
    login,
    register
}