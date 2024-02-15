import React from 'react'
import { HotelTypes } from '@/types/hotelTypes'

type HotelPageProps = HotelTypes & {
  Rates: any
}

function HotelPage({name, address, country, city, type, carParkFee, images, Rooms, Rates}: HotelPageProps) {
  return (
    <>
      <main className="bg-brand-secondary text-black h-full flex flex-col justify-between">
        <h1>{name}</h1>
        <p>{address}, {city}, {country}</p>
        <p>{type}</p>
        <p>{carParkFee}</p>
        <div className='flex gap-12'>
          {images.map((image, index) => (
            <img key={index} src={image.image} alt={name} className='w-96 h-96 object-cover'/>
          ))}
        </div>
        <div className='flex gap-12'>
          {Rooms.map((room, index) => (
            <div key={index} className='bg-brand-primary p-8'>
              <p>{room.roomNumber}</p>
              <p>{room.peopleCapacity}</p>
              <p>{room.priceForPerson}</p>
              <p>{room.childrenPrice}</p>
            </div>
          ))}
        </div>
        <div>
          {Rates.map((rate: any, index: number) => (
            <div key={index}>
              <p>{rate.rateName}</p>
              <p>{rate.price}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}

export default HotelPage
