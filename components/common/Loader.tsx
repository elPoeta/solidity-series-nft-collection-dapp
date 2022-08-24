import Image from 'next/image';
import React from 'react'
import loader from '../../assets/loader.svg';

type LoaderType = {
  className:string,
   size:number
}

export const  Loader = ({ className, size }:LoaderType) => (    
      <div className={className}>
        <Image
         unoptimized
         src={loader}
         alt="Loading..."
         layout='responsive'
         width={size}
         height={size}
        />
     </div>
);
