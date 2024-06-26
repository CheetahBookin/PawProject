import {getHotels, getExactHotel, getDiscountedRooms, getHotelsTypes, browseByPropertyType} from "../controllers/hotel-controller";
import {Request, Response} from "express";
import {PrismaClient} from '@prisma/client'

jest.mock('@prisma/client', ()=>{
    const mPrismaClient = {
        accomodation: {
            findMany: jest.fn(),
            findUnique: jest.fn()
        }
    }
    return{
        PrismaClient: jest.fn(()=> mPrismaClient)
    }
})

//tests for getHotels
describe('getHotels', ()=>{
    let req: Partial<Request>
    let res: Partial<Response>
    let prisma: PrismaClient

    beforeEach(()=>{
        req = {}
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
        prisma = new PrismaClient()
    })

    it('should return list of hotels', async ()=>{
        const mockHotels = [
            {id: 1, name: 'Hotel 1', address: 'Address 1', country: 'Country 1', city: 'City 1', type: 'Type 1'},
            {id: 2, name: 'Hotel 2', address: 'Address 2', country: 'Country 2', city: 'City 2', type: 'Type 2'}
        ];

        (prisma.accomodation.findMany as jest.Mock).mockReturnValue(mockHotels)

        await getHotels(req as Request, res as Response)

        expect(prisma.accomodation.findMany).toHaveBeenCalled()
        expect(res.json).toHaveBeenCalledWith(mockHotels)
    })

    it('should return a 500 error if something goes wrong', async () => {
        const error = new Error('Internal server error');

        (prisma.accomodation.findMany as jest.Mock).mockRejectedValue(error)

        await getHotels(req as Request, res as Response)

        expect(prisma.accomodation.findMany).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' })
    })
})

//tests for getExactHotel
describe('getExactHotel', ()=>{
    let req: Partial<Request>
    let res: Partial<Response>
    let prisma: PrismaClient

    beforeEach(() => {
        req = { params: { id: '1' } }
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
        prisma = new PrismaClient()
    })

    it('should return the details of the hotel with the specified ID', async () => {
        const mockHotel = {
            id: 1,
            name: 'Hotel 1',
            address: 'Address 1',
            country: 'Country 1',
            city: 'City 1',
            type: 'Type 1',
            images: [{ image: 'image1.jpg' }],
            Rooms: [{ roomNumber: '101', peopleCapacity: 2, priceForPerson: 50, childrenPrice: 20, id: 1, discount: 0 }],
            Rates: [{ rate: 4, message: 'Great hotel!', date: new Date(), user: { username: 'user1' } }]
        };

        (prisma.accomodation.findUnique as jest.Mock).mockReturnValue(mockHotel)

        await getExactHotel(req as Request, res as Response)

        expect(prisma.accomodation.findUnique).toHaveBeenCalledWith({
            where: { id: 1 },
            include: {
                images: { select: { image: true } },
                Rooms: { select: { roomNumber: true, peopleCapacity: true, priceForPerson: true, childrenPrice: true, id: true, discount: true } },
                Rates: { select: { rate: true, message: true, date: true, user: { select: { username: true } } } }
            }
        })
        expect(res.json).toHaveBeenCalledWith(mockHotel)
    })

    it('should return a 500 error if something goes wrong', async () => {
        const error = new Error('Internal server error');

        (prisma.accomodation.findUnique as jest.Mock).mockRejectedValue(error)

        await getExactHotel(req as Request, res as Response)

        expect(prisma.accomodation.findUnique).toHaveBeenCalledWith({
            where: { id: 1 },
            include: {
                images: { select: { image: true } },
                Rooms: { select: { roomNumber: true, peopleCapacity: true, priceForPerson: true, childrenPrice: true, id: true, discount: true } },
                Rates: { select: { rate: true, message: true, date: true, user: { select: { username: true } } } },
            }
        })
        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' })
    })
})

