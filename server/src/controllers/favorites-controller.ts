import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const postFavorite = async (req: Request, res: Response) => {
    try{
        const { userId, hotelId } = req.body;
        if(!userId || !hotelId){
            return res.status(400).json({ error: "Missing required information" })
        }
        const existingFavorite = await prisma.favorites.findFirst({
            where: { userId, accommodationId: hotelId }
        })
        if (existingFavorite) {
            return res.status(400).json({ error: "Accomodation is already in favorites" })
        }
        const favorite = await prisma.favorites.create({
            data: {
                userId,
                accommodationId: hotelId
            }
        })
        res.status(201).json({ favorite, message: "Accomodation added to favorites" });
    }catch(error){
        res.status(500).json({ error: "Can't add accomodation to favorites" })
    }
}

const getFavorites = async (req: Request, res: Response) => {
    try{
        const userId = Number(req.params.id)
        if(!userId){
            return res.status(400).json({ error: "User id not found" })
        }
        const favorites = await prisma.favorites.findMany({
            where: { userId }
        })
        if (!favorites) {
            return res.status(400).json({ error: "You have no favorites added" })
        }
        res.status(200).json(favorites);
    }catch(error){
        res.status(500).json({ error: "Can't reach favorites" })
    }
}

const getFavoritesHotels = async (req: Request, res: Response) => {
    try{
        const userId = Number(req.params.id)
        if(!userId){
            return res.status(400).json({ error: "User id not found" })
        }
        const favorites = await prisma.favorites.findMany({
            where: { userId }
        })
        if (!favorites) {
            return res.status(400).json({ error: "You have no favorites added" })
        }
        const favoritesIds = favorites.map((favorite: any) => favorite.accommodationId);
        const hotels = await prisma.accomodation.findMany({
            where: { id: { in: favoritesIds } },
            select: {
                id: true,
                name: true,
                images: true
            }
        })
        res.status(200).json(hotels);
    }catch(error){
        res.status(500).json({ error: "Can't reach favorites" })
    }
}

const removeFavorite = async (req: Request, res: Response) => {
    try{
        const { userId, hotelId } = req.body;
        if(!userId || !hotelId){
            return res.status(400).json({ error: "Missing required information" })
        }
        const existingFavorite = await prisma.favorites.findFirst({
            where: { userId, accommodationId: hotelId }
        })
        if (!existingFavorite) {
            return res.status(400).json({ error: "Accomodation is not in favorites" })
        }
        await prisma.favorites.deleteMany({
            where: { userId, accommodationId: hotelId }
        })
        res.status(200).json({ message: "Accomodation removed from favorites" });
    }catch(error){
        console.log(error)
        res.status(500).json({ error: "Can't remove accomodation from favorites" })
    }
}

export { postFavorite, getFavorites, removeFavorite, getFavoritesHotels }