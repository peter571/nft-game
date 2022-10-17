import { Home, SelectCharacter } from "./components";
import { useWallet } from "./contexts/WalletProvider";

function App() {
  const { currentAccount, characterNFT } = useWallet()

  const renderContent = () => {
    if (!currentAccount) {
      return (
        <Home />
      )
    } else if(currentAccount && !characterNFT) {
      return (
        <SelectCharacter />
      )
    } 
  }

  return (
  <div>
    {renderContent()}
    </div>
  );
}

export default App;
