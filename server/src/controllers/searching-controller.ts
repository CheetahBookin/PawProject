import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface SearchRequest extends Request {
    body: {
      search: string;
    };
}

interface TripRequest extends Request {
    body: {
      city: string;
      dateFrom: string;
      dateTo: string;
      adult: number;
      children: number;
    };
}

const searchForHotel = async (req: SearchRequest, res: Response) => {
    const { search } = req.body;
    const hotels = await prisma.accomodation.findMany({
      where: {
        name: {
          contains: search
        }
      }
    });
    res.json(hotels);
}

const searchForCountryOrCity = async (req: SearchRequest, res: Response) => {
    const { search } = req.body;
    const countriesHotels = await prisma.accomodation.findMany({
      where: {
        country: {
          contains: search
        }
      }
    });
    const citiesHotels = await prisma.accomodation.findMany({
      where: {
        city: {
          contains: search
        }
      }
    });
    const countries = countriesHotels.map(hotel => hotel.country);
    const cities = citiesHotels.map(hotel => hotel.city);
    const uniqueCountries = [...new Set(countries)];
    const uniqueCities = [...new Set(cities)];
    res.json({countries: uniqueCountries, cities: uniqueCities});
}

const searchForTrip = async (req: TripRequest, res: Response) => {
    const { city, dateFrom, dateTo, adult, children } = req.body;
    const mergedDate = dateFrom + "-" + dateTo
    if(!children) req.body.children = 0;
    const hotels = await prisma.accomodation.findMany({
      where: {
        city: city
      },
      include: {
        Rooms: {
          where: {
            peopleCapacity: adult + children
          }
        },
        BookedDates: {
          select: {
            date: true
          }
        }
      }
    });
    hotels.map(hotel => {
        hotel.Rooms = hotel.Rooms.filter(room => room.peopleCapacity >= adult + children);
    });
    const calculatedPrice = hotels.map(hotel => {
        hotel.Rooms = hotel.Rooms.map(room => {
            return {
                ...room,
                price: room.priceForPerson * adult + room.childrenPrice * children
            }
        });
        return hotel;
    });
    const response = calculatedPrice.map(hotel => {
        return {
            name: hotel.name,
            address: hotel.address,
            city: hotel.city,
            country: hotel.country,
            type: hotel.type,
            Rooms: hotel.Rooms,
            wholeDate: mergedDate
        }
    })
    res.json(response);
}

export { searchForHotel, searchForTrip, searchForCountryOrCity };