import React from "react";
import { useWallet } from "../contexts/WalletProvider";

export default function Home() {
  const { connectWallet, currentAccount } = useWallet();

  return (
    <section className="flex_container">
      <button className="bg-pink-500 text-white" onClick={connectWallet}>
        {currentAccount ? `${currentAccount}` : 'Connect Wallet'}
      </button>
    </section>
  );
}
