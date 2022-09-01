import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getOwner, getPause, presaleStarted } from "../../context/smartContracts/poetherContract";
import { actions } from "../../context/state";
import { usePoether } from "../../context/usePoether";
import { Loader } from "../common/Loader";
import OwnerDasboard from "./OwnerDasboard";

export const Dashboard = () => {
  const {
    state: { isConnected, loading, signerAddress, web3Provider },
    dispatch,
  } = usePoether();

  const [owner, setOwner] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    dispatch({ type: actions.LOADING });
    (async () => {
      const ownerAdderess = await getOwner();
      const owner = ownerAdderess === signerAddress ? ownerAdderess : null;
      setOwner(owner);
      dispatch({ type: actions.LOADING });
    })();
  }, [dispatch,signerAddress]);

  useEffect(() => {
    if (!isConnected) router.push("/");
  }, [router, isConnected]);

  useEffect(()=>{
    dispatch({ type: actions.LOADING });
   (async () => {
    const isStarted = await presaleStarted();
    dispatch({type: actions.PRESALE, data: {isPresaleStarted: isStarted}});
    dispatch({ type: actions.LOADING });
   })();
  },[dispatch]);

  useEffect(()=>{
    dispatch({ type: actions.LOADING });
   (async () => {
    const pause = await getPause();
    dispatch({type: actions.PAUSE, data: { pause }});
    dispatch({ type: actions.LOADING });
   })();
  },[dispatch]);

  return (
    <div>
     {loading ? <Loader className="w-[500px] h-[500px] mx-auto my-0 py-5" size={500} /> : (
      <div>
        {owner && <OwnerDasboard />}
      </div>
     )}
    </div>
    )
};


