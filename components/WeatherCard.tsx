import { PropsType } from '@/utils/types';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { getBackgroundColor, iconUrlFromCode, setSystemSymbol, toLocalDate } from '@/lib/helper';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  DropletsIcon,
  SunriseIcon,
  SunsetIcon,
  ThermometerSnowflake,
  WindIcon } from 'lucide-react';

import { useMeasurementUnitStore } from '@/app/store';


export const WeatherCard =(props: PropsType) =>{
  const {timezone, weather,main,wind, name} = props;
  const unit  = useMeasurementUnitStore((state)=> state.unit);

  const weatherData = weather?.reduce((acc: any, curr: any) => {
        for (const key in curr) {
            if (curr.hasOwnProperty(key)) {
                acc[key] = curr[key];
            }
        }
        return acc;
    }, {});

  const formattedDate = toLocalDate(timezone);

  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
};
  const tempInCelsius = main?.temp;
  const feelslikeInCelsius = main?.feels_like;
  const max_temp = main?.temp_max;
  const min_temp = main?.temp_min;

  const sunriseDate = new Date((props?.sys?.sunrise) * 1000);
  const sunsetDate = new Date((props?.sys?.sunset) * 1000);

  useEffect(() => {
    getBackgroundColor(weatherData?.main,tempInCelsius,unit)
  },[tempInCelsius, weatherData?.main,unit])


  return (
      <div className={`max-w-md mx-auto flex flex-col items-center space-x-4`}>
        {/* <div className='h-[150px]'>
          <Image src={""} alt='weather image' height={'100'}/>
        </div> */}
        <div className="bg-white rounded-t-3xl shadow-md w-full mt-4">
          <div className='flex justify-between mb-3'>
            <div className='flex flex-col'>
              <h2 className="text-2xl font-medium text-gray-500 px-6 pt-6">
                {formattedDate}
              </h2>
              <p className='text-gray-400 text-md px-6'>
                  {name}, {props.sys?.country }
              </p>
            </div>
          </div>
          <hr/>
          <div
            className='flex py-12'
            style={{background: getBackgroundColor(weatherData?.main,tempInCelsius, unit)}}
          >
            <div className="text-center py-4flex flex-col justify-center w-1/2 ">
              <Image src={iconUrlFromCode(weatherData?.icon)} alt="cloud image" width={80} height={80} className='mx-auto'/>
              <h2 className="text-4xl font-bold">{tempInCelsius?.toFixed(1)}°{setSystemSymbol(unit)}</h2>
              <h3 className="text-gray-600 capitalize font-bold">{weatherData?.description}</h3>
            </div>
            <div className='w-1/2 flex flex-col justify-center gap-4 text-center items-center'>
              <div
                className='flex flex-col gap-2 justify-center items-center rounded-t-md h-[80px] w-3/4'
                // style={{background: "linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(255,201,140,1) 0%, rgba(251,243,249,1) 100%)"}}
              >
                <h4 className="text-gray-500 font-bold">Feels like</h4>
                <div className='flex gap-2'>
                  <ThermometerSnowflake className='text-gray-400 text-[8px] font-bold'/>
                  <h4 className="text-gray-500 font-bold">{feelslikeInCelsius?.toFixed(1)}°{setSystemSymbol(unit)}</h4>
                </div>
              </div>
              <div
                className='flex flex-col gap-2 justify-center items-center rounded-t-md h-[80px] w-3/4'
                // style={{background: "linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(255,201,140,1) 0%, rgba(251,243,249,1) 100%)"}}
              >
                <div className='flex gap-2'>
                  <DropletsIcon className='text-gray-400 text-[8px] font-bold'/>
                  <h4 className="text-gray-500 font-bold">{main?.humidity}%</h4>
                </div>
                <h4 className="text-gray-500 font-bold">Humidity</h4>
              </div>

            </div>
          </div>
          <div className='flex text-sm border-t-2 py-4 justify-around items-center'>
              <div className='flex flex-col justify-center items-center gap-2 border-r pr-4'>
                <SunriseIcon className='text-gray-400 text-[8px]'/>
                <h4 className="text-gray-500 uppercase">{sunriseDate.toLocaleTimeString(undefined, options)}</h4>
              </div>
              <div className='flex flex-col justify-center items-center gap-2 border-r pr-4'>
                <SunsetIcon className='text-gray-400 text-[8px]'/>
                <h4 className="text-gray-500 uppercase">{sunsetDate.toLocaleTimeString(undefined, options)}</h4>
              </div>
              <div className='flex flex-col justify-center items-center gap-2 border-r pr-4'>
                <ArrowUpIcon className='text-gray-400 text-[8px]'/>
                <h4 className="text-gray-500">{max_temp?.toFixed(1)}°{setSystemSymbol(unit)}</h4>
              </div>
              <div className='flex flex-col justify-center items-center gap-2 pr-4'>
                <ArrowDownIcon className='text-gray-400 text-[8px]'/>
                <h4 className="text-gray-500">{min_temp?.toFixed(1)}°{setSystemSymbol(unit)}</h4>
              </div>
          </div>
        </div>
      </div>
  )
}

