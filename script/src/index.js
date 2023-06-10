const { Xumm } = require('xumm');
const { convertStringToHex, NFTokenMintFlags } = require('xrpl');

// インスタンスを生成
const xumm = new Xumm(
  'api-key', 
  'api-secret'
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