"use client"
import React, { useEffect, useState } from 'react'
import { useHistory } from '../api/history'
import TemperatureChart from '@/components/TemperatureChart';
import { useCityStore, useMeasurementUnitStore } from '../store';
import Spinner from '@/components/Spinner';
import { QueryClient, useQueryClient } from '@tanstack/react-query';

interface ITempData {
  temperatureData: {
      dates: string[];
      highs: number[];
      lows: number[];
    }
  }

const Page = () => {
  const {data, isLoading, isFetched } = useHistory();
  const unit  = useMeasurementUnitStore((state)=> state.unit);
  const locationInfo = data?.location?.name

  const tempData: ITempData = {
    temperatureData:{
      dates: [],
      highs: [],
      lows: []
    }
  }
  /**
   *
   * @param unit The unit that the user's selected, ex. symbol C,F,K.
   * @param type the key that we want to fetch from the API ex.max/min.
   * @returns What key from the API will be used; ex. maxtemp_c or mintemp_c
   */
  const selectUnit=(unit: string, type: string)=> {
    switch (unit.toLowerCase()) {
      case 'metric':
        return type === 'max' ? 'maxtemp_c' : 'mintemp_c'
        case 'imperial':
          return type === 'max'? 'maxtemp_f' : 'mintemp_f'
          default:
            return type === 'max' ? 'maxtemp_c' : 'mintemp_c'
          }
        }

        /**
         * since we're just using the free tier version,
         * we will just filter the necessary  information for our component,
         * and return only what is needed to feed for Chart.js
         * we only need dates, highs, and lows for Chart,
         * those the key we need is dates, maxtemp, mintemp and the sufix unit which is c/f
         */
        data?.forecast?.forecastday?.map((item: any) => {
          if(item.date) tempData.temperatureData.dates = [...tempData.temperatureData.dates,item.date];
          if(item.day[selectUnit(unit, 'max' )]){
            tempData.temperatureData.highs = [
              ...tempData.temperatureData.highs,
              (unit ?  item.day[selectUnit(unit, 'max' )] : (item.day[selectUnit(unit, 'max' )] + 273.15))
            ];
          }
          if(item.day[selectUnit(unit, 'min' )]) {
            tempData.temperatureData.lows = [
              ...tempData.temperatureData.lows,
              (!!unit ? item.day[selectUnit(unit, 'min' )] : (item.day[selectUnit(unit, 'min' )] + 273.15))
            ];
          }
        })

        return (
          <div className='w-[80%] h-screen mx-auto'>
            {isLoading &&
              <div className='w-full h-[450px] flex justify-center items-center'>
                <Spinner/>
              </div>
            }
          {
            isFetched &&
            <>
              <div className='py-4'>
                <h3 className='text-center text-gray-400 font-semibold'>
                  {data?.location?.name}, {data?.location?.region}, {data?.location?.country}
                </h3>
                <h3 className='text-center text-gray-400 font-semibold'>
                  Temperature History for the past 10 days
                </h3>
              </div>
              <TemperatureChart {...tempData}/>
            </>
          }
    </div>
  )
}

export default Page