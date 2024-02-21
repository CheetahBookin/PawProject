"use client"

import { getCountries } from '@/services/countryService'
import React, { useEffect, useState } from 'react'
import { CountryType } from '@/types/countryTypes'
import DestinationsCities from '@/components/common/destinationsCities'

function Destinations() {
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  useEffect(() => {
    document.title = 'Destinations'
    const fetchCountries = async () => {
      const response = await getCountries()
      setCountries(response.data)
    }
    fetchCountries()
  }, [])

  const handleExploreClick = (country: string) => {
    setSelectedCountry(country)
  }

  return (
    <main className="bg-brand-secondary text-gray-700">
      {countries.map((country: CountryType, index: number) => (
        <div>
          <div key={index} className="flex items-center justify-between p-4 border-b border-gray-300">
            <div className="flex items-center">
              <img src={country.flag_url} alt={country.country} className="w-12 mr-4" />
              <h2 className="text-2xl font-semibold">{country.country}</h2>
            </div>
            <button onClick={() => handleExploreClick(country.country)} className="px-4 py-2 text-white bg-brand-primary rounded">Explore</button>
          </div>
          {selectedCountry && selectedCountry === country.country && <DestinationsCities selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} />}
        </div>
      ))}
    </main>
  )
}

export default Destinations
