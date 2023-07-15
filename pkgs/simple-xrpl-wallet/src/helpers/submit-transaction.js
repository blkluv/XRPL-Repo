import { Wallet } from 'xrpl';

const {
  SEED
} = process.env;

/**
 * submitTransaction method
 * @param {*} param0 
 * @returns 
 */
export default async function submitTransaction({ client, tx }) {
  try {
    // Create a wallet using the seed
    const wallet = await Wallet.fromSeed(SEED);
    tx.Account = wallet.address;

    // Sign and submit the transaction : https://xrpl.org/send-xrp.html#send-xrp
    const response = await client.submit(tx, { wallet });
    console.log("res:", response);

    return response;
    
  } catch (error) {
    console.log("error:", error);
    return null;
  }
}