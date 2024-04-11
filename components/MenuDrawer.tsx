import React from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { MenuIcon } from 'lucide-react';
import { Menu } from './Menu';

export const MenuDrawer=()=> {
  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon className="h-12 w-12 mr-1"/>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className='text-left'>Weather</SheetTitle>
          <hr />
        </SheetHeader>
        <SheetFooter>
          <SheetClose asChild>
            <Menu withSheetClose/>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}