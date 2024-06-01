import {Request, Response} from 'express'
import {PrismaClient} from '@prisma/client'
import {getCountries, browseCitiesByCountry, browseHotelsByCity} from "../controllers/country-controller";

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

//tests for getCountries
describe('getCountries', ()=>{
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

    it('should return a list of unique countries with their flags', async () => {
        const mockCountries = [
            { country: 'Country 1', flag_url: 'url1' },
            { country: 'Country 2', flag_url: 'url2' },
            { country: 'Country 1', flag_url: 'url1' }
        ];

        (prisma.accomodation.findMany as jest.Mock).mockReturnValue(mockCountries)

        await getCountries(req as Request, res as Response);

        expect(prisma.accomodation.findMany).toHaveBeenCalled()
        expect(res.json).toHaveBeenCalledWith([
            { country: 'Country 1', flag_url: 'url1' },
            { country: 'Country 2', flag_url: 'url2' }
        ])
    })

    it('should return a 500 error if something goes wrong', async () => {
        const error = new Error('Internal server error');

        (prisma.accomodation.findMany as jest.Mock).mockRejectedValue(error)

        await getCountries(req as Request, res as Response)

        expect(prisma.accomodation.findMany).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' })
    })
})

//tests for browseCitiesByCountry
describe('browseCitiesByCountry', ()=>{
    let req: Partial<Request>
    let res: Partial<Response>
    let prisma: PrismaClient

    beforeEach(()=>{
        req = {
            body: {
                country: 'Country 1'
            }
        }
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
        prisma = new PrismaClient()
    })

    it('should return a list of unique cities for the given country', async () => {
        const mockCities = [
            { city: 'City 1' },
            { city: 'City 2' },
            { city: 'City 1' }
        ];

        (prisma.accomodation.findMany as jest.Mock).mockResolvedValue(mockCities)

        await browseCitiesByCountry(req as Request, res as Response)

        expect(prisma.accomodation.findMany).toHaveBeenCalledWith({
            where: { country: 'Country 1' },
            select: { city: true }
        })
        expect(res.json).toHaveBeenCalledWith([
            { city: 'City 1' },
            { city: 'City 2' }
        ])
    })

    it('should return a 500 error if something goes wrong', async () => {
        const error = new Error('Internal server error');

        (prisma.accomodation.findMany as jest.Mock).mockRejectedValue(error)

        await browseCitiesByCountry(req as Request, res as Response)

        expect(prisma.accomodation.findMany).toHaveBeenCalledWith({
            where: { country: 'Country 1' },
            select: { city: true }
        })
        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' })
    })
})

//tests for browseHotelsByCity
describe('browseHotelsByCity', ()=>{
    let req: Partial<Request>
    let res: Partial<Response>
    let prisma: PrismaClient

    beforeEach(()=>{
        req = {
            body: {
                city: 'City 1'
            }
        }
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
        prisma = new PrismaClient()
    })

    it('should return a list of hotels for the given city', async () => {
        const mockHotels = [
            { id: 1, name: 'Hotel 1', images: [{ image: 'image1.jpg' }] },
            { id: 2, name: 'Hotel 2', images: [{ image: 'image2.jpg' }] }
        ];

        (prisma.accomodation.findMany as jest.Mock).mockResolvedValue(mockHotels)

        await browseHotelsByCity(req as Request, res as Response)

        expect(prisma.accomodation.findMany).toHaveBeenCalledWith({
            where: { city: 'City 1' },
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
        })
        expect(res.json).toHaveBeenCalledWith(mockHotels)
    })

    it('should return a 500 error if something goes wrong', async () => {
        const error = new Error('Internal server error');

        (prisma.accomodation.findMany as jest.Mock).mockRejectedValue(error)

        await browseHotelsByCity(req as Request, res as Response)

        expect(prisma.accomodation.findMany).toHaveBeenCalledWith({
            where: { city: 'City 1' },
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
        })
        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' })
    })
})