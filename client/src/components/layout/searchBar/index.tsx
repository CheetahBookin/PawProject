"use client"

import React, { useState } from 'react';
import Label from '@/components/common/label';
import Counter from '@/components/common/counter';
import { searchForCountryOrCity } from '@/services/searchService';
import { FullSearchResults, SearchResultsForCountryOrCity } from '@/types/searchTypes';
import SearchResults from '@/components/common/searchBarResults';
import Loading from '@/components/common/loading';

function Search() {
  const [data, setData] = useState({
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

  const handleSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(data);
  }

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const key = e.key
    if(key === 'Backspace'){
      setClicked(false);
    }
  }

  return (
    <section className="flex flex-col items-center justify-center w-full bg-brand-secondary border-gray-300 rounded-md p-6 lg:w-3/4 md:w-full">
      <h2 className="text-2xl font-bold mb-4">Search For Your Dream Tour!</h2>
      <form className="flex flex-col md:flex-row md:space-x-2 lg:flex-row mb-4 w-full items-center" action="/search" method='POST'>
        <div className="w-full relative z-50">
          <Label
            inputType={'text'}
            placeholder={'Where do you want to go?'}
            onChange={(e) => handleDestinationChange(e)}
            onKeyDown={(e) => handleOnKeyDown(e)}
            name={'destination'}
            value={clicked ? destination : undefined}
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:border-brand-primary"
            noLabel={true}
          />
          {searchResults && <SearchResults results={searchResults.result} setData={setData} clicked={setClicked} destination={setDestination} setSearchResult={setSearchResults}/>}
        </div>
        <Label
          inputType={'date'}
          placeholder={'Check In'}
          onChange={(e) => handleChange(e)}
          name={'checkInDate'}
          className="w-full md:w-1/4 rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:border-brand-primary"
          noLabel={true}
        />
        <Label
          inputType={'date'}
          placeholder={'Check Out'}
          onChange={(e) => handleChange(e)}
          name={'checkOutDate'}
          className="w-full md:w-1/4 rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:border-brand-primary"
          noLabel={true}
        />
        <div className="flex items-center space-x-4">
          <Counter label='Children' onChangeCount={(count) => handleChangeCount('children', count)} />
          <Counter label='Adults' onChangeCount={(count) => handleChangeCount('adults', count)} />
        </div>
        <button
          id="search"
          className="h-10 bg-brand-primary text-white rounded-md px-4 self-center md:self-start"
          onClick={e=>handleSearch(e)}
        >
          Search
        </button>
      </form>
    </section>
  );
}

export default Search;
