# XRPL-Repo

XRPL と連動する Dapp 開発のためのリポジトリです。

### Generated Testnet Faucet Info for Dev

※ 開発用なので本番では絶対に使用しないこと！

- Your Testnet Credentials.
  Address
  rhp1Z2kmV4ES9fCEkCG7nDSADu6WT6xJQE
- Secret.
  sEdTJe9xiEFKxY17A644fxLCPHBVuiX
- Balance.
  10,000 XRP
- Sequence Number.
  38535107

### スクリプトの実行例

```bash
{
  uuid: '278379bc-85fc-4610-8057-0816fc335940',
  next: {
    always: 'https://xumm.app/sign/278379bc-85fc-4610-8057-0816fc335940'
  },
  refs: {
    qr_png: 'https://xumm.app/sign/278379bc-85fc-4610-8057-0816fc335940_q.png',
    qr_matrix: 'https://xumm.app/sign/278379bc-85fc-4610-8057-0816fc335940_q.json',
    qr_uri_quality_opts: [ 'm', 'q', 'h' ],
    websocket_status: 'wss://xumm.app/sign/278379bc-85fc-4610-8057-0816fc335940'
  },
  pushed: false
}
```

### アプリの実行方法

#### モジュールのインストール

```bash
pnpm install
```

#### XRPL-NFT-Maker

`pkgs/frontend`配下に`.env`ファイルを作成し、下記項目を埋める。

```txt
REACT_APP_XRP_API_KEY=
REACT_APP_NFT_STORAGE_API_KEY=
```

下記コマンドにて起動

```bash
pnpm frontend run start
```

#### sample-app-send

```bash
pnpm sample-app-send run start
```

#### sample-app-recieve

```bash
pnpm sample-app-recieve run start
```

#### sample-app-nft

```bash
pnpm sample-app-nft run start
```

#### スクリプトを実行する。

- offer create する場合

  ```bash
  pnpm script offer-create
  ```

#### sample-FT

- トークンの発行スクリプト

  ```bash
  pnpm run sample-FT issue-a-token
  ```

  ```bash
  Requesting addresses from the Testnet faucet...
  Got hot address rn3iPRS6AsADpALjTe9H6kcx6LHryxdzEp and cold address rMyBAqArcoxxjB35iw7YagBspgeQiNcnh7.
  Sending cold address AccountSet transaction...
  Transaction succeeded: https://testnet.xrpl.org/transactions/21DE75E6FC53945D51EFA5A0A59709EC44257D5748F2AE2BDFF992962D4FD71B
  Sending hot address AccountSet transaction...
  Transaction succeeded: https://testnet.xrpl.org/transactions/F359C63CF9483A4D06ECEB7830AB0B1456591724303C16158D89EE86FD03A1CD
  Creating trust line from hot address to issuer...
  Transaction succeeded: https://testnet.xrpl.org/transactions/B46630A8C76EC5B36EA70C6C435086AB2DF36D49CD76FCBBD8D5B251434372BD
  Sending 384000 MSH to rn3iPRS6AsADpALjTe9H6kcx6LHryxdzEp...
  Transaction succeeded: https://testnet.xrpl.org/transactions/DEE154C08A7BA10804EBCB0A73FFBC5D635989705DA6E9EE09FE02E714EA975A
  Getting hot address balances...
  {
    account: 'rn3iPRS6AsADpALjTe9H6kcx6LHryxdzEp',
    ledger_hash: '68A7E060A088F83F45BE92CF1D3FE9C0EFB8E4970B3BDAE83AF9B8FE272DD874',
    ledger_index: 39528804,
    lines: [
      {
        account: 'rMyBAqArcoxxjB35iw7YagBspgeQiNcnh7',
        balance: '384000',
        currency: 'MSH',
        limit: '1000000000000000e-2',
        limit_peer: '0',
        no_ripple: false,
        no_ripple_peer: false,
        quality_in: 0,
        quality_out: 0
      }
    ],
    validated: true
  }
  Getting cold address balances...
  {
    "account": "rMyBAqArcoxxjB35iw7YagBspgeQiNcnh7",
    "balances": {
      "rn3iPRS6AsADpALjTe9H6kcx6LHryxdzEp": [
        {
          "currency": "MSH",
          "value": "384000"
        }
      ]
    },
    "ledger_hash": "68A7E060A088F83F45BE92CF1D3FE9C0EFB8E4970B3BDAE83AF9B8FE272DD874",
    "ledger_index": 39528804,
    "validated": true
  }
  ```

