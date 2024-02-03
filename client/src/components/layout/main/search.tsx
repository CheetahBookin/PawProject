import React, { useState } from 'react';

function Search() {
  // const [destination, setDestination] = useState('');
  // const [checkInDate, setCheckInDate] = useState('');
  // const [checkOutDate, setCheckOutDate] = useState('');
  // const [numberOfPersons, setNumberOfPersons] = useState('');

  // const handleSearch = () => {
  //   console.log('Wyszukiwanie dla:', {
  //     destination,
  //     checkInDate,
  //     checkOutDate,
  //     numberOfPersons,
  //   });
  // };

  return (
    <section className="flex flex-col items-center justify-center h-96 bg-brand-secondary  border-gray-300 rounded-md">
      <h2 className="text-2xl font-bold mb-4">Wyszukiwarka</h2>
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          id="destination"
          className="w-1/3 h-10 px-3 border border-gray-300 rounded-l-md focus:outline-none"
          placeholder="Dokąd się wybierasz?"
          // value={destination}
          // onChange={(e) => setDestination(e.target.value)}
        />
        <input
          type="date"
          id="dateCheckIn"
          className="w-1/4 h-10 px-3 border border-gray-300 focus:outline-none"
          placeholder="Od"
          // value={checkInDate}
          // onChange={(e) => setCheckInDate(e.target.value)}
        />
        <input
          type="date"
          id="dateCheckOut"
          className="w-1/4 h-10 px-3 border border-gray-300 focus:outline-none"
          placeholder="Do"
          // value={checkOutDate}
          // onChange={(e) => setCheckOutDate(e.target.value)}
        />
        <input
          type="number"
          id="numberOfPersons"
          className="w-1/4 h-10 px-3 border border-gray-300 focus:outline-none"
          placeholder="Liczba osób"
          min="1"
          // value={numberOfPersons}
          // onChange={(e) => setNumberOfPersons(e.target.value)}
        />
        <button
        id="search"
        className="h-10 bg-brand-primary text-white rounded-md px-4"
        // onClick={handleSearch}
      >
        Szukaj
      </button>
      </div>
    </section>
  );
}

export default Search;
