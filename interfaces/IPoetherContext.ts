import { providers } from "ethers";
import { Dispatch } from "react";

export interface IPoetherState {
  isConnected: boolean;
  signerAddress: string | null;
  web3Provider: providers.Web3Provider | null;
  networkId: number | null;
  loading: boolean;
}

export interface IPoetherContext {
  state: IPoetherState;
  dispatch: Dispatch<IDispatch>;
}
export interface IDispatch {
  type: string;
  data: any;
}
