"use client"

import { getDiscountedRooms } from '@/services/hotelsService';
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight, faTag } from '@fortawesome/free-solid-svg-icons';
import { DiscountedRooms } from '@/types/hotelTypes';
import { useRouter } from 'next/navigation';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

function BargainsGallery() {
  const [data, setData] = useState<DiscountedRooms[]>([]);

  useEffect(() => {
    const fetchBargains = async () => {
      try {
        const response = await getDiscountedRooms();
        setData(response?.data);
      } catch (error) {
        console.error('Error fetching discounted rooms:', error);
      }
    };
    fetchBargains();
  }, []);

  const countPrice = (price: number, discount: number) => {
    return price - (price * discount);
  }

  const router = useRouter();
  const createSlug = (name: string, id: number) =>{
    return `${name.toLowerCase().split(' ').join('-')}-${id}`;
  }

  const handleClick = (name: string, id: number, room: number) =>{
    const slug = createSlug(name, id)
    router.push(`/hotel/${slug}?room=${room}`);
  }

  return (
    <Carousel className="w-full max-w-7xl">
      <CarouselContent className="-ml-1">
        {data?.map((item: DiscountedRooms, index: number) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="h-full bg-brand-primary rounded-2xl relative">
              <FontAwesomeIcon icon={faTag} className="absolute top-0 left-[4px] text-red-500 z-10 fa fa-tag text-8xl"/>
              <span className="absolute top-8 left-8 z-20 text-brand-secondary">{`${(item.Rooms[0].discount) * 100}%`}</span>
              <img src={item.images[0].image} alt={item.name} className="w-full h-1/2 rounded-t-2xl" />
              <div className='w-full flex flex-col items-center justify-around h-1/2'>
                <p className='text-black'>{item.name}, {item.country}</p>
                <div className="bg-brand-secondary p-8 rounded-2xl cursor-pointer hover:bg-gray-300 transition-all" onClick={()=>handleClick(item.name, item.id, item.Rooms[0].id)}>
                  <p>{item.Rooms[0].roomNumber}</p>
                  <p>Room perfect for {item.Rooms[0].peopleCapacity} people</p>
                  <p>Old price: <span className="line-through">{item.Rooms[0].priceForPerson}zł</span></p>
                  <p>New price: {countPrice(item.Rooms[0].priceForPerson, item.Rooms[0].discount)}zł</p>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default BargainsGallery;