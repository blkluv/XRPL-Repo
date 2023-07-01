import { useWalletAddress } from "@nice-xrpl/react-xrpl";

/**
 * WalletInfo Component
 * @returns 
 */
export function WalletInfo() {
  const address = useWalletAddress();

  return (
    <div className="WalletRow">
      Address: {address}
    </div>
  );
}
