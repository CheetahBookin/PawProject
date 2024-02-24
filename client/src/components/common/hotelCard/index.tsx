import React from 'react'
import { RoomImages } from '@/types/hotelTypes'
import { useRouter } from 'next/navigation'

type HotelCardProps = {
    id: number,
    index: number,
    image: RoomImages[],
    name: string,
    city: string,
    flag_url?: string
}

function HotelCard({id, index, image, name, city, flag_url}: HotelCardProps) {
  const router = useRouter();
  const createSlug = (name: string, id: number) =>{
    return `${name.toLowerCase().split(' ').join('-')}-${id}`;
  }

  const handleClick = () =>{
    const slug = createSlug(name, id)
    router.push(`/hotel/${slug}`);
  }
  return (
    <div key={index} className="w-1/4 px-4">
         <img
            src={image[0].image}
            alt={name}
            className="cursor-pointer opacity-80 hover:opacity-100 object-cover rounded-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 m-4 w-72 h-72"
            onClick={handleClick}
        />
        <div className='flex justify-center gap-2 items-center'>
          <p>{name}, {city}</p>
          <img src={flag_url} alt={city} className='w-8'/>
        </div>
    </div>
  )
}

export default HotelCard
