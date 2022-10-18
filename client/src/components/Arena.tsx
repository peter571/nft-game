import React from "react";
import { useContract } from "../contexts/SmartContractProvider";
import { useWallet } from "../contexts/WalletProvider";
import Player from "./Player";
import Rex from "./Rex";

export default function Arena() {
  const { rex } = useContract();
  const { characterNFT } = useWallet();

  return (
    <div className="flex flex-col justify-between items-center h-screen p-3">
      <div>{rex && <Rex {...rex} />}</div>
      <div>{characterNFT && <Player {...characterNFT} />}</div>
    </div>
  );
}
