import {
  IDispatch,
  IPoetherContext,
  IPoetherState,
} from "../interfaces/IPoetherContext";

const actions: Record<string, string> = {
  CONNECT: "CONNECT",
  LOADING: "LOADING",
};

const initialState: IPoetherState = {
  isConnected: false,
  signerAddress: null,
  web3Provider: null,
  networkId: null,
  loading: false,
};

const reducer = (state: IPoetherState, action: IDispatch) => {
  const { type, data } = action;

  switch (type) {
    case actions.CONNECT:
      return { ...state, ...data };
    case actions.LOADING:
      return { ...state, loading: !state.loading };
    default:
      return state;
  }
};

export { actions, initialState, reducer };
