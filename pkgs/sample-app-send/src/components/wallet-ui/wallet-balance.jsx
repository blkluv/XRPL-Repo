import { useBalance } from "@nice-xrpl/react-xrpl";

/**
 * WalletBalance Component
 * @returns 
 */
export function WalletBalance() {
  const balance = useBalance();

  return (
    <div className="WalletRow">
      Balance: {balance}
    </div>
  );
}