- トークンを送金するスクリプト

  ```bash
  pnpm run sample-FT send-a-token
  ```

  実行例

  ```bash

  ```

- トークンの残高を確認するスクリプト

  ```bash
  pnpm run sample-FT list-account-tokens
  ```

  実行結果

  ```bash
  Connecting to Testnet...

  Account rn3iPRS6AsADpALjTe9H6kcx6LHryxdzEp's Ledger Objects:

  1. Index (ObjectID/keylet): F2A674B8EF8E007A7699FC88852B589F3F7A9CA83976309D5018057484EF6C43
    - LedgerEntryType: RippleState

  Account rn3iPRS6AsADpALjTe9H6kcx6LHryxdzEp's Trust lines:

  1. Trustline:
    - Account: rMyBAqArcoxxjB35iw7YagBspgeQiNcnh7
    - Currency: MSH
    - Amount: 384000
    - Limit: 1000000000000000e-2
    - Limit Peer: 0
  ```

### 参考文献

1. [Xumm](https://xumm.app/)
2. [XRP Faucet](https://xrpl.org/ja/xrp-testnet-faucet.html)
3. [XRP Docs](https://xrpl.org/ja/docs.html)
4. [Xumm Developer Console](https://apps.xumm.dev/)
5. [【NPM】 Numm SDK](https://www.npmjs.com/package/xumm)
6. [XRP NFT-Explorer](https://test.bithomp.com/nft-explorer)
7. [【NPM】 xrpl](https://www.npmjs.com/package/xrpl)
8. [XLP-24](https://github.com/XRPLF/XRPL-Standards/discussions/69)
9. [NFT.Storage](https://nft.storage/)
10. [NFT のミント履歴](https://test.bithomp.com/nft/00080000214300096509110EFDB01B85F3837B10BBC6B13616E5DA9C00000001)
11. [XRPL Explorer](https://livenet.xrpl.org/)
12. [6 月 25 日のブートキャンプの資料](https://speakerdeck.com/tequ/introduction-xrpl-for-ideathon)
13. [XRPL Hooks Builders - IDE](https://hooks-builder.xrpl.org/develop/1f8109c80f504e6326db2735df2f0ad6)
14. [XRPL Scan](https://xrpscan.com/)
15. [サンプルコード集](https://xrpl.org/ja/code-samples.html)
16. [XPRL 学習ポータル](https://learn.xrpl.org/)
17. [XRPL Dapp 開発に有益な開発者ツール集](https://xrpl.org/dev-tools.html)
18. [公式サイト(日本語)](https://xrpl.org/ja/index.html)
19. [ブートキャンプの詳細ページ](https://lu.ma/xrpl_builders_bootcamp)
20. [GitHub - XRPL](https://github.com/XRPLF)
21. [Xumm - ドキュメント](https://xumm.readme.io/)
22. [Youtube](https://youtube.com/channel/UC6zTJdNCBI-TKMt5ubNc_Gg)
23. [XRPL の特徴](https://xrpl.org/ja/xrp-overview.html)
24. [UNCHAIN - XRPL-NFT-Maker lession](https://app.unchain.tech/learn/XRPL-NFT-Maker/ja/0/1/)
25. [Ideathon at "【XRP LEDGER】BUIDLERS BOOTCAMP" - Akindo](https://app.akindo.io/hackathons/Be7ZEGBOWT066OJKl)
26. [Ripple 公式サイト](https://ripple.com/)
27. [xrp.cafe](https://xrp.cafe/)
28. [XRPL - チュートリアル](https://xrpl.org/tutorials.html)
29. [XRPL Summer Hackathon | Ripple](https://dorahacks.io/hackathon/xrpl-hackathon)
30. [Begin coding with XRPL and React.js](https://learn.xrpl.org/course/build-with-react-js-and-xrpl/lesson/begin-coding-with-xrpl-and-react-js/)
31. [世界初の DEX を使ってみよう！ - Zenn ](https://zenn.dev/tequ/articles/use-original-dex)
32. [awesome-xrpl - Github](https://github.com/wojake/awesome-xrpl)
33. [Trade in the Decentralized Exchange tutorial](https://xrpl.org/ja/decentralized-exchange.html)
34. [XRPL の学習フロー - Zenn](https://zenn.dev/tequ/articles/xrpl-learning-flow)
35. [XRP Ledger Faucet](https://faucet.tequ.dev/)
36. [Build A Browser Wallet Using JS](https://xrpl.org/build-a-browser-wallet-in-js.html)
37. [using-xrpljs-with-vite-react Config](https://github.com/XRPLF/xrpl.js/blob/main/UNIQUE_SETUPS.md#using-xrpljs-with-vite-react)
38. [xrpl.js の詳細ページ](https://js.xrpl.org/)
39. [Issue a Fungible Token SampleCode - GitHub](https://github.com/XRPLF/xrpl-dev-portal/tree/master/content/_code-samples/issue-a-token/)
40. [Trade in the Decentralized Exchange SampleCode - GitHub](https://github.com/XRPLF/xrpl-dev-portal/tree/master/content/_code-samples/trade-in-the-decentralized-exchange/)
41. [awesome-xrpl](https://github.com/wojake/awesome-xrpl)
42. [CodeSandBox @nice-xrpl/react-xrpl](https://codesandbox.io/examples/package/@nice-xrpl/react-xrpl)
43. [【GitHub】XummSDK-React-Demo](https://github.com/XRPL-Labs/XummSDK-React-Demo/tree/main)
44. [【GitHub】xrpl-dex-dex](https://github.com/tequdev/xrpl-dex-sdk)
45. [【GitHub】create AMM](https://github.com/XRPLF/xrpl-dev-portal/tree/master/content/_code-samples/create-amm/)
46. [Create an Automated Market Maker](https://xrpl.org/create-an-automated-market-maker.html#1-connect-to-the-network)
47. [トランザクションタイプ](https://xrpl.org/ja/transaction-types.html)
48. [XRPL ドキュメント - AMMBid](https://xrpl.org/ammbid.html)
49. [XRPL ドキュメント - AMMCreate](https://xrpl.org/ammcreate.html)
50. [XRPL ドキュメント - AMMDelete](https://xrpl.org/ammdelete.html)
51. [XRPL ドキュメント - AMMDeposit](https://xrpl.org/ammdeposit.html)
52. [XRPL ドキュメント - AMMVote](https://xrpl.org/ammvote.html)
53. [XRPL ドキュメント - AMMWithdraw](https://xrpl.org/ammwithdraw.html)
54. [XRPL のトランザクションコード](https://zenn.dev/tequ/articles/rippled-transaction-code)
55. [Paths に関するサンプルソースコード](https://github.com/XRPLF/xrpl-dev-portal/blob/master/content/_code-samples/paths/js/paths.ts)
56. [XRPL エラーコード](https://xrpl.org/ja/tem-codes.html)
57. [Web3Auth - XRPL Provider](https://web3auth.io/docs/sdk/helper-sdks/providers/xrpl/)
58. [【GitHub】xrpl-modal-example](https://github.com/Web3Auth/web3auth-pnp-examples/tree/main/web-modal-sdk/blockchain-connection-examples/xrpl-modal-example)
59. [Ripple Docs Automated Market Maker](https://opensource.ripple.com/docs/xls-30d-amm/amm-uc/)
60. [TailwindCSS Component live preview](https://tailwindui.com/components/preview)
61. [【Supabase】Build a User Management App with Next.js](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs?database-method=dashboard&language=ts#project-setup)
62. [Use Supabase with Next.js](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
63. [NextUi Dropdown](https://nextui.org/docs/components/dropdown)
64. [tem-code 一覧](https://xrpl.org/tem-codes.html)
65. [Currency Code に関する命名規則](https://xrpl.org/currency-formats.html#currency-codes)
66. [XRPL エラーコード tecPATH_DRY](https://xrpl.org/tec-codes.html#tecPATH_DRY)
67. [XRPL トラストラインの定義](https://xrpl.org/ja/trust-lines-and-issuing.html#:~:text=%E3%83%88%E3%83%A9%E3%82%B9%E3%83%88%E3%83%A9%E3%82%A4%E3%83%B3%E3%81%A8%E3%81%AF%E3%80%81XRP,%E3%82%92%E5%BC%B7%E5%88%B6%E3%81%99%E3%82%8B%E3%82%82%E3%81%AE%E3%81%A7%E3%81%99%E3%80%82)
68. [XRPL トラストライン](https://xrpl.org/ja/trustset.html)
