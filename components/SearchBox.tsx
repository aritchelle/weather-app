"use client"
import React, {useEffect, useRef} from 'react';
import { SearchIcon } from 'lucide-react';
import { useCityStore } from "@/app/store";
import { useGeo } from '@/app/api/geo';
function SearchBox() {
  const {setCity, setCoordinates}  = useCityStore();
  const inputRef = useRef<HTMLInputElement>(null);






  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const inputValue = inputRef.current?.value;
      if (inputValue) {
        setCity(inputValue);
      }
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const inputValue = inputRef.current?.value;
    if (inputValue) {
      setCity(inputValue);
    }
  };


  return (
    <form onSubmit={handleSubmit} className='flex relative items-center justify-center h-10'>
      <input
        ref={inputRef}
        type="text"
        placeholder='search location'
        className='px-4 py-2 w-[250px] border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-400 h-full'
        onKeyDown={handleKeyDown}
      />
      <button className='px-3 py-[8px] bg-blue-400 text-white rounded-r-md focus:outline-none hover:bg-blue-500 whitespace-nowrap h-full'>
        <SearchIcon/>
      </button>
    </form>
  )
}

export default SearchBox