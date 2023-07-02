import { useState } from "react";
import { useBurnToken, useGetTokens } from "@nice-xrpl/react-xrpl";

/**
 * BurnNFT Component
 * @returns 
 */
export function BurnNFT() {
  // The useBurnToken hook can be used to burn
  // an NFT.
  // This is a transactional hook and requires a
  // wallet.
  const burnToken = useBurnToken();

  const [id, setId] = useState("");
  const [sending, setSending] = useState(false);

  /**
   * burn method
   */
  const burn = async() => {
    setSending(true);
    // nftをburnする。
    const result = await burnToken(id);

    console.log("UI: ", result);
    console.log("explorer URL:", `https://testnet.xrpl.org/transactions/${result.result.hash}/simple`);
    
    setSending(false);
    setId("");
  };

  return (
    <div className="WalletRow">
      Burn an NFT by ID:{" "}
      <input 
        value={id} 
        onChange={(e) => setId(e.currentTarget.value)} 
      /> -{" "}
      {sending ? (
        "Waiting for response..."
      ) : (
        <button
          onClick={burn}
          disabled={!id}
        >
          Send
        </button>
      )}
    </div>
  );
}