//tests for getDiscountedRooms
describe('getDiscountedRooms', ()=>{
    let req: Partial<Request>
    let res: Partial<Response>
    let prisma: PrismaClient

    beforeEach(() => {
        req = {}
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
        prisma = new PrismaClient()
    })

    it('should return a list of hotels with discounted rooms', async ()=>{
        const mockHotels = [
            {
                id: 1,
                name: 'Hotel 1',
                country: 'Country 1',
                city: 'City 1',
                images: [{ image: 'image1.jpg' }],
                Rooms: [
                    {
                        roomNumber: '101',
                        priceForPerson: 100,
                        discount: 20,
                        id: 1,
                        peopleCapacity: 2
                    }
                ]
            },
            {
                id: 2,
                name: 'Hotel 2',
                country: 'Country 2',
                city: 'City 2',
                images: [{ image: 'image2.jpg' }],
                Rooms: [
                    {
                        roomNumber: '102',
                        priceForPerson: 150,
                        discount: 10,
                        id: 2,
                        peopleCapacity: 3
                    }
                ]
            }
        ];

        (prisma.accomodation.findMany as jest.Mock).mockReturnValue(mockHotels)

        await getDiscountedRooms(req as Request, res as Response);

        expect(prisma.accomodation.findMany).toHaveBeenCalledWith({
            where: {
                Rooms: {
                    some: {
                        discount: {
                            gt: 0,
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
                        image: true,
                    },
                    take: 1,
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
                    take: 1,
                }
            }
        })
        expect(res.json).toHaveBeenCalledWith(mockHotels)
    })

    it('should return a 500 error if something goes wrong', async () => {
        const error = new Error('Internal server error');

        (prisma.accomodation.findMany as jest.Mock).mockRejectedValue(error)

        await getDiscountedRooms(req as Request, res as Response)

        expect(prisma.accomodation.findMany).toHaveBeenCalledWith({
            where: {
                Rooms: {
                    some: {
                        discount: {
                            gt: 0,
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
                        image: true,
                    },
                    take: 1,
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
                        discount: 'desc',
                    },
                    take: 1,
                }
            }
        })
        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' })
    });
})

//tests for getHotelTypes
describe('getHotelTypes', ()=>{
    let req: Partial<Request>
    let res: Partial<Response>
    let prisma: PrismaClient

    beforeEach(() => {
        req = {}
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
        prisma = new PrismaClient()
    })

    it('should return a list of hotel types with one image with it', async () => {
        const mockHotelTypes = [
            { type: 'Type 1', images: [{ image: 'image1.jpg' }] },
            { type: 'Type 2', images: [{ image: 'image2.jpg' }] },
            { type: 'Type 1', images: [{ image: 'image3.jpg' }] },
        ]
        const uniqueHotelTypes = [
            { type: 'Type 1', images: [{ image: 'image1.jpg' }] },
            { type: 'Type 2', images: [{ image: 'image2.jpg' }] },
        ];

        (prisma.accomodation.findMany as jest.Mock).mockReturnValue(mockHotelTypes)

        await getHotelsTypes(req as Request, res as Response)

        expect(prisma.accomodation.findMany).toHaveBeenCalledWith({
            select: {
                type: true,
                images: {
                    select: {
                        image: true,
                    },
                    take: 1,
                }
            }
        })
        expect(res.json).toHaveBeenCalledWith(uniqueHotelTypes)
    })

    it('should return a 500 error if something goes wrong', async () => {
        const error = new Error('Internal server error');

        (prisma.accomodation.findMany as jest.Mock).mockRejectedValue(error)

        await getHotelsTypes(req as Request, res as Response)

        expect(prisma.accomodation.findMany).toHaveBeenCalledWith({
            select: {
                type: true,
                images: {
                    select: {
                        image: true,
                    },
                    take: 1,
                }
            }
        })
        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' })
    });
})

//tests for browseByPropertyType
describe('browseByPropertyType', () => {
    let req: Partial<Request>
    let res: Partial<Response>
    let prisma: PrismaClient

    beforeEach(() => {
        req = {
            body: {}
        }
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
        prisma = new PrismaClient()
    })

    it('should return a list of hotels by property type', async () => {
        req.body = { type: 'Hotel' }

        const mockHotels = [
            {
                id: 1,
                name: 'Hotel 1',
                country: 'Country 1',
                city: 'City 1',
                address: 'Address 1',
                type: 'Hotel',
                carParkFee: 10,
                images: [{ image: 'image1.jpg' }]
            },
            {
                id: 2,
                name: 'Hotel 2',
                country: 'Country 2',
                city: 'City 2',
                address: 'Address 2',
                type: 'Hotel',
                carParkFee: 15,
                images: [{ image: 'image2.jpg' }]
            },
        ];

        (prisma.accomodation.findMany as jest.Mock).mockReturnValue(mockHotels)

        await browseByPropertyType(req as Request, res as Response)

        expect(prisma.accomodation.findMany).toHaveBeenCalledWith({
            where: {
                type: 'Hotel'
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
                    take: 1,
                }
            }
        })
        expect(res.json).toHaveBeenCalledWith(mockHotels)
    });

    it('should return a 500 error if something goes wrong', async () => {
        const error = new Error('Internal server error');

        (prisma.accomodation.findMany as jest.Mock).mockRejectedValue(error)

        await browseByPropertyType(req as Request, res as Response)

        expect(prisma.accomodation.findMany).toHaveBeenCalledWith({
            where: {
                type: undefined
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
                    take: 1,
                }
            }
        })
        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' })
    })
})