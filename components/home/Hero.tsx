import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import nftArt from '../../assets/NFT-blockchain.svg';

export const Hero = () => {
  return (
    <section className='grid grid-cols-2 items-center justify-center gap-2'>
      <div className='justify-self-center flex flex-col'>
        <h2 className='text-8xl text-green-500 p-4'>Poether</h2>
        <h4 className='text-2xl text-pink-400 text-center font-bold'>NFT Collections.</h4>
        <h6 className='py-2 text-center font-light text-xl text-gray-200'>Buy your LETTHER tokens.</h6>
        <div className='flex flex-row items-center justify-end'>
          <Link href="/whitelist"><a className='bg-gradient-to-tr from-fuchsia-600 to-pink-600 rounded-md px-5 py-2 mt-3'>Join Us</a></Link>
          <p className='text-2xl px-5 py-2 mt-3'>or</p>
          <Link href="/mint"><a className='bg-gradient-to-tl from-green-500 to-green-700 rounded-md px-5 py-2 mt-3'>Mint</a></Link>
        </div>
      </div>
      <div className='self-start max-w-screen-md max-h-screen-sm'>
        <Image 
          src={nftArt}
          alt="NFT Art Image"
          layout='responsive'    
          priority={true}   
          unoptimized={true}  
        />
      </div>
    </section>
  )
}
