'use strict'

require('dotenv').config();
var xrpl = require('xrpl')
// Configure console.log to print deeper into nested objects so you can
// better see properties of the AMM:
require('util').inspect.defaultOptions.depth = 5
import {
  AmmInfo,
  acquireTokens,
  checkExistsAmm,
  confirmAmm,
  createAmm,
  getAmmcost,
  get_new_token,
  swap
} from './lib/amm';
import {
  WS_URL
} from './util/consts';

/**
 * AMM機能を試すためのスクリプト
 */
async function main() {
  const client = new xrpl.Client(WS_URL);
  await client.connect()

  // Get credentials from the Faucet -------------------------------------------
  console.log("Requesting address from the faucet...")
  // const wallet = (await client.fundWallet()).wallet

  // To use an existing account, use code such as the following:
  const wallet = xrpl.Wallet.fromSeed(process.env.SECRET_FEED!)

  // Create New Token
  const msh_amount = await get_new_token(client, wallet, "MSH", "10000")
  // call get new token method (FOO トークンを発行)
  const foo_amount = await get_new_token(client, wallet, "FOO", "1000")

  // Acquire tokens ------------------------------------------------------------
  await acquireTokens(client, wallet, msh_amount);
  await acquireTokens(client, wallet, foo_amount);

  // create AMM Info
  const amm_info_request: AmmInfo = {
    "command": "amm_info",
    "asset": {
      "currency": msh_amount.currency,
      "issuer": msh_amount.issuer,
    },
    "asset2": {
      "currency": foo_amount.currency,
      "issuer": foo_amount.issuer
    },
    "ledger_index": "validated"
  }

  // Check if AMM already exists ----------------------------------------------
  await checkExistsAmm(client, amm_info_request, msh_amount, foo_amount);

  // Look up AMM transaction cost ---------------------------------------------
  const amm_fee_drops = await getAmmcost(client);

  // Create AMM ---------------------------------------------------------------
  // This example assumes that 15 TST ≈ 100 FOO in value.
  await createAmm(client, wallet, msh_amount, foo_amount, amm_fee_drops)
  
  // Confirm that AMM exists --------------------------------------------------
  const {
    account_lines_result,
    ammAddress
  } = await confirmAmm(client, wallet, amm_info_request);
  
  console.log("account_lines_result:", account_lines_result)
  console.log("ammAddress:", ammAddress)

  // Swap (payment Transaction)
  await swap(client, wallet, ammAddress, msh_amount, "1")

  // confirm AMM again
  const {
    account_lines_result: account_lines_result2,
  } = await confirmAmm(client, wallet, amm_info_request);
  
  console.log("account_lines_result2:", account_lines_result2)

  // Disconnect when done -----------------------------------------------------
  await client.disconnect()
}

main()
