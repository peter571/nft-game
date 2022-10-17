import Game from "../utils/MyEpicGame.json";
import { CONTRACT_ADDRESS } from "../constant";
import { createContext, useContext, useEffect, useState } from "react";
import { characterDataProp, ProviderProp } from "../types";
import { use } from "chai";
import { getAllCharacters } from "./contractMethods";

interface ContractState {
  characters: characterDataProp[];
}

const ContractContext = createContext<ContractState>({} as ContractState);

export function useContract() {
  return useContext(ContractContext);
}

const ContractProvider = ({ children }: ProviderProp) => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getAllCharacters();
      setCharacters(data);
    })();
  }, []);

  return (
    <ContractContext.Provider value={{ characters }}>
      {children}
    </ContractContext.Provider>
  );
};

export default ContractProvider;
