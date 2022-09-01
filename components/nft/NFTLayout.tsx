import Image from "next/image";
import React, { useEffect, useState } from "react";
import { usePoether } from "../../context/usePoether";
import NFTArt from "../../assets/nftArt.svg";
import { Loader } from "../common/Loader";
import { actions } from "../../context/state";
import { getMaxSupply, getTokensCount, mint, presaleStarted } from "../../context/smartContracts/poetherContract";
import { toast } from "react-toastify";

export const NFTLayout = () => {
  const {
    state: { loading, isPresaleEnded, isPresaleStarted, web3Provider, isConnected },
    dispatch,
  } = usePoether();

  const [maxSupply, setMaxSupply] = useState(0);
  const [tokensCounter, setTokensCounter] = useState(0);


  useEffect(() => {
    dispatch({ type: actions.LOADING });
    (async () => {
      const _maxSuppuly = await getMaxSupply();
      const _tokens = await getTokensCount();
      if(_maxSuppuly) setMaxSupply(_maxSuppuly);
      if(_tokens) setTokensCounter(_tokens);
      dispatch({ type: actions.LOADING });
    })();
  },[dispatch]);

  useEffect(() => {
    dispatch({ type: actions.LOADING });
    (async () => {
      const _started = await presaleStarted();
      dispatch({ type: actions.PRESALE, data: { isPresaleStarted: _started } });
      dispatch({ type: actions.LOADING });
    })();
  },[dispatch]);

  const presaleMint = () => mintToken('presaleMint');
  
  const publicMint = () => mintToken('mint')

  const mintToken = async (mintType:string) => {
     if(!isConnected) {
      toast.info("Please connect your wallet!", { autoClose: 3000 });
      return;
     }
     if(!web3Provider) return;
     dispatch({ type: actions.LOADING });     
     const signer = web3Provider.getSigner();
     const minted = await mint(web3Provider, signer, mintType);
     if(minted) {
       toast.success("Token minted!", { autoClose: 3000 });
       const _tokens = await getTokensCount();
       if(_tokens) setTokensCounter(_tokens);
     } else {
      toast.error("Transaction error!", { autoClose: 3000 });
     } 
     dispatch({ type: actions.LOADING });     
  }

  const renderButton = ():JSX.Element => {
    if(tokensCounter >= maxSupply) {
      return (
        <div>
          <div className="text-xl tracking-widest font-light">Sale has finished!</div>
        </div>
      ); 
    }
    
    if (!isPresaleStarted) {
      return (
        <div>
          <div className="text-xl tracking-widest font-light">Presale hasnt started!</div>
        </div>
      );
    }

    if (isPresaleStarted && !isPresaleEnded) {
      return (
        <div>
          <div className="">
            Presale has started!!! If your address is whitelisted, Mint a Crypto
            LETTHER 🥳
          </div>
          <button className="bg-gradient-to-r from-emerald-500 to-lime-600 p-2 rounded-md font-semibold w-[160px] ml-[320px] text-slate-800" onClick={presaleMint}>
            Presale Mint 🚀
          </button>
        </div>
      );
    }

    if (isPresaleStarted && isPresaleEnded) {
      return (
        <button className="bg-gradient-to-r from-emerald-500 to-lime-600 p-2 rounded-md font-semibold w-[160px] ml-[320px] text-slate-800" onClick={publicMint}>
          Public Mint 🚀
        </button>
      );
    }

    return <></>;
  };
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
            <h5 className="py-4 text-xl tracking-widest font-light">
                {tokensCounter} / {maxSupply} tokens minted.
            </h5>
            {renderButton()}
          </div>
        </div>
      )}
      <div className="w-[500px] h-[500px]">
        <Image
          src={NFTArt}
          layout="responsive"
          alt="ilustratiion"
          priority={true}
          unoptimized={true}
        />
      </div>
    </div>
  );
};
