import { useState } from "react";
import { useCreateTrustline } from "@nice-xrpl/react-xrpl";

/**
 * CreateTrustline Component
 * @returns 
 */
export function CreateTrustline() {
  // The useCreateTrustline hook creates a trustline
  // with another wallet address and will allow you to
  // receive currency from them.  The other account
  // will also need to create a trustline with your
  // address in order to send them currency.
  // This is a transactional hook and requires a wallet.
  const createTrustline = useCreateTrustline();

  const [destinationAddress, setDestinationAddress] = useState("");
  const [amount, setAmount] = useState(48);
  const [sending, setSending] = useState(false);
  const [currency] = useState("USD");
  const [trustlines, setTrustlines] = useState([]);

  /**
   * addTrustline function
   * @param {*} existingTrustlines 
   * @param {*} newTrustline 
   * @returns 
   */
  function addTrustline(existingTrustlines, newTrustline) {
    // すでにトラストラインに含まれているアドレスかどうかチェック
    for (const trustline of existingTrustlines) {
      if (trustline.address === newTrustline.address) {
        return existingTrustlines;
      }
    }
  
    return [...existingTrustlines, newTrustline];
  }

  /**
   * send function
   */
  const send = async() => {
    setSending(true);

    try {
      // createTrustline メソッドを呼ぶ
      const result = await createTrustline(
        destinationAddress,
        currency,
        `${amount}`
      );
      
      console.log("result:", result);
      console.log("explorer URL:", `https://testnet.xrpl.org/transactions/${result.result.hash}/simple`)

      setTrustlines((trustlines) => {
        return addTrustline(trustlines, {
          address: destinationAddress,
          currency,
          amount
        });
      });
    } catch (e) {
      alert(e);
    }

    setSending(false);
  };

  return (
    <>
      <div className="WalletRow">
        Create trustline to{" "}
        <input
          value={destinationAddress}
          onChange={(e) => setDestinationAddress(e.currentTarget.value)}
          type="text"
        />{" "}
        with a limit of{" "}
        <input
          value={amount}
          onChange={(e) => setAmount(parseInt(e.currentTarget.value, 10))}
          type="number"
        />{" "}
        {currency} -{" "}
        {sending ? (
          "Waiting for response..."
        ) : (
          <button
            onClick={send}
            disabled={!amount || !destinationAddress}
          >
            Send
          </button>
        )}
      </div>
      <div className="WalletRow">
        {trustlines.map((trustline, idx) => {
          return (
            <div key={idx}>
              Wallet can now recieve up to {trustline.amount}{" "}
              {trustline.currency} from address {trustline.address}
            </div>
          );
        })}
      </div>
    </>
  );
}
