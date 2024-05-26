"use client"

import React, { useState, useEffect} from 'react';
import {getBestRated} from "@/services/bestRatedService";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {BestRated} from "@/types/hotelTypes";
import {useRouter} from "next/navigation";

const BesRatedGallery = ()=>{
    const [data, setData] = useState<BestRated[]>([])

    useEffect(() => {
        const fetchBestRated = async ()=>{
            try{
                const response = await getBestRated()
                setData(response?.data)
            } catch (error){
                console.error('Error fetching bestRated: ', error)
            }
        }
        fetchBestRated()
    }, []);

    const router = useRouter()
    const createSlug = (name: string, id: number) =>{
        return `${name.toLowerCase().split(' ').join('-')}-${id}`;
    }

    const handleClick = (name: string, id: number) =>{
        const slug = createSlug(name, id)
        router.push(`/hotel/${slug}`);
    }

    return(
        <>
            <h1 className="font-bold text-3xl">Best rated</h1>
            <Carousel className="w-[65%]">
                <CarouselContent className="-ml-1">
                    {data?.map((item: BestRated, index: number) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                            <div className="h-full bg-brand-primary rounded-2xl">
                                <img src={item.image} alt={item.name} className="w-full h-1/2 rounded-t-2xl"/>
                                <div className='w-full flex flex-col items-center justify-around h-1/2'>
                                    <p className='text-black'>{item.name}, {item.country}</p>
                                    <div className="bg-brand-secondary p-8 rounded-2xl cursor-pointer hover:bg-gray-300 transition-all" onClick={()=>handleClick(item.name, item.id)}>
                                        <p>Average rate: {item.avg_rate ? item.avg_rate : 'Not rated'}</p>
                                        <p>Number of rates: {item.rates_count}</p>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </>
    )
}

export default BesRatedGallery