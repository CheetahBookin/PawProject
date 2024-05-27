"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { searchForHotel } from "@/services/searchService";
import { useEffect, useRef, useState } from "react";
import { HotelTypesShort } from "@/types/hotelTypes";
import SearchResult from "./searchResult";

function Searcher() {
  const [results, setResults] = useState([] as HotelTypesShort[]);
  const [searchValue, setSearchValue] = useState("");
  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (resultsRef.current && !resultsRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputClick = () => {
    if (searchValue.length > 0) setShowResults(true);
  }

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    setSearchValue(search);
    try {
      const response = await searchForHotel(search);
      if(response.length === 0) return setResults([] as HotelTypesShort[])
      if(search === "") return setResults([] as HotelTypesShort[])
      setResults(response);
      setShowResults(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Find your hotel..."
        className="bg-white rounded-md pl-10 pr-4 py-1.5 border border-gray-400 focus:outline-none focus:border-blue-500 dark:text-font-dark-mode dark:bg-background dark:border-gray-600 dark:placeholder-font-dark-mode dark:ring-foreground dark:ring-1"
        value={searchValue}
        onChange={(e) => handleChange(e)}
        onClick={handleInputClick}
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
      </div>
      {showResults && results.length > 0 && (
        <div className="absolute mt-2 w-full max-h-40 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg" ref={resultsRef}>
          {results.map((result) => (
            <SearchResult key={result.id} result={result} setResults={setResults} setSearchValue={setSearchValue}/>
          ))}
        </div>
      )}
    </div>
  );
}

export default Searcher;
