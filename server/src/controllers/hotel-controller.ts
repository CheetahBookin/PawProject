import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getHotels = async (req: Request, res: Response) => {
  const hotels = await prisma.accomodation.findMany();
  res.json(hotels);
}

const getExactHotel = async (req: Request, res: Response) => {
  const { id } = req.params;
  const hotel = await prisma.accomodation.findUnique({
    where: {
      id: parseInt(id)
    },
    include: {
      images: { select: { image: true } },
      Rooms: { select: { roomNumber: true, peopleCapacity: true, priceForPerson: true, childrenPrice: true } },
      Rates: {
        select: {
          rate: true,
          message: true,
          date: true,
          user: {
            select: {
              username: true
            }
          }
        }
      }
    }
  });
  res.json(hotel);
}


const getDiscountedRooms = async (req: Request, res: Response) => {
  const hotels = await prisma.accomodation.findMany({
    where: {
      Rooms: {
        some: {
          discount: {
            gt: 0
          }
        }
      }
    },
    select: {
      name: true,
      country: true,
      city: true,
      images: {
        select: {
          image: true
        },
        take: 1
      },
      Rooms: {
        select: {
          roomNumber: true,
          priceForPerson: true,
          discount: true
        },
        orderBy: {
          discount: 'desc'
        },
        take: 1
      }
    },
  });
  res.json(hotels);
}

const getHotelsTypes = async (req: Request, res: Response) => {
  const hotelsTypes = await prisma.accomodation.findMany({
    select: {
      type: true,
      images: {
        select: {
          image: true
        },
        take: 1
      }
    }
  });

  const uniqueHotelTypes = hotelsTypes.filter((hotel, index, self) =>
    index === self.findIndex((t) => t.type === hotel.type)
  );

  res.json(uniqueHotelTypes);
}

const browseByPropertyType = async (req: Request, res: Response) => {
  const { type } = req.body
  const hotels = await prisma.accomodation.findMany({
    where: {
      type: type
    },
    select: {
      name: true,
      city: true,
      carParkFee: true,
      country: true,
      type: true,
      address: true,
      id: true,
      images: {
        select: {
          image: true
        },
        take: 1
      }
    }
  });
  res.json(hotels);
}

export { getHotels, getExactHotel, getDiscountedRooms, getHotelsTypes, browseByPropertyType };