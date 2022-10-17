import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import WalletProvider from "./contexts/WalletProvider";
import ContractProvider from "./contexts/SmartContractProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <WalletProvider>
    <ContractProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ContractProvider>
  </WalletProvider>
);
