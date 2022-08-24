import { providers } from "ethers";
import { useReducer, useState } from "react";
import { PoetherContext } from "./PoetherContext";
import { initialState, reducer } from "./state";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const PoetherProvider = ({children}:Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const [isConnected, setIsConnected] = useState(false);
  // const [signerAddress, setSignerAddress] = useState<string | undefined>(undefined);
  // const [web3Provider, setWeb3Provider] = useState<providers.Web3Provider | undefined>(undefined);
  
  const connectWallet = () => {}

  return (
    <PoetherContext.Provider value={{
       state,
       dispatch
    }}>
     {children}
    </PoetherContext.Provider>
  )
} 