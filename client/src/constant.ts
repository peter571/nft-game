import { characterDataProp } from "./types";

export const CONTRACT_ADDRESS = "0xb646c5c6b6939620CA575ce945AbA00E45b21b47";

export const transformCharacterData = (characterData: characterDataProp) => {
  return {
    name: characterData.name,
    imageURI: characterData.imageURI,
    hp: Number(characterData.hp),
    maxHp: Number(characterData.maxHp),
    attackDamage: Number(characterData.attackDamage),
  };
};
