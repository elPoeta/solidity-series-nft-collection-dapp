import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { usePoether } from '../../context/usePoether'
import NFTArt from '../../assets/nftArt.svg'
import { Loader } from '../common/Loader';

export const NFTLayout = () => {
  const { state: { loading }, dispatch }  = usePoether();


  return (
    <div className="grid grid-cols-[2fr_1fr] items-center justify-center w-[80%] mx-auto my-20">
    {loading ? (
<Loader className="w-[500px] h-[500px] mx-auto my-0 py-5" size={500} />
) : (
<div>
  <div className="self-start flex flex-col">
    <h2 className="text-4xl py-10">Welcome to poether NFT!</h2>
    <h4 className="text-2xl tracking-widest font-light text-cyan-300">
      NFT collection in cryptos.
    </h4>

  </div>
</div>
)}
<div className='w-[500px] h-[500px]'>
  <Image
    src={NFTArt}
    layout="responsive"
    alt="ilustratiion"
    priority={true}
    unoptimized={true}
  />
</div>
</div>
  )
}
