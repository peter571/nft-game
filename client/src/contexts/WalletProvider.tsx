import { createContext, useContext, useEffect, useState } from "react";
import { characterDataProp, ProviderProp } from "../types";
import { fetchUserNFT } from "./contractMethods";
declare var window: any;

interface GlobalState {
  currentAccount: string;
  characterNFT: characterDataProp | null;
  connectWallet: () => Promise<void>;
}

const WalletContext = createContext<GlobalState>({} as GlobalState);

export function useWallet() {
  return useContext(WalletContext);
}

const WalletProvider = ({ children }: ProviderProp) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [characterNFT, setCharacterNFT] = useState<characterDataProp | null>(
    null
  );

  const checkWalletIsConnected = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      return;
    } else {
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length !== 0) {
        const account = accounts[0];
        setCurrentAccount(account);
        const nftData = await fetchUserNFT();
        setCharacterNFT(nftData);
      } else {
        console.log("No authorized account found");
      }
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
      const nftData = await fetchUserNFT();
      setCharacterNFT(nftData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      await checkWalletIsConnected();
    })();
  }, []);

  return (
    <WalletContext.Provider
      value={{ currentAccount, connectWallet, characterNFT }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
