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
      destination: string;
      dateFrom: string;
      dateTo: string;
      adult: number;
      children: number;
    };
}

const searchForHotel = async (req: SearchRequest, res: Response) => {
  try{
    const { search } = req.body;
    const hotels = await prisma.accomodation.findMany({
      where: {
        name: {
          contains: search
        }
      }
    });
    res.json(hotels);
  }catch(err){
    res.status(500).json({error: "Something went wrong"});
  }
}

const searchForCountryOrCity = async (req: SearchRequest, res: Response) => {
  try{
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
    const countries = countriesHotels.map((hotel: any) => hotel.country);
    const cities = citiesHotels.map((hotel: any) => hotel.city);
    const uniqueCountries = [...new Set(countries)];
    const uniqueCities = [...new Set(cities)];
    res.json({countries: uniqueCountries, cities: uniqueCities});
  }catch(err){
    res.status(500).json({error: "Something went wrong"});
  }
}

const searchForTrip = async (req: TripRequest, res: Response) => {
  try {
    const { destination, dateFrom, dateTo, adult, children } = req.body;
    if (!children) req.body.children = 0;
    if (!destination) return res.status(400).json({ error: "You have to go somewhere" });
    if (!adult) return res.status(400).json({ error: "There must be at least one adult on the trip" });
    const dateFromParsed = new Date(dateFrom);
    const dateToParsed = new Date(dateTo);
    if (dateFromParsed > dateToParsed) return res.status(400).json({ error: "You can't go back in time dumbass" });
    if (dateFromParsed < new Date()) return res.status(400).json({ error: "You can't go back in time dumbass" });
    const nightsCount = Math.floor((dateToParsed.getTime() - dateFromParsed.getTime()) / (1000 * 3600 * 24));
    const hotels = await prisma.accomodation.findMany({
      where: {
        OR: [
          {
            city: destination
          },
          {
            country: destination
          }
        ]
      },
      include: {
        Rooms: {
          where: {
            peopleCapacity: adult + children
          }
        },
        images: {
          select: {
            image: true
          }
        }
      }
    });
    hotels.forEach((hotel: any) => {
      hotel.Rooms = hotel.Rooms.filter((room: any) => room.peopleCapacity >= adult + children);
    });
    const calculatedPrice = hotels.map((hotel: any) => {
      hotel.Rooms = hotel.Rooms.map((room: any) => {
        return {
          ...room,
          discountedPrice: ((room.discount ? room.priceForPerson * (1 - room.discount) : room.priceForPerson) * adult + (room.discount ? room.childrenPrice * (1 - room.discount) : room.childrenPrice) * children) * nightsCount,
          price: (room.priceForPerson * adult + room.childrenPrice * children) * nightsCount
        }
      });
      return hotel;
    });
    const response = calculatedPrice.map((hotel: any) => {
      return {
        id: hotel.id,
        name: hotel.name,
        address: hotel.address,
        city: hotel.city,
        country: hotel.country,
        type: hotel.type,
        Rooms: hotel.Rooms,
        images: hotel.images,
        nights: nightsCount
      }
    });
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
}

export { searchForHotel, searchForTrip, searchForCountryOrCity };