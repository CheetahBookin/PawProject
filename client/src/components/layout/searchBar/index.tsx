"use client"

import React, { useState } from 'react';
import Label from '@/components/common/label';
import Counter from '@/components/common/counter';
import { searchForCountryOrCity } from '@/services/searchService';
import { FullSearchResults, SearchForTrip, SearchResultsForCountryOrCity } from '@/types/searchTypes';
import SearchResults from '@/components/common/searchBarResults';
import { useRouter } from 'next/navigation'

function SearchBar() {
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const [data, setData] = useState<SearchForTrip>({
    destination: '',
    checkInDate: '',
    checkOutDate: '',
    children: 0,
    adults: 0
  });
  const [searchResults, setSearchResults] = useState<FullSearchResults | undefined>();
  const [destination, setDestination] = useState<string>('');
  const [clicked, setClicked] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  }

  const handleDestinationChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    if(text.length == 0) return setSearchResults(undefined)
    const fullResults = [] as string[];
    const response = await searchForCountryOrCity(text) as SearchResultsForCountryOrCity
    if(response){
      if(response.cities.length == 0 && response.countries.length == 0) return setSearchResults(undefined)
      response.cities.forEach((city: string) => {
        if(city.toLowerCase().includes(text.toLowerCase())){
          fullResults.push(city);
        }
      });
      response.countries.forEach((country: string) => {
        if(country.toLowerCase().includes(text.toLowerCase())){
          fullResults.push(country);
        }
      });
      setSearchResults({result: fullResults});
    }
  }

  const handleChangeCount = (label: string, count: number) => {
    setData({
      ...data,
      [label.toLowerCase()]: count
    });
  };

  const createQueryString = (data: object) =>{
    let query = '';
    for(const [key, value] of Object.entries(data)){
      query += `${key}=${value}&`
    }
    return query;
  }

  const validateData = (data: SearchForTrip) => {
    if(data.destination.length == 0) return "You have to go somewhere";
    if(data.checkInDate.length == 0) return "You have to check in";
    if(data.checkOutDate.length == 0) return "You have to check out";
    const checkIn = new Date(data.checkInDate);
    const checkOut = new Date(data.checkOutDate);
    if(checkIn > checkOut) return "You can't go back in time dumbass";
    if(checkIn < new Date()) return "You can't go back in time dumbass"
    if(data.adults == 0) return "There must be at least one adult on the trip"

    return true;
  }

  const handleSearch = async(e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try{
      const validation = validateData(data)
      if(validation !== true){
        setError(validation)
        return
      }
      router.push(`/search?${createQueryString(data)}`)
    }catch(err){
      console.log(err)
    }
  }

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const key = e.key
    if(key === 'Backspace'){
      setClicked(false);
    }
  }

  return (
    <section className="flex flex-col items-center justify-center w-full bg-brand-secondary border-gray-300 rounded-md p-6 lg:w-3/4 md:w-full dark:bg-background">
  <h2 className="text-2xl font-bold mb-4 dark:text-font-dark-mode">Search For Your Dream Tour!</h2>
  <form className="flex flex-col md:flex-row md:space-x-2 lg:flex-row mb-4 w-full items-center" action="/search" method='POST'>
    <div className="w-full relative z-50">
      <Label
        inputType={'text'}
        placeholder={'Where do you want to go?'}
        onChange={(e) => handleDestinationChange(e)}
        onKeyDown={(e) => handleOnKeyDown(e)}
        name={'destination'}
        value={clicked ? destination : undefined}
        className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:border-brand-primary dark:text-font-dark-mode dark:bg-background dark:border-gray-600 dark:placeholder-font-dark-mode dark:ring-foreground dark:ring-1"
        noLabel={true}
      />
      {searchResults && <SearchResults results={searchResults.result} setData={setData} clicked={setClicked} destination={setDestination} setSearchResult={setSearchResults}/>}
    </div>
    <Label
      inputType={'date'}
      placeholder={'Check In'}
      onChange={(e) => handleChange(e)}
      name={'checkInDate'}
      className="w-full md:w-1/4 rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:border-brand-primary dark:text-font-dark-mode dark:bg-background dark:border-gray-600 dark:placeholder-font-dark-mode dark:ring-foreground dark:ring-1"
      noLabel={true}
    />
    <Label
      inputType={'date'}
      placeholder={'Check Out'}
      onChange={(e) => handleChange(e)}
      name={'checkOutDate'}
      className="w-full md:w-1/4 rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:border-brand-primary dark:text-font-dark-mode dark:bg-background dark:border-gray-600 dark:placeholder-font-dark-mode dark:ring-foreground dark:ring-1"
      noLabel={true}
    />
    <div className="flex items-center space-x-4">
      <Counter label='Children' onChangeCount={(count) => handleChangeCount('children', count)} />
      <Counter label='Adults' onChangeCount={(count) => handleChangeCount('adults', count)} />
    </div>
    <button
      id="search"
      className="h-10 bg-brand-primary text-white rounded-md px-4 self-center md:self-start dark:bg-brand-primary-dark"
      onClick={e=>handleSearch(e)}
    >
      Search
    </button>
  </form>
  {error && <p className="text-red-500 text-md">{error}</p>}
</section>
  );
}

export default SearchBar;