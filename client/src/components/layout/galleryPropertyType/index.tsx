"use client"
import React, { useEffect, useState } from 'react';
import { getHotelsTypes } from '@/services/hotelsService';
import { HotelsTypesTypes } from '@/types/hotelTypes';
import HotelTypeCard from '@/components/common/hotelTypeCard';
import Loading from '@/components/common/loading';

function GalleryPropertyType() {
  const [hotelsTypes, setHotelsTypes] = useState([] as HotelsTypesTypes[]);
  useEffect(() => {
    const fetchHotelsTypes = async () => {
      try {
        const response = await getHotelsTypes();
        const data = response?.data as HotelsTypesTypes[];
        setHotelsTypes(data);
      } catch (error) {
        console.error(error)
      }
    };
    fetchHotelsTypes();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-4">Browse by property type</h2>
      <div className='flex flex-wrap justify-center'>
        {hotelsTypes ? hotelsTypes.map((hotelType, index) => (
          <HotelTypeCard key={index} hotelType={hotelType.type} images={hotelType.images} />
        )) : <Loading />}
      </div>
    </div>
  );
}

export default GalleryPropertyType;
