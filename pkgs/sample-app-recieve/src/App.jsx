import { Networks, useIsConnected, XRPLClient } from "@nice-xrpl/react-xrpl";
import { LoadWallet } from "./components/load-wallet";
import { DestinationWallet } from "./components/destination-wallet";
import { SourceWallet } from "./components/source-wallet";
import "./css/styles.css";

/**
 * MainApp Component
 * @returns 
 */
function MainApp() {
  // The useIsConnected hook will let you know
  // when the client has connected to the xrpl network
  const isConnected = useIsConnected();

  return (
    <div className="MainApp">
      <div>Connected: {isConnected ? "Yes" : "No"}</div>
      <div className="WalletWrapper">
        <LoadWallet>
          <SourceWallet />
        </LoadWallet>
      </div>

      <div className="WalletWrapper">
        <LoadWallet>
          <DestinationWallet />
        </LoadWallet>
      </div>
    </div>
  );
}

/**
 * App Component
 * @returns 
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
