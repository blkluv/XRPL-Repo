import { getEnv } from "@/utils/getEnv";
import { Xumm } from "xumm";


// Xummインスタンス用の変数
var xumm: Xumm; 
var account: any;

/**
 * 初期化関数
 */
export const init = async() => {
  // get env
  const { XRP_API_KEY } = await getEnv();
  xumm = new Xumm(XRP_API_KEY);
}

/**
 * 認証メソッド
 */
export const authorize = async():Promise<any> => {
  xumm.on("success", async () => {
    account = await xumm.user.account;
  });
  console.group("user info:", account);
  // authorize
  await xumm.authorize();
  return account;
}