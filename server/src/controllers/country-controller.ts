import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getCountries = async (req: Request, res: Response) => {
    try{
        const countries = await prisma.accomodation.findMany({
            select: {
                country: true,
                flag_url: true
            }
        });
        const uniqueCountries = countries.filter((country: any, index: any, self: any) =>
            index === self.findIndex((t: any) => t.country === country.country)
        );
        res.json(uniqueCountries);
    }catch(error){
        res.status(500).json({error: 'Internal server error'})
    }
}

const browseCitiesByCountry = async (req: Request, res: Response) => {
    try{
        const { country } = req.body;
        const cities = await prisma.accomodation.findMany({
            where: {
                country: country
            },
            select: {
                city: true
            }
        });
        const uniqueCities = cities.filter((city: any, index: any, self: any) =>
            index === self.findIndex((t: any) => t.city === city.city)
        );
        res.json(uniqueCities);
    }catch(error){
        res.status(500).json({error: 'Internal server error'})
    }
}

const browseHotelsByCity = async (req: Request, res: Response) => {
    try{
        const { city } = req.body;
        const hotels = await prisma.accomodation.findMany({
            where: {
                city: city
            },
            select: {
                id: true,
                name: true,
                images: {
                    select: {
                        image: true
                    },
                    take: 1
                }
            }
        });
        res.json(hotels);
    }catch(error){
        res.status(500).json({error: 'Internal server error'})
    }
}

export {
    getCountries,
    browseCitiesByCountry,
    browseHotelsByCity
}