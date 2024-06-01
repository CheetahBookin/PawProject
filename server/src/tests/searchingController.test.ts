import {Request, Response} from "express";
import {PrismaClient} from '@prisma/client'
import {searchForHotel, searchForTrip} from "../controllers/searching-controller";

jest.mock('@prisma/client', ()=>{
    const mPrismaClient = {
        accomodation: {
            findMany: jest.fn(),
        }
    }
    return{
        PrismaClient: jest.fn(()=> mPrismaClient)
    }
})

//tests for searchForHotel
describe('searchForHotel', ()=>{
    let req: Partial<Request>
    let res: Partial<Response>
    let prisma: PrismaClient

    beforeEach(()=>{
        req = {
            body: {
                search: "Hotel",
            }
        }
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
        prisma = new PrismaClient()
    })

    it("should return hotels containing the search term", async () => {
        const hotels = [
            { id: 1, name: "Hotel A" },
            { id: 2, name: "Hotel B" }
        ];

        (prisma.accomodation.findMany as jest.Mock).mockReturnValue(hotels)

        await searchForHotel(req as Request, res as Response)

        expect(prisma.accomodation.findMany).toHaveBeenCalledWith({
            where: {
                name: {
                    contains: "Hotel",
                }
            }
        })
        expect(res.json).toHaveBeenCalledWith(hotels)
    })

    it("should return 500 if there is an error during the process", async () => {
        (prisma.accomodation.findMany as jest.Mock).mockRejectedValue(new Error("Database error"))

        await searchForHotel(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({ error: "Something went wrong" })
    })
})

//tests for searchForTrip
describe('searchForTrip', ()=>{
    let req: Partial<Request>
    let res: Partial<Response>
    let prisma: PrismaClient

    beforeEach(()=>{
        req = {
            body: {
                destination: "Paris",
                dateFrom: "2024-06-15",
                dateTo: "2024-06-20",
                adult: 2,
                children: 1
            }
        }
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
        prisma = new PrismaClient()
    })

    it("should return 400 if destination is missing", async () => {
        req.body.destination = undefined

        await searchForTrip(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({error: "You have to go somewhere",})
    })

    it("should return 400 if adult count is missing", async () => {
        req.body.adult = undefined

        await searchForTrip(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({error: "There must be at least one adult on the trip",})
    })

    it("should return 400 if dateFrom is in the past", async () => {
        req.body.dateFrom = "2023-06-15"

        await searchForTrip(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({error: "You can't go back in time dumbass",})
    })

    it("should return 400 if dateFrom is after dateTo", async () => {
        req.body.dateFrom = "2024-06-20"
        req.body.dateTo = "2024-06-15"

        await searchForTrip(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({error: "You can't go back in time dumbass",})
    })

    it("should return hotels matching the destination and availability", async () => {
        const hotels = [
            {
                id: 1,
                images: [],
                name: "Hotel Paris",
                nights: 5,
                address: "123 Main St",
                city: "Paris",
                country: "France",
                type: "Luxury",
                Rooms: [{ peopleCapacity: 3 }]
            },
            {
                id: 2,
                images: [],
                name: "Hotel France",
                nights: 5,
                address: "456 Elm St",
                city: "Paris",
                country: "France",
                type: "Budget",
                Rooms: [{ peopleCapacity: 2 }]
            }
        ];

        (prisma.accomodation.findMany as jest.Mock).mockReturnValue(hotels)

        await searchForTrip(req as Request, res as Response)

        expect(prisma.accomodation.findMany).toHaveBeenCalledWith({
            where: {
                OR: [{ city: "Paris" }, { country: "Paris" }]
            },
            include: {
                Rooms: {
                    where: {
                        peopleCapacity: 3
                    }
                },
                images: { select: { image: true } }
            }
        })

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith(hotels)
    })

    it("should return 500 if there is an error during the process", async () => {
        (prisma.accomodation.findMany as jest.Mock).mockRejectedValue(new Error("Database error"))

        await searchForTrip(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({ error: "Something went wrong" })
    })
})

