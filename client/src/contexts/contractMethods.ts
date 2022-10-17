import { ethers } from "ethers";
import { CONTRACT_ADDRESS, transformCharacterData } from "../constant";
import Game from "../utils/MyEpicGame.json";
declare var window: any;

//Get Signer Account
const getSigner = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return signer;
};

//Contract instance
const gameContractInstance = () => {
  const signer = getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, Game.abi, signer);
  return contract;
};

//Fetch user Nft metadata
export const fetchUserNFT = async () => {
  const gameContract = gameContractInstance();
  const txn = await gameContract.checkIfUserHasNFT();
  if (txn.name) {
    return transformCharacterData(txn);
  } else {
    console.log("No character found!");
    return null;
  }
};

//Get All default characters
export const getAllCharacters = async () => {
    const gameContract = gameContractInstance();
    const characters = await gameContract.getAllDefaultCharacters();
    return characters.map((character: any) => (
        transformCharacterData(character)
    ))
}

//Mint Character
const mintCharacterNFT = async (characterId: number) => {
    const gameContract = gameContractInstance();
    try {
      if (gameContract) {
        const mintTxn = await gameContract.mintCharacterNFT(characterId);
        await mintTxn.wait();
      }
    } catch (error) {
      console.warn('MintCharacterAction Error:', error);
    }
  };