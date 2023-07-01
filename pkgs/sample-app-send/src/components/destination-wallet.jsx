import { WalletBalance } from "./wallet-ui/wallet-balance";
import { WalletInfo } from "./wallet-ui/wallet-info";

/**
 * DestinationWallet Component
 * @returns 
 */
export function DestinationWallet() {
  return (
    <div className="Wallet">
      <div className="WalletRow header">Destination Wallet</div>
      <WalletInfo />
      <WalletBalance />
    </div>
  );
}
