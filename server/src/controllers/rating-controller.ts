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

const getRatings = async (req: Rating, res: Response) => {
    try {
        const {hotelId} = req.body
        const ratings = await prisma.rates.findMany({
                where: {hotelId: hotelId},
                select: {
                    rate: true,
                    message: true,
                    userId: true,
                    hotelId: true,
                    user: {select: {username: true}}
                }
            })
        res.status(200).json(ratings)
    }catch (err){
        res.status(500).json({ error: "Can't get ratings" })
    }
}

const getUsersRatings = async (req: Rating, res: Response) => {
    const userId = Number(req.params.id)
    if(!userId){
        return res.status(400).json({error: "User id not found"})
    }
    const ratings = await prisma.rates.findMany({
        where: {userId: userId},
        select: {
            rate: true,
            message: true,
            accomodation: {select: {name: true}}
        }
    })
    const numberOfRatings = ratings.length
    res.status(200).json({ratings, numberOfRatings})
}

const postRating = async (req: Rating, res: Response) =>{
    try {
        const {rating, comment, userId, hotelId} = req.body;

        const existingRating = await prisma.rates.findFirst({
            where: {
                userId: userId,
                hotelId: hotelId
            }
        })

        if (existingRating) {
            const updatedRating = await prisma.rates.update({
                where: {
                    id: existingRating.id
                },
                data: {
                    rate: rating,
                    message: comment
                }
            })

            res.status(201).json(updatedRating)
        } else {
            const newRating = await prisma.rates.create({
                data: {
                    hotelId: hotelId,
                    userId: userId,
                    rate: rating,
                    message: comment,
                    date: new Date()
                }
            });
            res.status(201).json(newRating);
        }
    }catch (err){
        res.status(500).json({ error: "Can't post rating" })
    }
}

const existingRating = async(req: Rating, res: Response)=>{
    try {
        const {userId, hotelId} = req.body

        const _existingRating = await prisma.rates.findFirst({
            where: {
                userId: userId,
                hotelId: hotelId
            }
        })

        if (_existingRating) {
            res.send(true)
        } else {
            res.send(false)
        }
    }catch (err){
        res.status(500).json({ error: "Internal server error" })
    }
}

const deleteRating = async(req: Rating, res: Response)=>{
    try {
        const {userId, hotelId} = req.body

        await prisma.rates.deleteMany({
            where: {
                userId: userId,
                hotelId: hotelId
            }
        })
        res.status(200).json({message: "Rating deleted"})
    }catch (err){
        res.status(500).json({ error: "Can't delete rating" })
    }
}

export { getRatings, postRating, existingRating, deleteRating, getUsersRatings}