import { Networks, useIsConnected, XRPLClient } from "@nice-xrpl/react-xrpl";
import { LoadWallet } from "./components/load-wallet";
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
      <div>Connected: {isConnected ? "Yes" : "No"}</div>
      <div className="WalletWrapper">
        <LoadWallet>
          <SourceWallet />
        </LoadWallet>
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
