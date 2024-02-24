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

const verifyJWTForSocket = (token: string) => {
    if (!token) {
        return "Unauthorized"
    }
    try{
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as UserPayload
        return decoded
    }catch(err) {
        console.error(err)
        return "Unauthorized"
    }
}

export default verifyJWTForSocket