# XRPL-Repo

XRPL と連動するDapp開発のためのリポジトリです。

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

- offer createする場合

  ```bash
  pnpm script offer-create
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
31. [世界初のDEXを使ってみよう！ - Zenn ](https://zenn.dev/tequ/articles/use-original-dex)
32. [awesome-xrpl - Github](https://github.com/wojake/awesome-xrpl)
33. [https://xrpl.org/ja/decentralized-exchange.html](https://xrpl.org/ja/decentralized-exchange.html)
34. [XRPLの学習フロー - Zenn](https://zenn.dev/tequ/articles/xrpl-learning-flow)
35. [XRP Ledger Faucet](https://faucet.tequ.dev/)