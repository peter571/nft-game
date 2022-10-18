import { BigNumber } from "ethers";

export interface CharacterDataProp {
  name: string;
  imageURI: string;
  hp: BigNumber;
  maxHp: BigNumber;
  attackDamage: BigNumber;
}

export interface CharacterData {
  name: string;
  imageURI: string;
  hp: number;
  maxHp: number;
  attackDamage: number;
}

export interface ProviderProp {
    children: React.ReactNode;
  }
  