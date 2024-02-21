"use client"

import { getDiscountedRooms } from '@/services/hotelsService';
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight, faTag } from '@fortawesome/free-solid-svg-icons';
import { DiscountedRooms } from '@/types/hotelTypes';
import { useRouter } from 'next/navigation';

function BargainsGallery() {
  const [data, setData] = useState<DiscountedRooms[]>([]);
  const [position, setPosition] = useState(0);
  const itemsPerPage = 3;
  const sliderRef = useRef<HTMLDivElement>(null);

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

  const handleClickLeft = () => {
    setPosition(Math.max(0, position - 1));
  };

  const handleClickRight = () => {
    setPosition(Math.min(data.length - itemsPerPage, position + 1));
  };

  useEffect(() => {
    if (sliderRef.current) {
      const slider: HTMLDivElement = sliderRef.current;
      slider.scrollLeft = position * slider.offsetWidth;
    }
  }, [position]);

  const start = position;
  const end = Math.min(position + itemsPerPage, data.length);
  const visibleData = data.slice(start, end);
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
    <div className="relative overflow-hidden flex justify-center h-full pt-12 w-[70vw]">
      <div ref={sliderRef} className="flex gap-16" style={{ scrollBehavior: 'smooth' }}>
        {visibleData.map((item: DiscountedRooms, index: number) => (
          <div key={index} className="relative flex-shrink-0 w-[18vw] h-[45vh] bg-brand-primary flex flex-col items-center rounded-2xl">
            <FontAwesomeIcon icon={faTag} className="absolute left-[86%] bottom-[90%] text-red-500 z-10 fa fa-tag text-8xl"/>
            <span className="absolute left-[94%] bottom-[96%] text-white z-10 text-xl">{`${(item.Rooms[0].discount) * 100}%`}</span>
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
        ))}
      </div>
      {position > 0 && (
        <button onClick={handleClickLeft} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white rounded-full p-2">
          <FontAwesomeIcon icon={faCaretLeft} className='text-2xl' />
        </button>
      )}
      {position + itemsPerPage < data.length && (
        <button onClick={handleClickRight} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full p-2">
          <FontAwesomeIcon icon={faCaretRight} className='text-2xl' />
        </button>
      )}
    </div>
  );
}

export default BargainsGallery;
