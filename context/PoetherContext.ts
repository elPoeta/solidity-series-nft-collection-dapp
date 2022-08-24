import { createContext } from "react";
import { IPoetherContext } from "../interfaces/IPoetherContext";
import { initialState } from "./state";

const defaultCoantext: IPoetherContext = {
  state: initialState,
  dispatch: ({}) => {},
};
export const PoetherContext = createContext<IPoetherContext>(defaultCoantext);
