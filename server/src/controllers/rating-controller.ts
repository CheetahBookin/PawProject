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
  }
  );
  res.json(ratings);
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
    const {rating, comment, userId, hotelId} = req.body;

    const existingRating = await prisma.rates.findFirst({
        where: {
            userId: userId,
            hotelId: hotelId
        }
    })

    if(existingRating) {
        const updatedRating = await prisma.rates.update({
            where: {
                id: existingRating.id
            },
            data: {
                rate: rating,
                message: comment
            }
        })

        res.json(updatedRating)
    }
    else{
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
}

const existingRating = async(req: Rating, res: Response)=>{
    const {userId, hotelId} = req.body

    const _existingRating = await prisma.rates.findFirst({
        where:{
            userId: userId,
            hotelId: hotelId
        }
    })

    if(_existingRating){
        res.send(true)
    }
    else{
        res.send(false)
    }
}

const deleteRating = async(req: Rating, res: Response)=>{
    const {userId, hotelId} = req.body

    await prisma.rates.deleteMany({
        where:{
            userId: userId,
            hotelId: hotelId
        }
    })
}

export { getRatings, postRating, existingRating, deleteRating, getUsersRatings}