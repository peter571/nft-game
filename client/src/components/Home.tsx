import React from "react";
import { useWallet } from "../contexts/WalletProvider";

export default function Home() {
  const { connectWallet, currentAccount } = useWallet();

  return (
    <section className="flex justify-center items-center h-screen">
      <button className="bg-pink-500 text-white" onClick={connectWallet} disabled={currentAccount !== undefined}>
        {currentAccount ? `${currentAccount}` : 'Connect Wallet'}
      </button>
    </section>
  );
}
