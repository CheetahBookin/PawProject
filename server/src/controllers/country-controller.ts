import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getCountries = async (req: Request, res: Response) => {
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
}

const browseCitiesByCountry = async (req: Request, res: Response) => {
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
}

const browseHotelsByCity = async (req: Request, res: Response) => {
    const { city } = req.body;
    const hotels = await prisma.accomodation.findMany({
        where: {
            city: city
        },
        select: {
            name: true,
            images: {
                select: {
                    image: true
                },
                take: 1
            }
        },
    });
    res.json(hotels);
}

export {
    getCountries,
    browseCitiesByCountry,
    browseHotelsByCity
}