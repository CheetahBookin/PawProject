"use client"
import React, { useEffect, useState } from 'react';
import { getExactHotel } from '@/services/hotelsService';
import { HotelTypes } from '@/types/hotelTypes';
import Loading from '@/components/common/loading';
import HotelCard from '@/components/common/hotelCard';

function GalleryPopularDestinations() {
  const [hotelsData, setHotelsData] = useState([] as HotelTypes[]);
  const [loading, setLoading] = useState(false);
  const getIds = () =>{
    const ids = []
    while(ids.length < 4){
      const r = Math.floor(Math.random() * 50) + 1;
      if(ids.indexOf(r.toString()) === -1){
        const id = r.toString();
        ids.push(id);
      }
    }
    return ids;
  }

  useEffect(() => {
    setLoading(true);
    try{
      const getHotel = async () => {
        const hotels = []
        const ids = getIds()
        for (let i = 0; i < ids.length; i++) {
          const hotel = await getExactHotel(ids[i]);
          if (hotel) {
            hotels.push(hotel.data as HotelTypes);
          }
        }
        setHotelsData(hotels);
      }
      getHotel();
    }catch(error){
      console.error(error);
    }finally{
      setLoading(false);
    }
  }, []);
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold">Popular Destinations</h2>
      <div className="flex justify-center mt-8">
        {!loading ? hotelsData.map((hotel, index) => (
            <div key={index} className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6">
              <HotelCard 
                id={hotel.id}
                index={index}
                image={hotel.images}
                name={hotel.name}
                city={hotel.city}
                flag_url={hotel.flag_url}
              />
            </div>
        )) : <Loading />}
      </div>
    </div>
  );
}

export default GalleryPopularDestinations;

