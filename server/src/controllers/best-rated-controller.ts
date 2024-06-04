import {Request, Response} from "express";
import {PrismaClient} from "@prisma/client";
import { AvgRate, Result } from "../types/BestRated";
const prisma = new PrismaClient()

const bestRated = async(req: Request, res: Response) =>  {
    const accomodationRates = await prisma.accomodation.findMany({
        select: {
            id: true,
            name: true,
            country: true,
            images: {
                select: {
                    image: true
                },
                take: 1
            },
            Rates: {
                select: {
                    rate: true
                }
            }
        }
    })

    const result = accomodationRates.map((avgRate: AvgRate) => ({
        id: avgRate.id,
        name: avgRate.name,
        country: avgRate.country,
        image: avgRate.images[0].image,
        avg_rate: avgRate.Rates.length > 0
            ? avgRate.Rates.reduce((sum: number, rate: { rate: number }) => sum + rate.rate, 0) / avgRate.Rates.length
            : null,
        rates_count: avgRate.Rates.length
    }));

    result.sort((a: Result, b: Result) => (b.avg_rate || 0)-(a.avg_rate || 0))

    res.json(result)
}

export {bestRated}