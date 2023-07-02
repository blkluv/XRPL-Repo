import { useState } from "react";
import { useSendCurrency } from "@nice-xrpl/react-xrpl";

/**
 * SendCurrency Component
 * @returns 
 */
export function SendCurrency() {
  // The useSendCurrency hook can be used to send
  // currency to another account. The other account
  // will need to create a trustline with your
  // address in order to send them currency.
  // This is a transactional hook and requires a wallet.
  const sendCurrency = useSendCurrency();

  const [destinationAddress, setDestinationAddress] = useState("");
  const [amount, setAmount] = useState(10);
  const [sending, setSending] = useState(false);
  const [currency] = useState("USD");

  /**
   * send method
   */
  const send = async() => {
    setSending(true);

    try {
      // send Currency method
      const result = await sendCurrency(
        destinationAddress,
        currency,
        `${amount}`
      );
      console.log("result", result);
      console.log("explorer URL:", `https://testnet.xrpl.org/transactions/${result.result.hash}/simple`)
    } catch (e) {
      alert(e);
    }

    setSending(false);
  };

  return (
    <div className="WalletRow">
      Send{" "}
      <input
        value={amount}
        onChange={(e) => setAmount(parseInt(e.currentTarget.value, 10))}
        type="number"
      />{" "}
      {currency} to{" "}
      <input
        value={destinationAddress}
        onChange={(e) => setDestinationAddress(e.currentTarget.value)}
        type="text"
      />{" "}
      -{" "}
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
  );
}
