import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import whitelistIlustartion from "../../assets/whitelistIlustration.svg";
import {
  getJoined,
  getMaxListedAddress,
  getWhiteListContract,
  isInWhitelist,
} from "../../context/smartContracts/whitelistContract";
import { actions } from "../../context/state";
import { usePoether } from "../../context/usePoether";
import { Loader } from "../common/Loader";

export const WhitelistLayout = () => {
  const {
    state: { isConnected, loading, signerAddress, web3Provider },
    dispatch,
  } = usePoether();
  const [isListed, setIsListed] = useState(false);
  const [joined, setJoined] = useState(0);
  const [maxListed, setMaxListed] = useState(10);

  useEffect(() => {
    dispatch({ type: actions.LOADING });
    (async () => {
      setJoined(await getJoined());
      setMaxListed(await getMaxListedAddress());
      dispatch({ type: actions.LOADING });
    })();
  }, [dispatch]);

  useEffect(() => {
    dispatch({ type: actions.LOADING });
    (async () => {
      if (isConnected) setIsListed(await isInWhitelist(signerAddress!));
      dispatch({ type: actions.LOADING });
    })();
  }, [dispatch, isConnected, signerAddress]);

  const handleJoin = async () => {
    if (joined >= maxListed) return;
    if (!isConnected) {
      toast.info("Please connect your wallet!", { autoClose: 3000 });
    }
    if (!web3Provider) return;
    dispatch({ type: actions.LOADING});
    const connectedSigner = web3Provider.getSigner();
    const whitelistContract = await getWhiteListContract(
      web3Provider,
      connectedSigner
    );
    const tx = await whitelistContract.addAddressToWhiteList();
    tx.wait();
    setJoined(await getJoined());
    setIsListed(true);
    dispatch({ type: actions.LOADING});
  };

  return (
  
        <div className="grid grid-cols-[2fr_1fr] items-center justify-center w-[80%] mx-auto my-20">
              {loading ? (
        <Loader className="w-[500px] h-[500px] mx-auto my-0 py-5" size={500} />
      ) : (
          <div>
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
          </div>
      )}
          <div>
            <Image
              src={whitelistIlustartion}
              layout="responsive"
              alt="ilustratiion"
              priority={true}
              unoptimized={true}
            />
          </div>
        </div>
  );
};
