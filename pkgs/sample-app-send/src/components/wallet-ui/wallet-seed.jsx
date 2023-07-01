import { useWallet } from "@nice-xrpl/react-xrpl";

/**
 * WalletSeed Component
 * @returns 
 */
export function WalletSeed() {
  const wallet = useWallet();

  return (
    <div className="WalletRow">
      Seed: {wallet.seed}
    </div>
  );
}
