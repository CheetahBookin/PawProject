import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getFinishedUpcomingTrips = async (req: Request, res: Response) => {
    try{
        const userId = Number(req.params.id)
        let finishedTrips: any[] = []
        let upcomingTrips: any[] = []
        if(!userId){
            return res.status(400).json({ error: "User id not found" })
        }
        const trips = await prisma.orders.findMany({
            where: { userId }
        })
        if (!trips) {
            finishedTrips = []
            upcomingTrips = []
        }
        finishedTrips = trips.filter(trip => trip.toDate < new Date())
        upcomingTrips = trips.filter(trip => trip.fromDate > new Date())
        const finished = finishedTrips.length
        const upcoming = upcomingTrips.length
        res.status(200).json({ finished, upcoming })
    }catch(error){
        res.status(500).json({ error: "Can't reach finished trips" })
    }
}

const getMostVisitedDestination = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.id)
        if (!userId) {
            return res.status(400).json({ error: "User id not found" })
        }
        const trips = await prisma.orders.findMany({
            where: { userId }
        })
        if (!trips || trips.length === 0) {
            return res.status(200).json({ destination: '' })
        }
        const destinationsArr: any[] = []
        const citArr: any[] = []
        await Promise.all(trips.map(async (trip) => {
            const destinationsFromHotels = await prisma.accomodation.findMany({
                where: { id: trip.hotelId },
                select: { country: true, city: true }
            })
            const destinationObj = {
                country: destinationsFromHotels[0].country,
            }
            const cityObj = {
                city: destinationsFromHotels[0].city,
            }
            destinationsArr.push(destinationObj)
            citArr.push(cityObj)
        }))
        const countryArr = destinationsArr.map((country)=>{
            return country.country
        })

        const cityArr = citArr.map((city)=>{
            return city.city
        })

        const countryCount = countryArr.reduce((acc, country) => {
            acc[country] = (acc[country] || 0) + 1;
            return acc;
        }, {});

        const cityCount = cityArr.reduce((acc, city) => {
            acc[city] = (acc[city] || 0) + 1;
            return acc;
        }, {});

        let maxCountry = '';
        let maxCount = 0;
        for (const country in countryCount) {
            if (countryCount.hasOwnProperty(country) && countryCount[country] > maxCount) {
                maxCountry = country;
                maxCount = countryCount[country];
            }
        }

        let maxCity = '';
        let maxCityCount = 0;
        for (const city in cityCount) {
            if (cityCount.hasOwnProperty(city) && cityCount[city] > maxCityCount) {
                maxCity = city;
                maxCityCount = cityCount[city];
            }
        }

        res.status(200).json({ mostVisitedCountry: { country: maxCountry, count: maxCount }, mostVisitedCity: { city: maxCity, count: maxCityCount } });
    } catch (error) {
        res.status(500).json({ error: "Can't reach most visited destination" })
        console.log(error)
    }
}

type Trip = {
    diff: number;
    id: string;
}

const nextTrip = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.id)
        if (!userId) {
            return res.status(400).json({ error: "User id not found" })
        }
        const trips = await prisma.orders.findMany({
            where: { userId }
        })
        if (!trips || trips.length === 0) {
            return res.status(200).json({ destination: '' })
        }
        const times: Trip[] = []
        trips.map((trip)=>{
            const now = new Date().getTime()
            const startDate = trip.fromDate.getTime()
            const difference = startDate - now
            const obj = {
                diff: difference,
                id: trip.id
            }
            times.push(obj)
        })
        const filteredTimes = times.filter(trip=>trip.diff>0)

        for(let i = 0; i < filteredTimes.length; i++){
            if(filteredTimes[i].diff < filteredTimes[0].diff){
                filteredTimes[0] = filteredTimes[i]
            }
        }

        const upcomingTrip = await prisma.orders.findMany({
            where: { id: filteredTimes[0].id }
        })

        const hotel = await prisma.accomodation.findMany({
            where: { id: upcomingTrip[0].hotelId }
        })

        res.status(200).json({ hotel })
    } catch (error) {
        res.status(500).json({ error: "Can't reach next trip" })
        console.log(error)
    }
}

const userLevel = async (req: Request, res: Response) => {
    try{
        const userId = Number(req.params.id)
        if(!userId){
            return res.status(400).json({ error: "User id not found" })
        }
        const userProfile = await prisma.userProfile.findUnique({
            where: { userId }
        })
        if(!userProfile){
            return res.status(200).json({ level: "Rookie" })
        }
        let level = userProfile.level
        const trips = await prisma.orders.findMany({
            where: { userId }
        })
        if(!trips || trips.length === 0){
            return res.status(200).json({ level })
        }
        const opinions = await prisma.rates.findMany({
            where: { userId }
        })
        if(!opinions || opinions.length === 0){
            return res.status(200).json({ level })
        }
        const experience = trips.length + opinions.length
        if(experience >= 10 && experience < 20){
            level = "Starter"
        }else if(experience >= 20 && experience < 30){
            level = "Captain"
        }else if(experience >= 30 && experience < 40){
            level = "Legend"
        }else if(experience >= 40){
            level = "Hall Of Famer"
        }
        res.status(200).json({ level })
    }catch(error){
        res.status(500).json({ error: "Can't reach user level" })
    }
}


export { getFinishedUpcomingTrips, getMostVisitedDestination, nextTrip, userLevel };