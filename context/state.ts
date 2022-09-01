import { IDispatch, IPoetherState } from "../interfaces/IPoetherContext";

const actions: Record<string, string> = {
  CONNECT: "CONNECT",
  PRESALE: "PRESALE",
  PAUSE: "PAUSE",
  LOADING: "LOADING",
  RESET: "RESET",
};

const initialState: IPoetherState = {
  isConnected: false,
  signerAddress: null,
  web3Provider: null,
  networkId: null,
  isPresaleStarted: false,
  pause: false,
  loading: false,
};

const reducer = (state: IPoetherState, action: IDispatch) => {
  const { type, data } = action;

  switch (type) {
    case actions.CONNECT:
      return { ...state, ...data };
    case actions.PRESALE:
      return { ...state, isPresaleStarted: data.isPresaleStarted };
    case actions.PAUSE:
      return { ...state, pause: data.pause };
    case actions.LOADING:
      return { ...state, loading: !state.loading };
    case actions.RESET:
      return initialState;
    default:
      return state;
  }
};

export { actions, initialState, reducer };
