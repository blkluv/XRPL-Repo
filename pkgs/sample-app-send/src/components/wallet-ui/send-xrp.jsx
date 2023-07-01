import { useState } from "react";
import {
  useBalance,
  useSendXRP,
  ReserveRequirement
} from "@nice-xrpl/react-xrpl";

/**
 * SendXRP Component
 * @returns 
 */
export function SendXRP() {
  // The useSendXRP hook can be used to send XRP to
  // another account.  This is a transactional hook and
  // requires a wallet.
  const sendXRP = useSendXRP();
  const balance = useBalance();

  const [destinationAddress, setDestinationAddress] = useState("");
  const [amount, setAmount] = useState(48);
  const [sending, setSending] = useState(false);

  /**
   * send XRP function
   */
  const sendXrp = async() => {
    setSending(true);

    try {
      // send xrpl
      const result = await sendXRP(destinationAddress, amount);
      console.log("UI: ", result);
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
      XRP to{" "}
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
          onClick={sendXrp}
          disabled={
            !amount ||
            amount >= balance - ReserveRequirement ||
            !destinationAddress
          }
        >
          Send
        </button>
      )}
    </div>
  );
}
