const xrpl = require('xrpl');
require('dotenv').config();

const {
  SECRET
} = process.env;


/**
 * main Script
 */
async function main() {

  try{

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


    // issue Config
    const cold_settings_tx = {
      "TransactionType": "AccountSet",
      "Account": cold_wallet.address,
      "TransferRate": 0,
      "TickSize": 5,
      "Domain": "6578616D706C656D617368686172756B692E636F6D", // "examplemashharuki.com"
      "SetFlag": xrpl.AccountSetAsfFlags.asfDefaultRipple,
      // Using tf flags, we can enable more flags in one transaction
      "Flags": (xrpl.AccountSetTfFlags.tfDisallowXRP | xrpl.AccountSetTfFlags.tfRequireDestTag)
    }

    const cst_prepared = await client.autofill(cold_settings_tx)
    // 署名
    const cst_signed = cold_wallet.sign(cst_prepared)
    console.log("Sending cold address AccountSet transaction...");

    const cst_result = await client.submitAndWait(cst_signed.tx_blob)

    if (cst_result.result.meta.TransactionResult == "tesSUCCESS") {
      console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${cst_signed.hash}`)
    } else {
      throw `Error sending transaction: ${cst_result}`
    };

    // Configure hot address settings
    const hot_settings_tx = {
      "TransactionType": "AccountSet",
      "Account": hot_wallet.address,
      "Domain": "6578616D706C656D617368686172756B692E636F6D", // "examplemashharuki.com"
      // enable Require Auth so we can't use trust lines that users
      // make to the hot address, even by accident:
      "SetFlag": xrpl.AccountSetAsfFlags.asfRequireAuth,
      "Flags": (xrpl.AccountSetTfFlags.tfDisallowXRP | xrpl.AccountSetTfFlags.tfRequireDestTag)
    }

    const hst_prepared = await client.autofill(hot_settings_tx)
    const hst_signed = hot_wallet.sign(hst_prepared);
    console.log("Sending hot address AccountSet transaction...")

    const hst_result = await client.submitAndWait(hst_signed.tx_blob);

    if (hst_result.result.meta.TransactionResult == "tesSUCCESS") {
      console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${hst_signed.hash}`)
    } else {
      throw `Error sending transaction: ${hst_result.result.meta.TransactionResult}`
    }

    // Create trust line from hot to cold address --------------------------------
    const currency_code = "MSH";
    // trustline Transactions Config
    const trust_set_tx = {
      "TransactionType": "TrustSet",
      "Account": hot_wallet.address,
      "LimitAmount": {
        "currency": currency_code,
        "issuer": cold_wallet.address,
        "value": "10000000000000" // Large limit, arbitrarily chosen
      }
    }

    const ts_prepared = await client.autofill(trust_set_tx);
    // 署名
    const ts_signed = hot_wallet.sign(ts_prepared)
    console.log("Creating trust line from hot address to issuer...")
    // 署名済みトランザクションをブロードキャストして待ち
    const ts_result = await client.submitAndWait(ts_signed.tx_blob);

    if (ts_result.result.meta.TransactionResult == "tesSUCCESS") {
      console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${ts_signed.hash}`)
    } else {
      throw `Error sending transaction: ${ts_result.result.meta.TransactionResult}`
    }

    // Send token ----------------------------------------------------------------
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
    process.exit[0];
  } catch(err) {
    console.log("err:", err);
    process.exit[0];
  }

  
}

main()