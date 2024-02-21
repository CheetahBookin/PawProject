import { browseHotelsByCity } from '@/services/countryService'
import React, { useEffect, useState } from 'react'

interface DestinationsCitiesHotelsProps {
    selectedCity: string | null
    setSelectedCity: React.Dispatch<React.SetStateAction<string | null>>
}

function DestinationsCitiesHotels({ selectedCity, setSelectedCity }: DestinationsCitiesHotelsProps) {
  const [hotels, setHotels] = useState([])
  useEffect(() => {
    const fetchHotels = async () => {
      if(!selectedCity) return
      const response = await browseHotelsByCity(selectedCity)
      setHotels(response.data)
    }
    fetchHotels()
  }, [selectedCity])
  return (
    <div className='p-4 w-full bg-gray-100'>
        {hotels.map((hotel: any, index: number) => (
            <div key={index} className="flex flex-col p-4 border-b border-gray-300 w-full">
                <div className='flex justify-between text-3xl items-center'>
                    <h2 className="text-2xl font-semibold mb-2">Explore hotels in {selectedCity}</h2>
                    <button onClick={()=>setSelectedCity(null)} className='cursor-pointer'>x</button>
                </div>
                <div className='flex items-center cursor-pointer hover:bg-gray-300'>
                    <img src={hotel.images[0].image} alt={hotel.name} className="w-52 h-40  object-cover mr-4" />
                    <h3 className="text-lg font-semibold">{hotel.name}</h3>
                </div>
            </div>
        ))}
    </div>
  )
}

export default DestinationsCitiesHotels
