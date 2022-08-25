import React from 'react'
import { Brand } from './Brand'
import { NavBar } from './NavBar'

export const Header = () => {
  return (
    <header className='bg-slate-900 flex items-center justify-between w-screen h-[70px] overflow-hidden'>
      <Brand />
      <NavBar />
    </header>
  )
}
