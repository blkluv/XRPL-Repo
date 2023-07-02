import { BurnNFT } from "./wallet-ui/burn-nft";
import { MintNFT } from "./wallet-ui/mint-nft";
import { ShowNFTs } from "./wallet-ui/show-nfts";
import { WalletBalance } from "./wallet-ui/wallet-balance";
import { WalletInfo } from "./wallet-ui/wallet-info";

/**
 * SourceWallet Component
 * @returns 
 */
export function SourceWallet() {
  return (
    <div className="Wallet">
      <div className="WalletRow header">Source Wallet</div>
      <WalletInfo />
      <WalletBalance />
      <MintNFT />
      <BurnNFT />
      <ShowNFTs />
    </div>
  );
}
