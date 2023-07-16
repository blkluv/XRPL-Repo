const xrpl = require('xrpl');
require('dotenv').config();

const {
  SECRET
} = process.env;

/**
 * main Script
 */
async function main() {

  // Define the network client
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233")
  await client.connect();

  // ウォレットを作成
  const wallet = xrpl.Wallet.fromSeed(SECRET)

  // get Credentials
  console.log("Requesting addresses from the Testnet faucet...")
  const hot_wallet = (await client.fundWallet({ wallet: wallet })).wallet
  const cold_wallet = (await client.fundWallet({ wallet: wallet })).wallet
  console.log(`Got hot address ${hot_wallet.address} and cold address ${cold_wallet.address}.`)


  // Send token ----------------------------------------------------------------
  const currency_code = "MSH"
  const issue_quantity = "384000"
  const send_token_tx = {
    "TransactionType": "Payment",
    "Account": cold_wallet.address,
    "Amount": {
      "currency": currency_code, // ここで送金したいトークンの種類を指定する。
      "value": issue_quantity,   // ここで送金したいトークンの金額を指定する。
      "issuer": cold_wallet.address
    },
    "Destination": hot_wallet.address,
    "DestinationTag": 1 // Needed since we enabled Require Destination Tags
                        // on the hot account earlier.
  }

  const pay_prepared = await client.autofill(send_token_tx);
  // トランザクションに署名
  const pay_signed = cold_wallet.sign(pay_prepared);
  console.log(`Sending ${issue_quantity} ${currency_code} to ${hot_wallet.address}...`)
  // 署名済みトランザクションをブロードキャスト
  const pay_result = await client.submitAndWait(pay_signed.tx_blob);

  if (pay_result.result.meta.TransactionResult == "tesSUCCESS") {
    console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${pay_signed.hash}`)
  } else {
    throw `Error sending transaction: ${pay_result.result.meta.TransactionResult}`
  };

  // Check balances ------------------------------------------------------------
  console.log("Getting hot address balances...");
  // get hot address data
  const hot_balances = await client.request({
    command: "account_lines",
    account: hot_wallet.address,
    ledger_index: "validated"
  })
  console.log(hot_balances.result);

  console.log("Getting cold address balances...")
  // get cold address data
  const cold_balances = await client.request({
    command: "gateway_balances",
    account: cold_wallet.address,
    ledger_index: "validated",
    hotwallet: [hot_wallet.address]
  })
  console.log(JSON.stringify(cold_balances.result, null, 2))

  // Disconnect when done (If you omit this, Node.js won't end the process)
  client.disconnect()
}

main()