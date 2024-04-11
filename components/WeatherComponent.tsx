"use client";

import { useWeather } from '@/app/api/weather';
import React from 'react'
import { WeatherCard } from './WeatherCard';
import Spinner from './Spinner';

function WeatherComponent() {
  const {data: weather, isLoading, isFetched} = useWeather();

  return (
    <div className='w-[80%] h-screen mx-auto'>
      {isLoading &&
        <div className='w-full h-[450px] flex justify-center items-center'>
          <Spinner/>
        </div>
      }
      {isFetched && <WeatherCard {...weather!}/>}
    </div>
  )
}

export default WeatherComponent