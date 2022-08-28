import Image from 'next/image'
import React, { useState } from 'react'
import whitelistIlustartion from '../../assets/whitelistIlustration.svg'
import { usePoether } from '../../context/usePoether'
import { Loader } from '../common/Loader'

export const WhitelistLayout = () => {
  const {state:{isConnected, loading}, dispatch} = usePoether();
  const [isListed, setIsListed ] = useState(false);
  const [joined, setJoined] = useState(0);
  const [maxListed, setMaxLisTed] = useState(10);

  const handleJoin = () => {

  }

  return (
    <div className='grid grid-cols-[2fr_1fr] items-center justify-center w-[80%] mx-auto my-20'>
       <div>
      {loading ? (
        <Loader className="w-[500px] h-[500px] mx-auto my-0 py-5" size={500} />
      ) : (
        <div className="self-start flex flex-col">
          <h2 className="text-4xl py-10">Welcome to poether whitelist!</h2>
          <h4 className="text-2xl tracking-widest font-light text-cyan-300">
            Collections for developers in Crypto.
          </h4>
          <h5 className="py-4 text-xl tracking-widest font-light">
            {joined} / {maxListed} have already joined to the whitelist
          </h5>
          {(!isConnected || !isListed) && (
            <button
              onClick={handleJoin}
              className="bg-gradient-to-r from-emerald-500 to-lime-600 p-2 rounded-md font-semibold w-[160px] ml-[320px]"
            >
              {joined < maxListed ? "Join the whitelist" : "Join closed"}
            </button>
          )}
        </div>
      )}
       </div>
       <div>
        <Image 
         src={whitelistIlustartion}
         width={600}
         height={600}
         layout='responsive'
         alt='ilustratiion'
        />
       </div>
    </div>
  )
}
