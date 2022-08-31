import Image from 'next/image';
import Link from 'next/link'
import React from 'react'
import hat from '../../assets/poetahat.svg';
import Logo from './Logo';

export const Brand = () => {
  return (
    <div>
       <Link href="/">      
        <a className='flex items-center justify-center'>
          <Logo fill="#61c65e" classNames="w-24 h-24" /> 
          <h1 className='text-4xl px-4'>poether</h1>
        </a>
      </Link>
    </div>
  )
}
