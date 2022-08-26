import Image from 'next/image'
import React from 'react'
import nftArt from '../../assets/nftArt.svg';

export const Hero = () => {
  return (
    <section className='grid grid-cols-2 items-center justify-center gap-2'>
      <div className='justify-self-center'>
        <h2 className='text-8xl text-green-500 p-4'>Poether</h2>
        <h4 className='text-2xl text-pink-400 text-center font-bold'>NFT Collections.</h4>
        <h6 className='py-2 text-center font-light text-xl text-gray-200'>Buy your LETTHER tokens.</h6>
      </div>
      <div className='self-start max-w-screen-md max-h-screen-sm'>
        <Image 
          src={nftArt}
          alt="NFT Art Image"
          width={400}
          height={400}
          layout='responsive'         
        />
      </div>
    </section>
  )
}
