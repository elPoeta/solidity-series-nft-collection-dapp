import { IDispatch, IPoetherState } from "../interfaces/IPoetherContext";

const actions: Record<string, string> = {
  CONNECT: "CONNECT",
  PRESALE: "PRESALE",
  LOADING: "LOADING",
  RESET: "RESET",
};

const initialState: IPoetherState = {
  isConnected: false,
  signerAddress: null,
  web3Provider: null,
  networkId: null,
  isPresaleStarted: false,
  loading: false,
};

const reducer = (state: IPoetherState, action: IDispatch) => {
  const { type, data } = action;

  switch (type) {
    case actions.CONNECT:
      return { ...state, ...data };
    case actions.PRESALE:
      return { ...state, isPresaleStarted: data.isPresaleStarted };
    case actions.LOADING:
      return { ...state, loading: !state.loading };
    case actions.RESET:
      return initialState;
    default:
      return state;
  }
};

export { actions, initialState, reducer };
