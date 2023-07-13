const { 
  Client, 
  Wallet, 
  xrpToDrops 
} = require('xrpl');
require('dotenv').config();

const {
  SECRET
} = process.env;

/**
 * main function
 */
const main = async() => {
  // ウォレットを作成
  const wallet = Wallet.fromSeed(SECRET)
  const client = new Client('wss://testnet.xrpl-labs.com')

  await client.connect();

  await client.submitAndWait({
    TransactionType: 'OfferCreate',
    Account: wallet.address,
    TakerGets: xrpToDrops(100),
    TakerPays: {
      currency: "TST",
      issuer: "r3De1gWJjUQhU7jKpjFaTZFVTX8qWQUWnX",
      value: "100",
    },
    Flags: 0
  }, { 
    wallet 
  });
}

main();