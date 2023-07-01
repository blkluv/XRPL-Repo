import { Networks, useIsConnected, XRPLClient } from "@nice-xrpl/react-xrpl";
import { CreateSourceWallet } from "./components/create-source-wallet";
import { CreateDestinationWallet } from "./components/create-destination-wallet";
import { DestinationWallet } from "./components/destination-wallet";
import { SourceWallet } from "./components/source-wallet";
import "./css/styles.css";

/**
 * MainApp Component
 * @returns 
 */
function MainApp() {
  
  const isConnected = useIsConnected();

  return (
    <div className="MainApp">
      <div>
        Connected: {isConnected ? "Yes" : "No"}
      </div>
      
      <div className="WalletWrapper">
        <CreateSourceWallet>
          <SourceWallet />
        </CreateSourceWallet>
      </div>

      <div className="WalletWrapper">
        <CreateDestinationWallet>
          <DestinationWallet />
        </CreateDestinationWallet>
      </div>
    </div>
  );
}

/**
 * App Component
 */
export default function App() {
  return (
    <div className="App">
      <XRPLClient network={Networks.Testnet}>
        <MainApp />
      </XRPLClient>
    </div>
  );
}
