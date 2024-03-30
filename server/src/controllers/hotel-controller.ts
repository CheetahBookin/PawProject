import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getHotels = async (req: Request, res: Response) => {
  try{
    const hotels = await prisma.accomodation.findMany();
    res.json(hotels);
  }catch(error){
    res.status(500).json({error: 'Internal server error'})
  }
}

const getExactHotel = async (req: Request, res: Response) => {
  try{
    const { id } = req.params;
    const hotel = await prisma.accomodation.findUnique({
      where: {
        id: parseInt(id)
      },
      include: {
        images: { select: { image: true } },
        Rooms: { select: { roomNumber: true, peopleCapacity: true, priceForPerson: true, childrenPrice: true, id: true, discount: true } },
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
  }catch(error){
    res.status(500).json({error: 'Internal server error'})
  }
}


const getDiscountedRooms = async (req: Request, res: Response) => {
  try{
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
        id: true,
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
            discount: true,
            id: true,
            peopleCapacity: true
          },
          orderBy: {
            discount: 'desc'
          },
          take: 1
        }
      },
    });
    res.json(hotels);
  }catch(error){
    res.status(500).json({error: 'Internal server error'})
  }
}

const getHotelsTypes = async (req: Request, res: Response) => {
  try{
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
  
    const uniqueHotelTypes = hotelsTypes.filter((hotel: any, index: any, self: any) =>
      index === self.findIndex((t: any) => t.type === hotel.type)
    );
  
    res.json(uniqueHotelTypes);
  }catch(error){
    res.status(500).json({error: 'Internal server error'})
  }
}

const browseByPropertyType = async (req: Request, res: Response) => {
  try{
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
  }catch(error){
    res.status(500).json({error: 'Internal server error'})
  }
}

export { getHotels, getExactHotel, getDiscountedRooms, getHotelsTypes, browseByPropertyType };