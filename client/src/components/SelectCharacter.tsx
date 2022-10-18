import React from "react";
import { useContract } from "../contexts/SmartContractProvider";
import { CharacterData } from "../types";
import Character from "./Character";

export default function SelectCharacter() {
  const { characters } = useContract();

  if (characters.length === 0) {
    return (
      <div className="flex_container justify-center">
        <h1>No Characters found!</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center">
        <p>The Crushers</p>
        <p>Mint your favorite Character</p>
      </div>
    <div className="w-full flex_container justify-around gap-2">
      {characters.map((character: CharacterData, index) => (
        <Character
          key={index}
          index={index}
          name={character.name}
          imageURI={character.imageURI}
        />
      ))}
    </div>
    </div>
  );
}
