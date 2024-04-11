"use client"
import { useMeasurementUnitStore } from '@/app/store';
import React from 'react'

export const UnitButton=()=> {
  const {unit,setUnit}  = useMeasurementUnitStore();

  const activeUnit = (u: string): String => {
    return unit === u ? 'text-orange-500 font-[800]' : ''
  }
  return (
    <>
      <div className="flex justify-center gap-2 items-center  font-bolder mt-4 w-full">
        <button
          className={`text-2xl font-bolder text-gray-500 hover:text-blue-500 ${activeUnit('metric')}`}
          onClick={()=>setUnit('metric')}
        >°C</button>
        <span>|</span>
        <button
          className={`text-2xl font-bolder  text-gray-500 hover:text-blue-500 ${activeUnit('imperial')}`}
          onClick={()=>setUnit('imperial')}
        >°F</button>
        <span>|</span>
        <button
          className={`text-2xl font-bolder  text-gray-500 hover:text-blue-500 ${activeUnit('')}`}
          onClick={()=>setUnit('')}
        >°K</button>
      </div>
      <span className='capitalize text-gray-400'>{unit ? unit : 'Standard'} system</span>
    </>
  )
}