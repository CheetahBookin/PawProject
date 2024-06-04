"use client"

import React, { useState, useEffect } from 'react';
import { getBestRated } from "@/services/bestRatedService";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { BestRated } from "@/types/hotelTypes";
import { useRouter } from "next/navigation";

const BesRatedGallery = () => {
  const [data, setData] = useState<BestRated[]>([]);

  useEffect(() => {
    const fetchBestRated = async () => {
      try {
        const response = await getBestRated();
        setData(response?.data);
      } catch (error) {
        console.error('Error fetching bestRated: ', error);
      }
    };
    fetchBestRated();
  }, []);

  const router = useRouter();
  const createSlug = (name: string, id: number) => {
    return `${name.toLowerCase().split(' ').join('-')}-${id}`;
  };

  const handleClick = (name: string, id: number) => {
    const slug = createSlug(name, id);
    router.push(`/hotel/${slug}`);
  };
  
  return (
    <div className="w-[65%] flex flex-col items-center gap-4 pb-8">
      <h1 className="font-bold text-2xl md:text-3xl>Best rated</h1>
      <Carousel className="w-full">
        <CarouselContent className="-ml-1">
          {data?.map((item: BestRated, index: number) => (
            <CarouselItem key={index} className="lg:basis-1/3 md:basis-1/2 h-full md:w-1/2 lg:w-1/3" data-testid="carousel-item">
              <div className="h-full bg-brand-primary rounded-2xl">
                <img src={item.image} alt={item.name} className="w-full h-56 object-cover rounded-t-3xl" />
                <div className='p-6'>
                  <p className='text-gray-800 text-lg font-semibold'>{item.name}, {item.country}</p>
                  <div className="mt-4">
                    <p className="text-gray-600">Average Rate: {item.avg_rate ? item.avg_rate : 'Not Rated'}</p>
                    <p className="text-gray-600">Number of Rates: {item.rates_count}</p>
                  </div>
                  <button onClick={() => handleClick(item.name, item.id)} className="mt-4 w-full py-2 px-4 bg-blue-500 text-white rounded-full focus:outline-none hover:bg-blue-600 transition-all">View Details</button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default BesRatedGallery;
