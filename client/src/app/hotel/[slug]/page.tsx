"use client"

import { getExactHotel } from '@/services/hotelsService';
import { HotelTypes } from '@/types/hotelTypes';
import { useParams, usePathname, useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'
import Loading from '@/components/common/loading';
import HotelPage from '@/components/common/hotelPage';

type HotelDetailsProps = HotelTypes & {
  Rates: any
}

function HotelDetails() {
  const [loading, setLoading] = useState<boolean>(true);
  const [hotel, setHotel] = useState<HotelDetailsProps | null>(null);
  const pathname = usePathname()
  const slug = pathname.split('/').pop() || ''
  const params = useSearchParams()
  const room = Number(params.get('room'))

  const getIdFromSlug = (slug: string) => {
    const parts = slug.split("-");
    return parseInt(parts.pop() ?? "", 10) || null;
  };

  const createSlug = (name: string, id: number) =>{
    return `${name.toLowerCase().split(' ').join('-')}-${id}`;
  }

  useEffect(() => {
    const fetchHotel = async () => {
      const id = getIdFromSlug(slug);
      if(!id || id<0){
        setLoading(false);
        return;
      }
      try{
        const response = await getExactHotel(String(id));
        if(!response){
          throw new Error("No hotel found");
        }
        const responseSlug: string = createSlug(response.data.name, response.data.id)
        if(responseSlug !== slug){
          throw new Error("No hotel found");
        }
        setHotel(response.data as HotelDetailsProps)
      }catch(error){
        console.error(error);
      }finally{
        setLoading(false);
      }
    }
    setLoading(true);
    fetchHotel();
  }, [slug])
  return (
    <>
      <Suspense fallback={<Loading />}>
        {loading ? (
          <Loading />
        ) : (
          <>
            <HotelPage 
              id = {hotel?.id || 0}
              name = {hotel?.name || ""}
              address = {hotel?.address || ""}
              country = {hotel?.country || ""}
              city = {hotel?.city || ""}
              type = {hotel?.type || ""}
              carParkFee = {hotel?.carParkFee || 0}
              flag_url={hotel?.flag_url || ""}
              images = {hotel?.images || []}
              Rooms = {hotel?.Rooms || []}
              Rates = {hotel?.Rates || []}
              room = {room}
              />
          </>
        )}
      </Suspense>
    </>
  )
}

export default HotelDetails
