import { useReducer } from "react";
import { PoetherContext } from "./PoetherContext";
import { initialState, reducer } from "./state";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const PoetherProvider = ({children}:Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <PoetherContext.Provider value={{
       state,
       dispatch
    }}>
     {children}
    </PoetherContext.Provider>
  )
} 