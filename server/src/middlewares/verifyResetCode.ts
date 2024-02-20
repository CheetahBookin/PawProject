import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const verifyResetCode = async (req: Request, res: Response, next: NextFunction) => {
    const { email, resetCode } = req.body;
    const user = await prisma.user.findUnique({
        where: { email: email }
    })
    if (!user) {
        return res.status(400).json({ error: "User not found" })
    }
    if (user.resetCode !== resetCode) {
        return res.status(400).json({ error: "Invalid reset code" })
    }
    next();
}

export default verifyResetCode;