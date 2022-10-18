import { createContext, useContext, useEffect, useState } from "react";
import { CharacterData, ProviderProp } from "../types";
import {
  getAllCharacters,
  gameContractInstance,
  fetchRex,
  runAttackAction,
} from "./contractMethods";
import { useWallet } from "./WalletProvider";
import { BigNumber } from "ethers";

interface ContractState {
  characters: CharacterData[];
  rex: CharacterData | null;
  attackState: string;
  attack: () => Promise<void>;
}

const ContractContext = createContext<ContractState>({} as ContractState);

export function useContract() {
  return useContext(ContractContext);
}

const ContractProvider = ({ children }: ProviderProp) => {
  const [characters, setCharacters] = useState([]);
  const [rex, setRex] = useState<CharacterData | null>(null);
  const [attackState, setAttackState] = useState("");
  const { currentAccount, setCharacterNFT } = useWallet();

  const attack = async () => {
    try {
      setAttackState("attacking");
      await runAttackAction();
      setAttackState("hit");
    } catch (error) {
      setAttackState("");
    }
  };

  useEffect(() => {
    (async () => {
      const rexData = await fetchRex();
      setRex(rexData);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const data = await getAllCharacters();
      setCharacters(data);
    })();
  }, [currentAccount]);

  useEffect(() => {
    const onCharacterMint = async (
      sender: string,
      tokenId: BigNumber,
      characterIndex: BigNumber
    ) => {
      console.log(
        `CharacterNFTMinted - sender: ${sender} tokenId: ${tokenId.toNumber()} characterIndex: ${characterIndex.toNumber()}`
      );
      const data = await getAllCharacters();
      setCharacters(data);
    };

    const gameContract = gameContractInstance();
    if (gameContract) {
      gameContract.on("CharacterNFTMinted", onCharacterMint);
    }

    return () => {
      if (gameContract) {
        gameContract.off("CharacterNFTMinted", onCharacterMint);
      }
    };
  }, []);

  useEffect(() => {
    const onAttackComplete = (
      from: string,
      newBossHp: BigNumber,
      newPlayerHp: BigNumber
    ) => {
      const bossHp = newBossHp.toNumber();
      const playerHp = newPlayerHp.toNumber();
      const sender = from.toString();

      console.log(`AttackComplete: Boss Hp: ${bossHp} Player Hp: ${playerHp}`);

      if (currentAccount === sender.toLowerCase()) {
        setRex((prevState) => {
          if (prevState) {
            return { ...prevState, hp: bossHp };
          } else {
            return prevState;
          }
        });
        setCharacterNFT((prevState) => {
          if (prevState) {
            return { ...prevState, hp: playerHp };
          } else {
            return prevState;
          }
        });
      } else {
        setRex((prevState) => {
          if (prevState) {
            return { ...prevState, hp: bossHp };
          } else {
            return prevState;
          }
        });
      }
    };
    const gameContract = gameContractInstance();

    if (gameContract) {
      (async () => {
        const rexData = await fetchRex();
        console.log(rexData)
        setRex(rexData);
      })();
      gameContract.on("AttackComplete", onAttackComplete);
    }

    return () => {
      if (gameContract) {
        gameContract.off("AttackComplete", onAttackComplete);
      }
    };
  }, []);

  return (
    <ContractContext.Provider value={{ characters, rex, attack, attackState }}>
      {children}
    </ContractContext.Provider>
  );
};

export default ContractProvider;
