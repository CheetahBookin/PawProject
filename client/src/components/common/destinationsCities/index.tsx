"use client"

import { browseCitiesByCountry } from '@/services/countryService'
import React, { useEffect, useState } from 'react'
import { CityType } from '@/types/countryTypes'
import DestinationsCitiesHotels from '../destinationCitiesHotels'

interface DestinationsCitiesProps {
  selectedCountry: string | null
  setSelectedCountry: React.Dispatch<React.SetStateAction<string | null>>
}

function DestinationsCities({ selectedCountry, setSelectedCountry }: DestinationsCitiesProps) {

  const [cities, setCities] = useState([])
  const [selectedCity, setSelectedCity] = useState<string | null>(null)
  const closeExploreCities = () => {
    setSelectedCountry(null)
  }

  useEffect(() => {
    const fetchCities = async () => {
      if (!selectedCountry) return
      const response = await browseCitiesByCountry(selectedCountry)
      setCities(response.data)
    }
    fetchCities()
  }, [selectedCountry])

  const handleExploreClick = (city: string) => {
    setSelectedCity(city === selectedCity ? null : city);
  }

  return (
    <div className="p-4 w-full bg-gray-200">
        <div className='flex justify-between'>
            <h2 className="text-2xl font-semibold mb-2">Explore cities in {selectedCountry}</h2>
            <button className="text-3xl" onClick={closeExploreCities}>x</button>
        </div>
        <div>
            {cities.map((city: CityType, index: number) => (
                <div>
                    <div key={index} className="flex items-center justify-between p-4 border-b border-gray-300 w-full">
                        <h3 className="text-lg font-semibold">{city.city}</h3>
                        <div>
                            <button className="px-4 py-2 text-white bg-brand-primary rounded" onClick={()=>handleExploreClick(city.city)}>Explore</button>
                        </div>
                    </div>
                    {selectedCity && selectedCity === city.city && <DestinationsCitiesHotels selectedCity={selectedCity} setSelectedCity={setSelectedCity} />}
                </div>
            ))}
        </div>
    </div>
  )
}

export default DestinationsCities