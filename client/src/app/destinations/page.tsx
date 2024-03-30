"use client"

import { getCountries } from '@/services/countryService'
import React, { useEffect, useState } from 'react'
import { CountryError, CountryType } from '@/types/countryTypes'
import DestinationsCities from '@/components/common/destinationsCities'
import Loading from '@/components/common/loading'
import { useToast } from '@/components/ui/use-toast'

function Destinations() {
  const [countries, setCountries] = useState<CountryType[] | CountryError>([])
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const { toast } = useToast()
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

  useEffect(() => {
    const showToast = () => {
      if (countries && 'message' in countries) {
        toast({
          title: 'Error',
          description: countries.message,
          variant: "destructive"
        })
      }
    }
    showToast()
  }, [countries, toast])

  return (
    <main className="bg-brand-secondary text-gray-700">
      {Array.isArray(countries) && countries.length !== 0 ? countries.map((country: CountryType, index: number) => (
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
      )) : <Loading />}
    </main>
  )
}

export default Destinations