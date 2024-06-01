import {Request, Response} from "express";
import {PrismaClient} from '@prisma/client'
import {getRatings, postRating, existingRating, deleteRating, getUsersRatings} from "../controllers/rating-controller";

jest.mock('@prisma/client', ()=>{
    const mPrismaClient = {
        rates: {
            findMany: jest.fn(),
            deleteMany: jest.fn(),
            findFirst: jest.fn(),
            update: jest.fn(),
            create: jest.fn()
        }
    }
    return{
        PrismaClient: jest.fn(()=> mPrismaClient)
    }
})

//tests for getRatings
describe('getRatings', ()=>{
    let req: Partial<Request>
    let res: Partial<Response>
    let prisma: PrismaClient

    beforeEach(()=>{
        req = {
            body: {
                hotelId: 1
            }
        }
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
        prisma = new PrismaClient()
    })

    it("should return ratings for a given hotel", async () => {
        const ratings = [
            { rate: 4, message: "Great hotel", userId: 1, hotelId: 1, user: { username: "user1" } },
            { rate: 5, message: "Awesome experience", userId: 2, hotelId: 1, user: { username: "user2" } }
        ];

        (prisma.rates.findMany as jest.Mock).mockReturnValue(ratings)

        await getRatings(req as Request, res as Response)

        expect(prisma.rates.findMany).toHaveBeenCalledWith({
            where: { hotelId: 1 },
            select: {
                rate: true,
                message: true,
                userId: true,
                hotelId: true,
                user: { select: { username: true } }
            }
        })

        expect(res.json).toHaveBeenCalledWith(ratings)
    })

    it("should return 500 if there is an error during the process", async () => {
        (prisma.rates.findMany as jest.Mock).mockRejectedValue(new Error("Database error"))

        await getRatings(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({ error: "Can't get ratings" })
    })
})

//tests for postRating
describe('postRating', ()=>{
    let req: Partial<Request>
    let res: Partial<Response>
    let prisma: PrismaClient

    beforeEach(()=>{
        req = {
            body: {
                rating: 5,
                comment: "Excellent hotel",
                userId: 1,
                hotelId: 1
            }
        }
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
        prisma = new PrismaClient()
    })

    it("should create a new rating if it doesn't exist", async () => {
        (prisma.rates.findFirst as jest.Mock).mockReturnValue(null)

        const newRating = { id: 2, userId: 1, hotelId: 1, rate: 5, message: "Excellent hotel", date: new Date() };
        (prisma.rates.create as jest.Mock).mockReturnValue(newRating)

        await postRating(req as Request, res as Response)

        expect(prisma.rates.findFirst).toHaveBeenCalledWith({
            where: { userId: 1, hotelId: 1 }
        })

        expect(prisma.rates.create).toHaveBeenCalledWith({
            data: { hotelId: 1, userId: 1, rate: 5, message: "Excellent hotel", date: expect.any(Date) }
        })

        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.json).toHaveBeenCalledWith(newRating)
    })

    it("should return 500 if there is an error during the process", async () => {
        (prisma.rates.findFirst as jest.Mock).mockRejectedValue(new Error("Database error"))

        await postRating(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({ error: "Can't post rating" })
    })
})

//tests for existingRating
describe('existingRating', ()=>{
    let req: Partial<Request>
    let res: Partial<Response>
    let prisma: PrismaClient

    beforeEach(()=>{
        req = {
            body: {
                userId: 1,
                hotelId: 1
            }
        }
        res = {
            send: jest.fn(),
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
        prisma = new PrismaClient()
    })

    it("should return true if a rating exists for the user and hotel", async () => {
        (prisma.rates.findFirst as jest.Mock).mockReturnValue({ id: 1, userId: 1, hotelId: 1, rate: 5, message: "Excellent hotel" })

        await existingRating(req as Request, res as Response)

        expect(prisma.rates.findFirst).toHaveBeenCalledWith({
            where: { userId: 1, hotelId: 1 }
        })
        expect(res.send).toHaveBeenCalledWith(true)
    })

    it("should return false if no rating exists for the user and hotel", async () => {
        (prisma.rates.findFirst as jest.Mock).mockReturnValue(null)

        await existingRating(req as Request, res as Response)

        expect(prisma.rates.findFirst).toHaveBeenCalledWith({
            where: { userId: 1, hotelId: 1 }
        })
        expect(res.send).toHaveBeenCalledWith(false)
    })

    it("should return 500 if there is an error during the process", async () => {
        (prisma.rates.findFirst as jest.Mock).mockRejectedValue(new Error("Database error"))

        await existingRating(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" })
    })
})

//tests for deleteRating
describe('deleteRating', ()=>{
    let req: Partial<Request>
    let res: Partial<Response>
    let prisma: PrismaClient

    beforeEach(()=>{
        req = {
            body: {
                userId: 1,
                hotelId: 1
            }
        }
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
        prisma = new PrismaClient()
    })

    it("should delete the rating for the user and hotel", async () => {
        await deleteRating(req as Request, res as Response)

        expect(prisma.rates.deleteMany).toHaveBeenCalledWith({where: { userId: 1, hotelId: 1 }})

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({ message: "Rating deleted" })
    })

    it("should return 500 if there is an error during the process", async () => {
        (prisma.rates.deleteMany as jest.Mock).mockRejectedValue(new Error("Database error"))

        await deleteRating(req as Request, res as Response)

        expect(res!.status).toHaveBeenCalledWith(500)
        expect(res!.json).toHaveBeenCalledWith({ error: "Can't delete rating" })
    })
})

//tests for getUsersRatings
describe('getUsersRatings', ()=>{
    let req: Partial<Request>
    let res: Partial<Response>
    let prisma: PrismaClient

    beforeEach(()=>{
        req = {
            params: { id: '1' }
        }
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
        prisma = new PrismaClient()
    })

    it("should return user's ratings and the number of ratings", async () => {
        const ratings = [
            { rate: 5, message: "Excellent", accomodation: { name: "Hotel A" } },
            { rate: 4, message: "Good", accomodation: { name: "Hotel B" } }
        ];

        (prisma.rates.findMany as jest.Mock).mockReturnValue(ratings)

        await getUsersRatings(req as Request, res as Response)

        expect(prisma.rates.findMany).toHaveBeenCalledWith({
            where: { userId: 1 },
            select: { rate: true, message: true, accomodation: { select: { name: true } } }
        })

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({ ratings, numberOfRatings: ratings.length })
    })

    it("should return 400 if user id is missing", async () => {
        req.params = {}

        await getUsersRatings(req as Request, res as Response)

        expect(res!.status).toHaveBeenCalledWith(400)
        expect(res!.json).toHaveBeenCalledWith({ error: "User id not found" })
    })
})