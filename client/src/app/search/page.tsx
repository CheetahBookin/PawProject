"use client"

import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { SearchForTrip, SearchForTripResults } from '@/types/searchTypes'
import { searchForTrip } from '@/services/searchService'
import Loading from '@/components/common/loading'

type ParamsData = {
    [key: string]: any
}

function SearchingResults() {
    const [data, setData] = useState<SearchForTrip>({} as SearchForTrip);
    const [results, setResults] = useState<SearchForTripResults[] | null>(null);
    const searchParams = useSearchParams();

    useEffect(() => {
        const getFullResults = () => {
            const paramsData: ParamsData = {};
            searchParams.forEach((value: number | string, key: string) => {
                if(key === 'adults' || key === 'children') {
                    paramsData[key] = Number(value);
                    return;
                }
                paramsData[key] = value;
            });
            setData(paramsData as SearchForTrip);
        }

        getFullResults();
    }, [searchParams])

    useEffect(() => {
        const fetchResults = async () => {
            if (data.destination) {
                console.log(data.destination);
                const response = await searchForTrip(data.destination, data.checkInDate, data.checkOutDate, data.adults, data.children);
                setResults(response.data);
            }
        }
        fetchResults();
    }, [data])
    
    const router = useRouter();
    const createSlug = (name: string, id: number) =>{
        return `${name.toLowerCase().split(' ').join('-')}-${id}`;
    }

    const handleClick = (name: string, id: number) =>{
        const slug = createSlug(name, id)
        router.push(`/hotel/${slug}`);
    }

    return (
        <main className="bg-brand-secondary flex flex-col justify-center items-center py-16 gap-16">
            {results ? results.map((result, index) => {
                return (
                    <div key={index} className="bg-brand-primary rounded p-4 my-4 flex w-3/4 justify-between">
                        <div className='w-1/5'>
                            <img src={result.images[0].image} alt="hotel" className="w-full h-full object-cover rounded cursor-pointer" onClick={()=>handleClick(result.name, result.id)}/>
                        </div>
                        <div className='w-3/4 flex flex-col justify-between'>
                            <div>
                                <h2 className="text-2xl font-bold text-white">{result.name}</h2>
                                <p className="text-sm text-whit">{result.address}, {result.city}, {result.country}</p>
                                <p className="text-sm text-whit">{result.type}</p>
                            </div>
                            <h1>Matching rooms:</h1>
                            <div className="flex gap-8">
                                {result.Rooms ? result.Rooms.map((room, index) => {
                                    return (
                                        <div key={index} className="bg-white rounded p-4 w-1/5 cursor-pointer text-center">
                                            <p className='text-brand-primary'>{room.roomNumber}</p>
                                            <p className='text-brand-primary'>{room.peopleCapacity} people</p>
                                            <p className={room.discountedPrice != room.price ? "text-red-600 line-through" : "text-brand-primary"}>Price: {room.price}zł</p>
                                            {room.discountedPrice != room.price && <p className='text-brand-primary'>New price: {room.discountedPrice}zł</p>}
                                            <p className='text-brand-primary text-xs'>{result.nights} nights, {data.adults} adults, {data.children} children</p>
                                        </div>
                                    )
                                }) : <p className="text-sm text-brand-primary">No rooms available</p>}
                            </div>
                        </div>
                    </div>
                )
            }) : <Loading />
            }
        </main>
    )
}

export default SearchingResults
