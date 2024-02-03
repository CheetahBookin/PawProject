import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface Rating extends Request {
    body: {
        rating: number;
        comment: string;
        userId: number;
        hotelId: number;
    }
}

const getRatings = async (req: Request, res: Response) => {
  const ratings = await prisma.rates.findMany();
  res.json(ratings);
}

const postRating = async (req: Rating, res: Response) => {
    const { rating, comment, userId, hotelId } = req.body;
    const newRating = await prisma.rates.create({
        data: {
            hotelId: hotelId,
            userId: userId,
            rate: rating,
            message: comment,
            date: new Date()
        }
    });
    res.json(newRating);
}

export { getRatings, postRating }