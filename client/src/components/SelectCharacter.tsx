import React from "react";
import { useContract } from "../contexts/SmartContractProvider";

export default function SelectCharacter() {
  const { characters } = useContract();

  console.log(characters);

  return <div>SelectCharacter</div>;
}
