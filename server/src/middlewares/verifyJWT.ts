import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

interface UserPayload {
    id: number
    email: string
}

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload
        }
    }
}

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" })
    }
    try{
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as UserPayload
        req.user = decoded
        next()
    }catch(err) {
        console.error(err)
        return res.status(401).json({ error: "Unauthorized" })
    }
}

export default verifyJWT