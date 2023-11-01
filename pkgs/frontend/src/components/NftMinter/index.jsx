import { Button } from "@mui/material";
import { extractAffectedNFT } from "@xrplkit/txmeta";
import { Buffer } from "buffer";
import { NFTStorage } from "nft.storage";
import { useEffect, useState } from "react";
import { XrplClient } from 'xrpl-client';
import { Xumm } from "xumm";
import Spinner from "./../Spinner";
import "./index.css";

// 環境変数を取得
const {
  REACT_APP_XRP_API_KEY,
  REACT_APP_NFT_STORAGE_API_KEY
} = process.env;

// Xummインスタンスを生成する。
const xumm = new Xumm(REACT_APP_XRP_API_KEY);
const nftStorage = new NFTStorage({ 
  token: REACT_APP_NFT_STORAGE_API_KEY,
});

/**
 * NftMinter Component
 * @returns 
 */
export const NftMinter = () => {
  const [account, setAccount] = useState(undefined);
  const [file, setFile] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  // ENDPOINTURL 
  const END_POINT_URL = "wss://amm.devnet.rippletest.net:51233/";
  // const END_POINT_URL =  "wss://testnet.xrpl-labs.com"

  useEffect(() => {
    xumm.on("success", async () => {
      setAccount(await xumm.user.account);
    });
  }, []);

  /**
   * connect method
   */
  const connect = () => {
    setIsLoading(true)
    try {
      xumm.authorize();
      setIsLoading(false);
    } catch(err) {
      console.error("err:", err);
      setIsLoading(false);
    }
  };

  /**
   * uploadImage method
   * @param {*} e 
   */
  const uploadImage = (e) => {
    const files = e.target.files;
    setFile(files[0])
  };

  /**
   * mint method
   * @returns 
   */
  const mint = async () => {
    if (!file) {
      alert("画像ファイルを選択してください！");
      return;
    }

    setIsLoading(true);
    // 画像とメタデータをIPFSにアップロード
    const { url } = await nftStorage.store({
      schema: "ipfs://QmNpi8rcXEkohca8iXu7zysKKSJYqCvBJn3xJwga8jXqWU",
      nftType: "art.v0",
      image: file,
      name: "some name",
      description: "some description",
    });
    // Xummにトランザクションデータを送信
    const payload = await xumm.payload.createAndSubscribe({
      TransactionType: "NFTokenMint",
      NFTokenTaxon: 0,
      Flags: 8,
      URI: Buffer.from(url).toString("hex"),
    });

    payload.websocket.onmessage = (msg) => {
      const data = JSON.parse(msg.data.toString());
      // トランザクションへの署名が完了/拒否されたらresolve
      if (typeof data.signed === "boolean") {
        payload.resolve({ signed: data.signed, txid: data.txid });
      }
    };

    // resolveされるまで待機
    const { signed, txid } = await payload.resolved;

    if (!signed) {
      alert("トランザクションへの署名は拒否されました！");
      setIsLoading(false);
      return;
    }
    // テストネットからトランザクションの情報を取得
    const client = new XrplClient(END_POINT_URL);
    const txResponse = await client.send({
      command: "tx",
      transaction: txid,
    });
    // トランザクション情報からNFTの情報を取得
    const nftoken = extractAffectedNFT(txResponse);
    alert('NFTトークンが発行されました！');
    setIsLoading(false);
    console.log("nftToken object:", nftoken);
    window.open(`https://test.bithomp.com/nft/${nftoken.NFTokenID}`, "_blank");
  };

  return (
    <div className="nft-minter-box">
      <div className="title">XRP NFT</div>
      {isLoading ? 
        <div className="account-box">
          <Spinner/>
        </div>
      : (
        <>
          <div className="account-box">
            <div className="account">
              My Account: <strong>{account}</strong>
            </div>
            <Button 
              variant="contained" 
              onClick={connect}
            >
              connect
            </Button>
          </div>
          <div className="image-box">
            <Button 
              variant="contained"
              onChange={uploadImage}  
            >
              ファイルを選択
              <input
                className="imageInput"
                type="file"
                accept=".jpg , .jpeg , .png"
              />
            </Button>
            {file && (
              <img 
                src={window.URL.createObjectURL(file)} 
                alt="nft" 
                className="nft-image" 
              />
            )}
            {account && (
              <div>
                <Button 
                  variant="outlined" 
                  onClick={mint}
                >
                  mint
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
