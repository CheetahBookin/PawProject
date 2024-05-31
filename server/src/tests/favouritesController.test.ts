import {Request, Response} from "express";
import {PrismaClient} from '@prisma/client'
import {postFavorite, getFavorites, getFavoritesHotels, removeFavorite} from "../controllers/favorites-controller";

jest.mock('@prisma/client', ()=>{
    const mPrismaClient = {
        favorites: {
            findFirst: jest.fn(),
            create: jest.fn(),
            findMany: jest.fn(),
            deleteMany: jest.fn()
        },
        accomodation: {
            findMany: jest.fn()
        }
    }
    return{
        PrismaClient: jest.fn(()=> mPrismaClient)
    }
})

//tests for postFavourites
describe('postFavourites', ()=>{
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

    it('should return 400 if userId or hotelId is missing', async () => {
        req.body = {}

        await postFavorite(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ error: 'Missing required information' })
    })

    it('should return 400 if the accommodation is already in favorites', async () => {
        (prisma.favorites.findFirst as jest.Mock).mockReturnValue({ id: 1 })

        await postFavorite(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ error: 'Accomodation is already in favorites' })
    })

    it('should add a new favorite and return 201 with a success message', async () => {
        (prisma.favorites.findFirst as jest.Mock).mockReturnValue(null);
        (prisma.favorites.create as jest.Mock).mockReturnValue({
            id: 1,
            userId: 1,
            accommodationId: 1
        })

        await postFavorite(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.json).toHaveBeenCalledWith({
            favorite: {
                id: 1,
                userId: 1,
                accommodationId: 1
            },
            message: 'Accomodation added to favorites'
        })
    })

    it('should return 500 if there is a server error', async () => {
        (prisma.favorites.findFirst as jest.Mock).mockRejectedValue(new Error('Database error'))

        await postFavorite(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({ error: "Can't add accomodation to favorites" })
    })
})

//tests for getFavorites
describe('getFavorites', ()=>{
    let req: Partial<Request>
    let res: Partial<Response>
    let prisma: PrismaClient

    beforeEach(()=>{
        req = {
            params: {
                id: '1'
            }
        }
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
        prisma = new PrismaClient()
    })

    it('should return 400 if userId is not found', async () => {
        if(req.params){
            req.params.id = ''
        }

        await getFavorites(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ error: 'User id not found' })
    });

    it('should return 400 if no favorites are found', async () => {
        (prisma.favorites.findMany as jest.Mock).mockReturnValue(null)

        await getFavorites(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ error: 'You have no favorites added' })
    });

    it('should return 200 with the list of favorites', async () => {
        const mockFavorites = [
            { id: 1, userId: 1, accommodationId: 1 },
            { id: 2, userId: 1, accommodationId: 2 }
        ];

        (prisma.favorites.findMany as jest.Mock).mockReturnValue(mockFavorites)

        await getFavorites(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith(mockFavorites)
    });

    it('should return 500 if there is a server error', async () => {
        (prisma.favorites.findMany as jest.Mock).mockRejectedValue(new Error('Database error'))

        await getFavorites(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({ error: "Can't reach favorites" })
    });
})

//tests for getFavoritesHotels
describe('getFavoritesHotels', () => {
    let req: Partial<Request>
    let res: Partial<Response>
    let prisma: PrismaClient

    beforeEach(()=>{
        req = {
            params: {
                id: '1'
            }
        }
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
        prisma = new PrismaClient()
    })

    it('should return 400 if userId is not found', async () => {
        if(req.params){
            req.params.id = ''
        }

        await getFavoritesHotels(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ error: 'User id not found' })
    });

    it('should return 400 if no favorites are found', async () => {
        (prisma.favorites.findMany as jest.Mock).mockReturnValue(null)

        await getFavoritesHotels(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ error: 'You have no favorites added' })
    });

    it('should return 200 with the list of favorite hotels', async () => {
        const mockFavorites = [
            { id: 1, userId: 1, accommodationId: 1 },
            { id: 2, userId: 1, accommodationId: 2 }
        ]
        const mockHotels = [
            { id: 1, name: 'Hotel 1', images: [{ image: 'image1.jpg' }] },
            { id: 2, name: 'Hotel 2', images: [{ image: 'image2.jpg' }] }
        ];

        (prisma.favorites.findMany as jest.Mock).mockReturnValue(mockFavorites);
        (prisma.accomodation.findMany as jest.Mock).mockReturnValue(mockHotels)

        await getFavoritesHotels(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith(mockHotels)
    });

    it('should return 500 if there is a server error', async () => {
        (prisma.favorites.findMany as jest.Mock).mockRejectedValue(new Error('Database error'))

        await getFavoritesHotels(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({ error: "Can't reach favorites" })
    })
})

//tests for removeFavorite
describe('removeFavorite', ()=>{
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

    it('should return 400 if userId or hotelId is missing', async () => {
        req.body.userId = undefined

        await removeFavorite(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ error: 'Missing required information' })

        req.body.userId = 1
        req.body.hotelId = undefined

        await removeFavorite(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ error: 'Missing required information' })
    })

    it('should return 400 if the favorite does not exist', async () => {
        (prisma.favorites.findFirst as jest.Mock).mockReturnValue(null)

        await removeFavorite(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ error: 'Accomodation is not in favorites' })
    })

    it('should delete the favorite and return 200', async () => {
        (prisma.favorites.findFirst as jest.Mock).mockReturnValue({ id: 1, userId: 1, accommodationId: 1 })

        await removeFavorite(req as Request, res as Response)

        expect(prisma.favorites.deleteMany).toHaveBeenCalledWith({ where: { userId: 1, accommodationId: 1 } })
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({ message: 'Accomodation removed from favorites' })
    })

    it('should return 500 if there is a server error', async () => {
        (prisma.favorites.findFirst as jest.Mock).mockRejectedValue(new Error('Database error'))

        await removeFavorite(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({ error: "Can't remove accomodation from favorites" })
    })
})