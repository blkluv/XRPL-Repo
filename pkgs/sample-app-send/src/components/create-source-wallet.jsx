import { useCreateWallet, Wallet } from "@nice-xrpl/react-xrpl";
import { useState } from "react";

/**
 * CreateSourceWallet Component 
 * @param {*} param0 
 * @returns 
 */
export function CreateSourceWallet({ children }) {
  const [seed, setSeed] = useState("");
  const [sending, setSending] = useState(false);

  // When connected to the testnet/dev net, you can
  // use the useCreateWallet series of hooks to create
  // a wallet and fund it from the faucet.
  const createWallet = useCreateWallet();

  /**
   * createNewSeed function
   */
  const createNewSeed = async() => {
    setSending(true);
    const initialState = await createWallet("1048");

    setSending(false);

    if (initialState.wallet.seed) {
      console.log("created wallet: ", initialState);
      setSeed(initialState.wallet.seed);
    }
  };

  return seed ? (
    <Wallet seed={seed}>{children}</Wallet>
  ) : (
    <div>
      {!sending ? (
        <button
          onClick={createNewSeed}
        >
          Create source wallet
        </button>
      ) : (
        "Creating source wallet..."
      )}
    </div>
  );
}
