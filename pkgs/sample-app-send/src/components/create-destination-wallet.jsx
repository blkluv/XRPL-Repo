import { 
  useCreateWallet, 
  Wallet, 
  WalletAddress 
} from "@nice-xrpl/react-xrpl";
import { useState } from "react";

/**
 * CreateDestinationWallet Component
 * @param {*} param0 
 * @returns 
 */
export function CreateDestinationWallet({ children }) {
  const [address, setAddress] = useState("");
  const [sending, setSending] = useState(false);

  // useCreateWallet functions
  const createWallet = useCreateWallet();

  /**
   * createNewWallet function
   */
  const createNewWallet = async() => {
    setSending(true);
    const initialState = await createWallet("1048");

    setSending(false);

    if (initialState.wallet.address) {
      console.log("created wallet: ", initialState);
      setAddress(initialState.wallet.address);
    }
  }

  return address ? (
    <WalletAddress address={address}>
      {children}
    </WalletAddress>
  ) : (
    <div>
      {!sending ? (
        <button
          onClick={createNewWallet}
        >
          Create destination wallet
        </button>
      ) : (
        "Creating destination wallet..."
      )}
    </div>
  );
}
