import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getOwner } from "../../context/smartContracts/poetherContract";
import { actions } from "../../context/state";
import { usePoether } from "../../context/usePoether";
import { Loader } from "../common/Loader";

export const Dashboard = () => {
  const {
    state: { isConnected, loading, signerAddress },
    dispatch,
  } = usePoether();

  const [owner, setOwner] = useState(null);

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

  return (
    <div>
     {loading ? <Loader className="w-[500px] h-[500px] mx-auto my-0 py-5" size={500} /> : (
      <>{owner && <p>{owner}</p>}</>
     )}
    </div>
    )
};
