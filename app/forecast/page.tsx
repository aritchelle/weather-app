"use client"
import React, { useEffect, useState } from 'react'
import { useForecast } from '../api/forecast';
import { useCityStore, useMeasurementUnitStore } from '../store';
import { PropsType } from '@/utils/types';
import Image from 'next/image';
import { ArrowDownIcon, ArrowUpIcon, DropletsIcon, SunriseIcon, SunsetIcon, ThermometerSnowflake } from 'lucide-react';
import { getBackgroundColor, iconUrlFromCode, localeTimeZone, setSystemSymbol } from '@/lib/helper';
import { useGeo } from '../api/geo';
import Spinner from '@/components/Spinner';


function Page() {
  const {city, cityCoordinates, setCoordinates} = useCityStore();
  const unit  = useMeasurementUnitStore((state)=> state.unit);
  const uniqueDates:string[] = [];
  let lat, lon;

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  const {data: geoLocation, isFetched} = useGeo();

  if(isFetched){
    lat= geoLocation[0]?.lat;
    lon= geoLocation[0]?.lon;
  }


  const {data, isLoading, isFetched: forecastFetched} = useForecast(lat, lon);

  const forecastData = data?.list || [];

  const extractDate = (data: number) => {
    const d = new Date(data * 1000);
    return new Intl.DateTimeFormat(undefined,{hour: 'numeric', minute: '2-digit', hour12: true }).format(d)
  }

  const dateFormat=(date: string)=> {
    const newDate = new Date(date);
    return new Intl.DateTimeFormat(undefined,options).format(newDate)
  }

  forecastData?.forEach((item: any)=> {
    const date = new Date(item.dt_txt).toLocaleDateString();
      if (!uniqueDates.includes(date)) {
        uniqueDates.push(date);
      }
  })

  const filtered = uniqueDates.map((date) => {
    const filteredItem = forecastData.find((item: any) => {
      return new Date(item.dt_txt).toLocaleDateString() === date;
    });
    return filteredItem;
  }).slice(0,5);

  return (
    <>
      {isLoading &&
        <div className='w-full h-[450px] flex justify-center items-center'>
          <Spinner/>
        </div>
      }
      {forecastFetched && <div>
        <div className='w-full mx-auto px-10'>
          <h3 className='text-center md:text-left mt-4 md:mt-0 text-2xl font-medium text-gray-700'>Daily Forecast</h3>
        </div>
        <div className='w-full h-screen mx-auto flex flex-wrap gap-4 px-10'>
          {/* <pre>{JSON.stringify(forecastData, null, 2)}</pre> */}
          {filtered.map((item: PropsType)=> (
            <div key={item.dt} className={`max-w-sm mx-auto flex flex-col items-center space-x-4`}>
            <div className="bg-white rounded-t-3xl shadow-md w-full mt-4">
              <div className='flex justify-between mb-3'>
                <div className='flex flex-col'>
                  <h2 className="text-2xl md:text-xl font-medium text-gray-500 px-6 pt-6">
                    {dateFormat(item.dt_txt!)}
                  </h2>
                  <p className='text-gray-400 text-md px-6'>
                      {data.city.name}, {data.city.country }
                  </p>
                </div>
              </div>
              <hr/>
              <div
                className='flex'
                style={{background: getBackgroundColor(item.weather[0].main,item.main.temp, unit)}}
              >
                <div className="text-center px-2 py-4flex flex-col justify-center w-1/2 ">
                  <Image src={iconUrlFromCode(item.weather[0].icon)} alt="cloud image" width={80} height={80} className='mx-auto'/>
                  <h2 className="text-3xl md:text-2xl font-bold">{item.main.temp.toFixed(1)}°{setSystemSymbol(unit)}</h2>
                  <h3 className="text-gray-600 capitalize font-bold">{item.weather[0].description}</h3>
                </div>
                <div className='w-1/2 flex flex-col justify-center gap-4 text-center items-center'>
                  <div
                    className='flex flex-col gap-2 justify-center items-center rounded-t-md h-[80px] w-3/4'
                    // style={{background: "linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(255,201,140,1) 0%, rgba(251,243,249,1) 100%)"}}
                  >
                    <h4 className="text-gray-500 font-bold">Feels like</h4>
                    <div className='flex gap-2'>
                      <ThermometerSnowflake className='text-gray-400 text-[8px] font-bold'/>
                      <h4 className="text-gray-500 font-bold">{item.main.feels_like.toFixed(1)}°{setSystemSymbol(unit)}</h4>
                    </div>
                  </div>
                  <div
                    className='flex flex-col gap-2 justify-center items-center rounded-t-md h-[80px] w-3/4'
                    // style={{background: "linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(255,201,140,1) 0%, rgba(251,243,249,1) 100%)"}}
                  >
                    <div className='flex gap-2'>
                      <DropletsIcon className='text-gray-400 text-[8px] font-bold'/>
                      <h4 className="text-gray-500 font-bold">{item.main.humidity}%</h4>
                    </div>
                    <h4 className="text-gray-500 font-bold">Humidity</h4>
                  </div>

                </div>
              </div>
              <div className='flex text-xs border-t-2 justify-around items-center py-2'>
                  <div className='flex flex-col justify-center items-center gap-2 border-r pr-4'>
                    <SunriseIcon className='text-gray-400 text-[8px]'/>
                    <h4 className="text-gray-500 uppercase">{extractDate(data.city.sunrise)}</h4>
                  </div>
                  <div className='flex flex-col justify-center items-center gap-2 border-r pr-4'>
                    <SunsetIcon className='text-gray-400 text-[8px]'/>
                    <h4 className="text-gray-500 uppercase">{extractDate(data.city.sunset)}</h4>
                  </div>
                  <div className='flex flex-col justify-center items-center gap-2 border-r pr-4'>
                    <ArrowUpIcon className='text-gray-400 text-[8px]'/>
                    <h4 className="text-gray-500">{item.main.temp_max.toFixed(1)}°{setSystemSymbol(unit)}</h4>
                  </div>
                  <div className='flex flex-col justify-center items-center gap-2 pr-4'>
                    <ArrowDownIcon className='text-gray-400 text-[8px]'/>
                    <h4 className="text-gray-500">{item.main.temp_min.toFixed(1)}°{setSystemSymbol(unit)}</h4>
                  </div>
              </div>
            </div>
          </div>
          ))}
        </div>
      </div>}
    </>
  )
}

export default Page