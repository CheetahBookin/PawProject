import React from 'react'
import { RoomImages } from '@/types/hotelTypes'
import { useRouter } from 'next/navigation'

type HotelCardProps = {
    id: number,
    index: number,
    image: RoomImages[],
    name: string,
    city: string
}

function HotelCard({id, index, image, name, city}: HotelCardProps) {
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
            style={{ width: '300px', height: '300px' }}
            className="cursor-pointer opacity-80 hover:opacity-100 object-cover rounded-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 m-4"
            onClick={handleClick}
        />
        <p>{name}, {city}</p>
    </div>
  )
}

export default HotelCard
