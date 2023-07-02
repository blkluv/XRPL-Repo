import { useState } from "react";
import { useMintToken } from "@nice-xrpl/react-xrpl";

/**
 * MintNFT Component
 * @returns 
 */
export function MintNFT() {
  // The useMintToken hook can be used to mint
  // an NFT with some data that will be encoded.
  // This is a transactional hook and requires a
  // wallet.
  const mintToken = useMintToken();
  const [url, setUrl] = useState("");
  const [sending, setSending] = useState(false);

  /**
   * mint method
   */
  const mint = async() => {
    setSending(true);
    // NFTをミントする。
    const result = await mintToken(url, 0);
    
    console.log("UI: ", result);
    console.log("explorer URL:", `https://testnet.xrpl.org/transactions/${result.result.hash}/simple`);

    setSending(false);
    setUrl("");
  };

  return (
    <div className="WalletRow">
      Mint an NFT with data:{" "}
      <input 
        value={url} 
        onChange={(e) => setUrl(e.currentTarget.value)} 
      /> -{" "}
      {sending ? (
        "Waiting for response..."
      ) : (
        <button
          onClick={mint}
          disabled={!url}
        >
          Send
        </button>
      )}
    </div>
  );
}
