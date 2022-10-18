import React, { useState } from "react";
import { mintCharacterNFT } from "../contexts/contractMethods";

interface CharacterProp {
  index: number;
  name: string;
  imageURI: string;
}

export default function Character(props: CharacterProp) {
  const { name, imageURI, index } = props;
  const [isMinting, setIsMinting] = useState(false);

  const mint = async (character: number) => {
    try {
      setIsMinting(true);
      await mintCharacterNFT(character);
      setIsMinting(false);
    } catch (error) {
      setIsMinting(false);
    }
  };

  return (
    <div className="">
      <div className="">
        <p>{name}</p>
      </div>
      <img
        className="object-cover w-[300px] h-[350px]"
        src={imageURI}
        alt={name}
      />
      <button className="btn" onClick={() => mint(index)} disabled={isMinting}>
        {isMinting ? `Minting ${name}...` : `Mint ${name}`}
      </button>
    </div>
  );
}
