import { getEnv } from "@/utils/getEnv";
import { Xumm } from "xumm";


// Xummインスタンス用の変数
var xumm: Xumm; 
var userInfo: any;
var account: any;

/**
 * 初期化＆認証メソッド
 */
export const login = async():Promise<any> => {
  // get env
  const { XRP_API_KEY } = await getEnv();
  // XUMM用のインスタンスを作成する。
  xumm = new Xumm(XRP_API_KEY);

  // authorize
  await xumm.authorize();
  account = await xumm.user.account;
  userInfo = await xumm.user;
  console.log("user info:", userInfo);
  console.log("account address:", account);
 
  return account;
}