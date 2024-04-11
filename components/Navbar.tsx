import React from 'react'
import SearchBox from './SearchBox';
import { SunIcon } from 'lucide-react';
import { Menu } from './Menu';
import { MenuDrawer } from './MenuDrawer';

function Navbar() {
  return (
    <nav className='shadow-sm sticky top-0 left-0 z-50 bg-white py-6 test'>
      <div className='h[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto'>
        <div className='flex items-center justify-center gap-2'>
          <h2 className='text-gray-500 text-3xl'>Weather</h2>
          <SunIcon className='text-yellow-400'/>
        </div>
        <section className='hidden md:flex justify-center items-center gap-12'>
          <Menu/>
          <SearchBox/>
        </section>
        <section className='block  md:hidden bg-white z-50'>
          <MenuDrawer/>
        </section>
      </div>
    </nav>
  )
}
export default Navbar