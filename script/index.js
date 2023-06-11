const { Xumm } = require('xumm');
const { convertStringToHex, NFTokenMintFlags } = require('xrpl');
require('dotenv').config();

// 環境変数を読み込む
const {
  API_KEY,
  API_SECRET
} = process.env;

// インスタンスを生成
const xumm = new Xumm(
  API_KEY, 
  API_SECRET
);

/**
 * NFT発行用のトランザクションを定義
 */
const transaction = {
  TransactionType: 'NFTokenMint',
  NFTokenTaxon: 0,
  Flags: NFTokenMintFlags.tfTransferable,
  TransferFee: 10 * 1000, // 10%
  URI: convertStringToHex('ipfs://***'),
};

// NFTミント用のトランザクションを実行する。
xumm.payload?.create(transaction).then(payload=>{
  console.log(payload);
});