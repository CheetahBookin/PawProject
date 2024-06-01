import {Request, Response} from "express";
import {PrismaClient} from '@prisma/client'
import {createUserProfile, getUserProfile, updateUserProfile, getMode} from "../controllers/user-profile-controller";

jest.mock('@prisma/client', ()=>{
    const mPrismaClient = {
        userProfile: {
            create: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn()
        }
    }
    return{
        PrismaClient: jest.fn(()=> mPrismaClient)
    }
})

//tests for createUserProfile
describe('createUserProfile', ()=>{
    let req: Partial<Request>
    let res: Partial<Response>
    let prisma: PrismaClient

    beforeEach(()=>{
        req = {
            body: {
                userId: '1',
                firstName: 'John',
                lastName: 'Swiecioch',
                country: 'Poland',
                address: 'Main St',
                profileImage: 'profile.jpg',
                darkMode: false
            }
        }
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
        prisma = new PrismaClient()
    })

    it('should return error if required information is missing', async () => {
        req.body = {}

        await createUserProfile(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ error: "Missing required information" })
    })

    it('should create user profile if everything is valid', async () => {
        const userProfile = {
            userId: '1',
            firstName: 'John',
            lastName: 'Swiecioch',
            country: 'Poland',
            address: 'Main St',
            profileImage: 'profile.jpg',
            darkMode: false
        };

        (prisma.userProfile.create as jest.Mock).mockReturnValue(userProfile)

        await createUserProfile(req as Request, res as Response)

        expect(prisma.userProfile.create).toHaveBeenCalledWith({
            data: userProfile
        })

        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.json).toHaveBeenCalledWith(userProfile)
    })

    it('should return 500 if there is an error during the process', async () => {
        (prisma.userProfile.create as jest.Mock).mockRejectedValue(new Error('Database error'))

        await createUserProfile(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({ error: "Can't create user profile" })
    })
})

//tests for getUserProfile
describe('getUserProfile', ()=>{
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

    it('should return error if user id is missing', async () => {
        req.params = {}

        await getUserProfile(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ error: "User id not found" })
    })

    it('should return error if user profile is not found', async () => {
        (prisma.userProfile.findUnique as jest.Mock).mockReturnValue(null)

        await getUserProfile(req as Request, res as Response)

        expect(prisma.userProfile.findUnique).toHaveBeenCalledWith({ where: { userId: 1 } })
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ error: "User profile not found" })
    })

    it('should return user profile if found', async () => {
        const userProfile = {
            userId: '1',
            firstName: 'John',
            lastName: 'Swiecioch',
            country: 'Poland',
            address: 'Main St',
            profileImage: 'profile.jpg',
            darkMode: false
        };

        (prisma.userProfile.findUnique as jest.Mock).mockReturnValue(userProfile)

        await getUserProfile(req as Request, res as Response)

        expect(prisma.userProfile.findUnique).toHaveBeenCalledWith({ where: { userId: 1 } })
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith(userProfile)
    })

    it('should return 500 if there is an error during the process', async () => {
        (prisma.userProfile.findUnique as jest.Mock).mockRejectedValue(new Error('Database error'))

        await getUserProfile(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({ error: "Can't reach user profile" })
    })
})

//tests for updateUserProfile
describe('updateUserProfile', ()=>{
    let req: Partial<Request>
    let res: Partial<Response>
    let prisma: PrismaClient

    beforeEach(()=>{
        req = {
            body: {
                userId: '1',
                firstName: 'John',
                lastName: 'Swiecioch',
                country: 'Poland',
                address: 'Main St',
                profileImage: 'profile.jpg',
                darkMode: false
            }
        }
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
        prisma = new PrismaClient()
    })

    it('should return error if required information is missing', async () => {
        req.body = {}

        await updateUserProfile(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ error: "Missing required information" })
    })

    it('should return error if user profile is not found', async () => {
        (prisma.userProfile.findUnique as jest.Mock).mockReturnValue(null)

        await updateUserProfile(req as Request, res as Response)

        expect(prisma.userProfile.findUnique).toHaveBeenCalledWith({ where: { userId: '1' } })
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ error: "User profile not found" })
    })

    //this one does not work
    it('should update user profile if found', async () => {
        const existingUserProfile = {
            userId: '1',
            firstName: 'Mut',
            lastName: 'Grzyb',
            country: 'UK',
            address: 'Side St',
            profileImage: 'old.jpg',
            darkMode: true
        };

        (prisma.userProfile.findUnique as jest.Mock).mockReturnValue(existingUserProfile);

        await updateUserProfile(req as Request, res as Response)

        expect(prisma.userProfile.update).toHaveBeenCalledWith({
            where: { userId: '1' },
            data: {
                firstName: 'John',
                lastName: 'Swiecioch',
                country: 'Poland',
                address: 'Main St',
                profileImage: 'profile.jpg',
                darkMode: false
            }
        })
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({
            userId: '1',
            firstName: 'John',
            lastName: 'Swiecioch',
            country: 'Poland',
            address: 'Main St',
            profileImage: 'profile.jpg',
            darkMode: false
        })
    })

    it('should return 500 if there is an error during the process', async () => {
        (prisma.userProfile.findUnique as jest.Mock).mockRejectedValue(new Error('Database error'))

        await updateUserProfile(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({ error: "Can't update user profile" })
    })
})

describe('getMode', ()=>{
    let req: Partial<Request>
    let res: Partial<Response>
    let prisma: PrismaClient

    beforeEach(()=>{
        req = {
            params: {
                id: "1",
            }
        }
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
        prisma = new PrismaClient()
    })

    it("should return error if user id is missing", async () => {
        req.params = {}

        await getMode(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ error: "User id not found" })
    })

    it("should return error if user profile is not found", async () => {
        (prisma.userProfile.findUnique as jest.Mock).mockReturnValue(null)

        await getMode(req as Request, res as Response)

        expect(prisma.userProfile.findUnique).toHaveBeenCalledWith({
            where: { userId: 1 }
        })
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ error: "User profile not found" })
    })

    it("should return mode 'dark' if user's darkMode is true", async () => {
        const userProfile = {
            userId: 1,
            darkMode: true,
        };

        (prisma.userProfile.findUnique as jest.Mock).mockReturnValue(userProfile)

        await getMode(req as Request, res as Response)

        expect(prisma.userProfile.findUnique).toHaveBeenCalledWith({
            where: { userId: 1 }
        })
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({ mode: "dark" })
    });

    it("should return mode 'light' if user's darkMode is false", async () => {
        const userProfile = {
            userId: 1,
            darkMode: false,
        };

        (prisma.userProfile.findUnique as jest.Mock).mockReturnValue(userProfile)

        await getMode(req as Request, res as Response)

        expect(prisma.userProfile.findUnique).toHaveBeenCalledWith({
            where: { userId: 1 },
        })
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({ mode: "light" })
    })

    it("should return 500 if there is an error during the process", async () => {
        (prisma.userProfile.findUnique as jest.Mock).mockRejectedValue(new Error("Database error"))

        await getMode(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({error: "Can't reach user profile",})
    })
})