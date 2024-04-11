import React from 'react'

import { HistoryIcon, HomeIcon, SunIcon } from 'lucide-react';
import Link from 'next/link';
import { SheetClose } from './ui/sheet';

export const Menu =(props: any) => {
  const [SheetCloseWrapper, shetCloseWrapperProps] = props.withSheetClose
    ? [SheetClose, { asChild: true }]
    : [React.Fragment, {}];

  return (
    <ul className='flex flex-col md:flex-row gap-6 md:gap-4 mt-8 md:mt-0'>
      <li className="text-gray-500 hover:text-blue-500 uppercase font-bold">
        <SheetCloseWrapper {...shetCloseWrapperProps}>
          <Link href="/" className="flex">
            <HomeIcon className="h-5 w-5 mr-1"/>
            <span>Home</span>
          </Link>
        </SheetCloseWrapper>
      </li>
      <li className="text-gray-500 hover:text-blue-500 uppercase font-bold">
        <SheetCloseWrapper {...shetCloseWrapperProps}>
          <Link href="/forecast" className="flex">
            <SunIcon className="h-5 w-5 mr-1" />
            <span>Forecast</span>
          </Link>
        </SheetCloseWrapper>
      </li>
      <li className="text-gray-500 hover:text-blue-500 uppercase font-bold">
        <SheetCloseWrapper {...shetCloseWrapperProps}>
          <Link href="/history" className="flex">
            <HistoryIcon className="h-5 w-5 mr-1" />
            <span>History</span>
          </Link>
        </SheetCloseWrapper>
      </li>
    </ul>
  )
}