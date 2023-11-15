import { GlobalContext } from '@/context/GlobalProvider';
import { EXPLORER, WS_URL } from "@/utils/consts";
import { getEnv } from "@/utils/getEnv";
import React, { createContext, useContext, useState } from 'react';
import {
  AccountSetAsfFlags,
  Client,
  Wallet,
  dropsToXrp,
  getBalanceChanges,
  xrpToDrops
} from 'xrpl';
import { Xumm } from "xumm";

export type TokenInfo = {
  "currency": string | null;
  "value": string;
  "issuer": string | null;
}

export type AmmInfo = {
  "command": string;
  "asset": {
    "currency": string;
    "issuer": string;
  },
  "asset2": {
    "currency": string;
    "issuer": string | null;
  } | null,
  "ledger_index": "validated"
}

// XRPLインスタンスを作成
const client = new Client(WS_URL);
export const XummContext = createContext<any>({});

/**
 * XummProvider
 * @param param0 
 * @returns 
 */
export const XummProvider = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => {
  const [address, setAddress] = useState<string | null>();
  const [balance, setBalance] = useState<string | null>();
  const [xumm, setXumm] = useState<Xumm | null>();

  const globalContext = useContext(GlobalContext);

  /**
   * 初期化＆認証メソッド
   */
  const login = async():Promise<any> => {
    // get env
    const { XRP_API_KEY } = await getEnv();
    // XUMM用のインスタンスを作成する。
    const newXumm = new Xumm(XRP_API_KEY);

    try {
      globalContext.setLoading(true)

      // authorize
      await newXumm.authorize();
      const account = await newXumm.user.account;
      const userInfo = await newXumm.user;
      console.log("user info:", userInfo);
      console.log("account address:", account);
  
      setAddress(account);
      setXumm(newXumm);
      await getAccountInfo(account!);
    } catch(err) {
      console.error("eer:", err)
    } finally {
      globalContext.setLoading(false)
    }
  }

  /**
   * アカウント情報を取得するメソッド
   */
  const getAccountInfo = async(
    address: string
  ) => {
    try {
      // Connect to the client   
      await client.connect();
      
      const {
        result: { account_data },
      }: any = await client.request({
        command: 'account_info',
        account: address,
        ledger_index: 'validated',
      });

      const newBalance = dropsToXrp(account_data.Balance);
      console.log("account's balance: ", newBalance)

      setBalance(newBalance);
    } catch (error) {
      console.error("err", error);
    } finally {
      await client.disconnect();
    }
  };

  /**
   * faucet用のXRP 送信トランザクション
   */
  const sendFaucet = async(destination: string) => {
    try {
      globalContext.setLoading(true)
      // Connect to the client   
      await client.connect();
      // get env
      const { FAUCET_SEED } = await getEnv();
      // Create a wallet using the seed
      const wallet = await Wallet.fromSeed(FAUCET_SEED);

      // tx data
      const tx: any = {
        TransactionType: 'Payment',
        Amount: xrpToDrops(5), 
        Destination: destination,
      }

      tx.Account = wallet.address;
      // send faucet XRP
      const response = await client.submit(tx, { wallet });
      console.log("send FAUCET XRP res:", response);
      // 5秒後に新しい残高を取得
      setTimeout(async function() {
        await getAccountInfo(address!);
      }, 5000);
    } catch (error) { 
      console.error("send FAUCET XRP err", error);
      globalContext.setLoading(false);
    } finally {
      await client.disconnect();
      globalContext.setLoading(false);
    }
  }

  /**
   * トークンを新しく作るメソッド
   */
  const issueNewToken = async (
    currency_code: string, 
    issue_quantity: string
  ) => {
    try {
      globalContext.setLoading(true)
      // Get credentials from the Testnet Faucet -----------------------------------
      console.log("Funding an issuer address with the faucet...")
      console.log(`Got issuer address ${address}.`)
    
      // Enable issuer DefaultRipple ----------------------------------------------
      const { 
        created, 
        resolve,
        resolved, 
        websocket 
      } = await xumm!.payload!.createAndSubscribe({
        "TransactionType": "AccountSet",
        "Account": address!,
        "SetFlag": AccountSetAsfFlags.asfDefaultRipple
      }, eventMessage => {
        if (Object.keys(eventMessage.data).indexOf('opened') > -1) {
          console.log("eventMessage:", eventMessage)
        }
        if (Object.keys(eventMessage.data).indexOf('signed') > -1) {
          console.log("eventMessage:", eventMessage)
          return eventMessage
        }
      })
      
      console.log('Payload URL:', created.next.always)
      console.log('Payload QR:', created.refs.qr_png)
      
      websocket.onmessage = (msg) => {
        const data = JSON.parse(msg.data.toString());
        // トランザクションへの署名が完了/拒否されたらresolve
        if (typeof data.signed === "boolean") {
          resolve({ 
            signed: data.signed, 
            txid: data.txid 
          });
        }
      };

      const payload: any = await resolved
      console.log('Resolved', payload)
      console.log(`URL: ${EXPLORER}/transactions/${payload!.txid}`)

      // Create trust line to issuer ----------------------------------------------
      const { 
        created: created2, 
        resolved: resolved2 
      } = await xumm!.payload!.createAndSubscribe({
        "TransactionType": "TrustSet",
        "Account": address!,
        "LimitAmount": {
          "currency": currency_code,
          "issuer": address!,
          "value": "10000000000" // Large limit, arbitrarily chosen
        }
      }, eventMessage => {
        if (Object.keys(eventMessage.data).indexOf('opened') > -1) {
          console.log("eventMessage:", eventMessage)
        }
        if (Object.keys(eventMessage.data).indexOf('signed') > -1) {
          console.log("eventMessage:", eventMessage)
          return eventMessage
        }
      })
      
      console.log('Payload URL:', created2.next.always)
      console.log('Payload QR:', created2.refs.qr_png)
      
      const payload2 = await resolved2
      console.log('Resolved', payload2)
        
      // Issue tokens -------------------------------------------------------------
      const { 
        created: created3, 
        resolved: resolved3 
      } = await xumm!.payload!.createAndSubscribe({
        "TransactionType": "Payment",
        "Account": address!,
        "Amount": {
          "currency": currency_code,
          "value": issue_quantity,
          "issuer": address!
        },
        "Destination": address!
      }, eventMessage => {
        if (Object.keys(eventMessage.data).indexOf('opened') > -1) {
          console.log("eventMessage:", eventMessage)
        }
        if (Object.keys(eventMessage.data).indexOf('signed') > -1) {
          console.log("eventMessage:", eventMessage)
          return eventMessage
        }
      })
      
      console.log('Payload URL:', created3.next.always)
      console.log('Payload QR:', created3.refs.qr_png)
      
      const payload3 = await resolved3
      console.log('Resolved', payload3)
    
      const tokenInfo: TokenInfo = {
        "currency": currency_code,
        "value": issue_quantity,
        "issuer": address!
      }

      globalContext.setLoading(false);
      return tokenInfo;
    } catch(err) {
      console.error("err:", err)
      globalContext.setLoading(false);
      return null;
    }
  }

  /**
   * トークンを取得するメソッド
   * @param wallet 
   * @param token 
   */
  const acquireTokens = async(
    wallet: any,
    token: TokenInfo,
  ) => {
    try {
      globalContext.setLoading(true);
      const offer_result = await client.submitAndWait({
        "TransactionType": "OfferCreate",
        "Account": wallet.address,
        "TakerPays": {
          currency: token.currency!,
          issuer: token.issuer!,
          value: "1000"
        },
        "TakerGets": xrpToDrops(25*10*1.16)
      }, {
        autofill: true, 
        wallet: wallet
      })
  
      // get metaData & TransactionResult
      const metaData: any = offer_result.result.meta!;
      const transactionResult = metaData.TransactionResult;
    
      if (transactionResult == "tesSUCCESS") {
        console.log(`MSH offer placed: ${EXPLORER}/transactions/${offer_result.result.hash}`)
        const balance_changes = getBalanceChanges(metaData)
    
        for (const bc of balance_changes) {
          if (bc.account != wallet.address) {continue}
          for (const bal of bc.balances) {
            if (bal.currency == "MSH") {
              console.log(`Got ${bal.value} ${bal.currency}.${bal.issuer}.`)
              break
            }
          }
          break
        }
    
      } else {
        throw `Error sending transaction: ${offer_result}`
      }
    } catch(err) {
      console.error("Acquire tokens err: ", err)
    } finally {
      globalContext.setLoading(false);
    }
  };

  /**
   * AMMのペアを新しく生成するメソッド
   */
  const createAmm = async(
    wallet: any,
    token1Info: TokenInfo,
    token2Info: TokenInfo,
    amm_fee_drops: string,
  ) => {
    try {
      globalContext.setLoading(true);
      var ammcreate_result;
      if(token2Info.currency != null) {
        ammcreate_result = await client.submitAndWait({
          "TransactionType": "AMMCreate",
          "Account": wallet.address,
          "Amount": {
            currency: token1Info.currency!,
            issuer: token1Info.issuer!,
            value: "15"
          },
          "Amount2": {
            "currency": token2Info.currency,
            "issuer": token2Info.issuer!,
            "value": "100"
          },
          "TradingFee": 500, // 0.5%
          "Fee": amm_fee_drops
        }, {
          autofill: true, 
          wallet: wallet, 
          failHard: true
        })
      } else {
        ammcreate_result = await client.submitAndWait({
          "TransactionType": "AMMCreate",
          "Account": wallet.address,
          "Amount": {
            currency: token1Info.currency!,
            issuer: token1Info.issuer!,
            value: "15"
          },
          "Amount2": token2Info.value,
          "TradingFee": 500, // 0.5%
          "Fee": amm_fee_drops
        }, {
          autofill: true, 
          wallet: wallet, 
          failHard: true
        })
      }
  
      // get metaData & TransactionResult
      const metaData: any = ammcreate_result.result.meta!;
      const transactionResult = metaData.TransactionResult;
    
      // Use fail_hard so you don't waste the tx cost if you mess up
      if (transactionResult == "tesSUCCESS") {
        console.log(`AMM created: ${EXPLORER}/transactions/${ammcreate_result.result.hash}`)
      } else {
        throw `Error sending transaction: ${JSON.stringify(ammcreate_result)}`
      }
    } catch(err) {
      console.error("create amm err:", err)
    } finally {
      globalContext.setLoading(false);
    }
  }
  
  /**
   * AMMのコストを取得するメソッド
   */
  const getAmmcost = async(): Promise<string> => {
    const ss = await client.request({
      "command": "server_state"
    })
    const amm_fee_drops = ss.result.state.validated_ledger!.reserve_inc.toString()
    console.log(`Current AMMCreate transaction cost: ${dropsToXrp(amm_fee_drops)} XRP`)

    return amm_fee_drops;
  }

  /**
   * すでにトークンペアのAMMが作成されているか確認する関数
   */
  const checkExistsAmm = async (
    amm_info_request: AmmInfo, 
    token1Info: TokenInfo,
    token2Info: TokenInfo,
  ) => {
    try {
      const amm_info_result = await client.request(amm_info_request)
      console.log(amm_info_result)
    } catch(err: any) {
      if (err.data.error === 'actNotFound') {
        if(token2Info.issuer != null) {
          console.log(`No AMM exists yet for the pair
            ${token2Info.currency}.${token2Info.issuer} /
            ${token1Info.currency}.${token1Info.issuer}
            (This is probably as expected.)`)
        } else {
          console.log(`No AMM exists yet for the pair
            XRP /
            ${token1Info.currency}.${token1Info.issuer}
            (This is probably as expected.)`)
        }
      } else {
        throw(err)
      }
    }
  };

  /**
   * AMMの情報を取得するメソッド
   */
  const confirmAmm = async(
    wallet: any,
    amm_info_request: AmmInfo
  ): Promise<any> => {
    try {
      globalContext.setLoading(true);
      // get AMM info
      const amm_info_result2 = await client.request(amm_info_request)
      console.log("amm_info_result2:", amm_info_result2)
  
      const results = amm_info_result2.result as any;
  
      const lp_token = results.amm.lp_token
      const amount = results.amm.amount
      const amount2 = results.amm.amount2
  
      const ammInfo: TokenInfo = {
        "currency": lp_token.currency,
        "issuer": lp_token.issuer,
        "value": "0"
      }
  
      console.log(`The AMM account ${lp_token.issuer} has ${lp_token.value} total
                  LP tokens outstanding, and uses the currency code ${lp_token.currency}.`)
      if(amount2.currency != undefined) {
        console.log(`In its pool, the AMM holds ${amount.value} ${amount.currency}.${amount.issuer}
                     and ${amount2.value} ${amount2.currency}.${amount2.issuer}`)
      } else {
        console.log(`In its pool, the AMM holds ${amount.value} ${amount.currency}.${amount.issuer}
                     and ${amount2} XRP`)
      }
  
      // check balanse
      const account_lines_result = await client.request({
        "command": "account_lines",
        "account": wallet.address,
        // Tip: To look up only the new AMM's LP Tokens, uncomment:
        // "peer": lp_token.issuer,
        "ledger_index": "validated"
      })

      globalContext.setLoading(false);
      return {
        account_lines_result,
        ammInfo
      };
    } catch(err) {
      console.error("Check token balances err:", err)
      globalContext.setLoading(false);
      return null;
    }
  }

  /**
   * AMM Deposit メソッド
   */
  const depositAmm = async(
    wallet: any,
    token1Info: TokenInfo,
    token1Amount: string,
    token2Info: TokenInfo,
    token2Amount: string,
  ) => {
    try {
      globalContext.setLoading(true);
      var result;
      if(token1Info.currency != null && token2Info.currency != null) {
        result = await client.submitAndWait({
          "TransactionType": "AMMDeposit",
          "Account": wallet.address,
          "Amount": {
            "currency": token1Info.currency,
            "issuer": token1Info.issuer!,
            "value": token1Amount
          },
          "Amount2": {
            "currency": token2Info.currency,
            "issuer": token2Info.issuer!,
            "value": token2Amount
          },
          "Asset": {
            "currency": token1Info.currency,
            "issuer": token1Info.issuer!,
          },
          "Asset2": {
            "currency": token2Info.currency,
            "issuer": token2Info.issuer!,
          },
          "Flags" : 1048576,
        }, {
          autofill: true, 
          wallet: wallet, 
          failHard: true
        })
      } else if(token2Info.currency == null) {
        result = await client.submitAndWait({
          "TransactionType": "AMMDeposit",
          "Account": wallet.address,
          "Amount": {
            "currency": token1Info.currency!,
            "issuer": token1Info.issuer!,
            "value": token1Amount
          },
          "Amount2": token2Amount,
          "Asset": {
            "currency": token1Info.currency!,
            "issuer": token1Info.issuer!,
          },
          "Asset2": { 
            "currency": "XRP"
          },
          "Flags" : 1048576,
        }, {
          autofill: true, 
          wallet: wallet, 
          failHard: true
        })
      } else if(token1Info.currency == null) {
        result = await client.submitAndWait({
          "TransactionType": "AMMDeposit",
          "Account": wallet.address,
          "Amount": token1Amount,
          "Amount2": {
            "currency": token2Info.currency,
            "issuer": token2Info.issuer!,
            "value": token2Amount
          },
          "Asset": {
            "currency": "XRP"
          },
          "Asset2": { 
            "currency": token1Info.currency!,
            "issuer": token1Info.issuer!,
          },
          "Flags" : 1048576,
        }, {
          autofill: true, 
          wallet: wallet, 
          failHard: true
        })
      }
  
      // get metaData & TransactionResult
      const metaData: any = result!.result.meta!;
      const transactionResult = metaData.TransactionResult;
    
      // Use fail_hard so you don't waste the tx cost if you mess up
      if (transactionResult == "tesSUCCESS") {
        console.log(`AMM deposit: ${EXPLORER}/transactions/${result!.result.hash}`)
      } else {
        throw `Error sending transaction: ${JSON.stringify(result)}`
      }
    } catch(err) {
      console.error("error occuered while depositAmm:", err)
    } finally {
      globalContext.setLoading(false);
    }
  }

  /**
   * AMM Withdraw メソッド
   */
  const withdrawAmm = async(
    wallet: any,
    token1Info: TokenInfo,
    token1Amount: string,
    token2Info: TokenInfo,
    token2Amount: string,
  ) => {
    try {
      globalContext.setLoading(true);
      var result;
      if(token1Info.currency != null && token2Info.currency != null) { 
        result = await client.submitAndWait({
          "TransactionType": "AMMWithdraw",
          "Account": wallet.address,
          "Amount": {
            "currency": token1Info.currency,
            "issuer": token1Info.issuer!,
            "value": token1Amount
          },
          "Amount2": {
            "currency": token2Info.currency,
            "issuer": token2Info.issuer!,
            "value": token2Amount
          },
          "Asset": {
            "currency": token1Info.currency,
            "issuer": token1Info.issuer!,
          },
          "Asset2": {
            "currency": token2Info.currency,
            "issuer": token2Info.issuer!,
          },
          "Fee" : "10",
          "Flags" : 1048576,
        }, {
          autofill: true, 
          wallet: wallet, 
          failHard: true
        })
      } else if(token2Info.currency == null) {
        result = await client.submitAndWait({
          "TransactionType": "AMMWithdraw",
          "Account": wallet.address,
          "Amount": {
            "currency": token1Info.currency!,
            "issuer": token1Info.issuer!,
            "value": token1Amount
          },
          "Amount2": token2Amount,
          "Asset": {
            "currency": token1Info.currency!,
            "issuer": token1Info.issuer!,
          },
          "Asset2": {
            "currency": "XRP"
          },
          "Fee" : "10",
          "Flags" : 1048576,
        }, {
          autofill: true, 
          wallet: wallet, 
          failHard: true
        })
      } else if(token1Info.currency == null) {
        result = await client.submitAndWait({
          "TransactionType": "AMMWithdraw",
          "Account": wallet.address,
          "Amount": token1Amount,
          "Amount2": {
            "currency": token2Info.currency,
            "issuer": token2Info.issuer!,
            "value": token2Amount
          },
          "Asset": {
            "currency": "XRP"
          },
          "Asset2": { 
            "currency": token1Info.currency!,
            "issuer": token1Info.issuer!,
          },
          "Flags" : 1048576,
        }, {
          autofill: true, 
          wallet: wallet, 
          failHard: true
        })
      }
  
      // get metaData & TransactionResult
      const metaData: any = result!.result.meta!;
      const transactionResult = metaData.TransactionResult;
    
      // Use fail_hard so you don't waste the tx cost if you mess up
      if (transactionResult == "tesSUCCESS") {
        console.log(`AMM withdraw: ${EXPLORER}/transactions/${result!.result.hash}`)
      } else {
        throw `Error sending transaction: ${JSON.stringify(result)}`
      }
    } catch(err) {
      console.error("error occuered while withdrawAmm:", err)
    } finally {
      globalContext.setLoading(false);
    }
  };

  /**
   * AMMのオークションスロットに入札するためのメソッド
   */
  const bidAmm = async(
    wallet: any,
    token1Info: TokenInfo,
    token2Info: TokenInfo,
    ammInfo: TokenInfo
  ) => {
    try {
      globalContext.setLoading(true);
      const result = await client.submitAndWait({
        "TransactionType": "AMMBid",
        "Account": wallet.address,
        "Asset": {
          currency: token1Info.currency!,
          issuer: token1Info.issuer!,
        },
        "Asset2": {
          "currency": token2Info.currency!,
          "issuer": token2Info.issuer!,
        },
        "BidMax" : {
          "currency" : ammInfo.currency!,
          "issuer" : ammInfo.issuer!,
          "value" : "5"
        },
      }, {
        autofill: true, 
        wallet: wallet, 
        failHard: true
      })
  
      // get metaData & TransactionResult
      const metaData: any = result.result.meta!;
      const transactionResult = metaData.TransactionResult;
    
      // Use fail_hard so you don't waste the tx cost if you mess up
      if (transactionResult == "tesSUCCESS") {
        console.log(`AMM bid: ${EXPLORER}/transactions/${result.result.hash}`)
      } else {
        throw `Error sending transaction: ${JSON.stringify(result)}`
      }
    } catch(err) {
      console.error("error occuered while bidAmm:", err)
    }
  }

  /**
   * AMMの取引手数料に投票するためのメソッド
   */
  const voteAmm = async(
    wallet: any,
    token1Info: TokenInfo,
    token2Info: TokenInfo,
    tradingFee: number
  ) => {
    try {
      const result = await client.submitAndWait({
        "TransactionType": "AMMVote",
        "Account": wallet.address,
        "Asset": {
          currency: token1Info.currency!,
          issuer: token1Info.issuer!,
        },
        "Asset2": {
          "currency": token2Info.currency!,
          "issuer": token2Info.issuer!,
        },
        "TradingFee" : tradingFee,
      }, {
        autofill: true, 
        wallet: wallet, 
        failHard: true
      })
  
      // get metaData & TransactionResult
      const metaData: any = result.result.meta!;
      const transactionResult = metaData.TransactionResult;
    
      // Use fail_hard so you don't waste the tx cost if you mess up
      if (transactionResult == "tesSUCCESS") {
        console.log(`AMM vote: ${EXPLORER}/transactions/${result.result.hash}`)
      } else {
        throw `Error sending transaction: ${JSON.stringify(result)}`
      }
    } catch(err) {
      console.error("error occuered while voteAmm:", err)
    } finally {
      globalContext.setLoading(false);
    }
  };

  /**
   * Swap
   */
  const swap = async(
    wallet: any,
    ammAddress: string,
    token1Info: TokenInfo,
    token2Info: TokenInfo,
    token1Value: string,
    token2Value: string
  ) => {
    client.on('path_find', (stream: any) => {
      console.log(JSON.stringify(stream.alternatives, null, '  '))
    })
    // path find
    var result; 
    
    try {
      globalContext.setLoading(true);
      if(token1Info.currency != null && token2Info.currency != null) { 
        result = await client.request({
          command: 'path_find',
          subcommand: 'create',
          source_account: wallet.address,
          source_amount: {
            "currency": token2Info.currency,  
            "value": token2Value,                   
            "issuer": token2Info.issuer
          },
          destination_account: wallet.address,
          destination_amount: {
            "currency": token1Info.currency,  
            "value": token1Value,                   
            "issuer": token1Info.issuer
          }
        });
      } else if(token2Info.currency == null) {
        result = await client.request({
          command: 'path_find',
          subcommand: 'create',
          source_account: wallet.address,
          source_amount: {
            "currency": "XRP",
          },
          destination_account: wallet.address,
          destination_amount: {
            "currency": token1Info.currency,  
            "value": token1Value,                   
            "issuer": token1Info.issuer
          }
        });
      } 
    
      console.log("path find:", result)
    
      // Swap用のトランザクションデータを作成する
      var swapTxData: any;

      if(token1Info.currency != null && token2Info.currency != null) { 
        swapTxData = {
          "TransactionType": "Payment",
          "Account": wallet.address,
          "Destination": wallet.address,      // AMMの際は自分自身のアドレスを指定
          "Amount": {
            "currency": token1Info.currency,        // ここで変換先トークンの種類を指定する。
            "value": token1Value,                   // ここで変換先トークンの金額を指定する。
            "issuer": token1Info.issuer!
          },
          "SendMax": {
            "currency": token2Info.currency,  // ここで変換先のトークンの種類を指定する。
            "value": token2Value,
            "issuer": token2Info.issuer!
          },
          "Paths": [
            [
              {
                "account": token2Info.issuer!,
                "type": "1"
              },
              {
                "currency": token1Info.currency,
                "issuer": token1Info.issuer!,
                "type": "48"
              }
            ]
          ]
        }
      } else if (token2Info.currency == null) { // XRP > その他のトークン
        swapTxData = {
          "TransactionType": "Payment",
          "Account": wallet.address,
          "Destination": wallet.address,      // AMMの際は自分自身のアドレスを指定
          "Amount": {
            "currency": token1Info.currency,        // ここで変換先トークンの種類を指定する。
            "value": token1Value,                   // ここで変換先トークンの金額を指定する。
            "issuer": token1Info.issuer
          },
          "SendMax": token2Value,
          "Paths": [
            [
              {
                "currency": token1Info.currency,
                "issuer": token1Info.issuer,
                "type": 48
              }
            ]
          ]
        }
      } else if (token1Info.currency == null) { // その他のトークン > XRP
        swapTxData = {
          "TransactionType": "Payment",
          "Account": wallet.address,
          "Destination": wallet.address,      // AMMの際は自分自身のアドレスを指定
          "Amount": token1Value,
          "SendMax": {
            "currency": token2Info.currency,        // ここで変換先トークンの種類を指定する。
            "value": token2Value,                   // ここで変換先トークンの金額を指定する。
            "issuer": token2Info.issuer
          },
          "Paths": [
            [
              {
                "currency": "XRP",
                "type": 16
              }
            ]
          ]
        }
      }

      const pay_prepared = await client.autofill(swapTxData);
      // トランザクションに署名
      const pay_signed = wallet.sign(pay_prepared);
      
      if (token1Info.currency != null) {
        console.log(`Sending ${token1Info.value} ${token1Info.currency} to ${ammAddress}...`)
      } else if(token2Info.currency == null) {
        console.log(`Sending ${token2Info.value} ${token2Info.currency} to ${ammAddress}...`)
      }
      // 署名済みトランザクションをブロードキャスト
      const pay_result = await client.submitAndWait(pay_signed.tx_blob);
  
      if (pay_result.result.meta.TransactionResult == "tesSUCCESS") {
        console.log(`Transaction succeeded: ${EXPLORER}/transactions/${pay_signed.hash}`)
      } else {
        throw `Error sending transaction: ${pay_result.result.meta.TransactionResult}`
      };
  
      // Check balances ------------------------------------------------------------
      console.log("Getting hot address balances...");
      // get hot address data
      const balances = await client.request({
        command: "account_lines",
        account: wallet.address,
        ledger_index: "validated"
      })
      console.log("wallet address's balance:", balances.result);
    } catch(err) {
      console.error("error occuered while swaping:", err);
    } finally {
      globalContext.setLoading(false);
    }
  };

  // 状態と関数をオブジェクトにラップして、プロバイダーに引き渡す
  const global = {
    address,
    balance,
    xumm,
    login,
    sendFaucet,
    issueNewToken,
    acquireTokens,
    createAmm,
    getAmmcost,
    checkExistsAmm,
    confirmAmm,
    bidAmm,
    voteAmm,
    depositAmm,
    withdrawAmm,
    swap
  };

  return (
    <XummContext.Provider value={global}>
      {children}
    </XummContext.Provider>
  )
}