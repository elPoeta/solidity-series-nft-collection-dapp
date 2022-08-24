import { useContext } from "react";
import { IPoetherContext } from "../interfaces/IPoetherContext";
import { PoetherContext } from "./PoetherContext";

export const usePoether = () => useContext<IPoetherContext>(PoetherContext);
