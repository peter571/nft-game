import { CharacterDataProp } from "./types";

export const CONTRACT_ADDRESS = "0xb646c5c6b6939620CA575ce945AbA00E45b21b47";

export const transformCharacterData = (characterData: CharacterDataProp) => {
  return {
    name: characterData.name,
    imageURI: characterData.imageURI,
    hp: characterData.hp.toNumber(),
    maxHp: characterData.maxHp.toNumber(),
    attackDamage: characterData.attackDamage.toNumber(),
  };
};
