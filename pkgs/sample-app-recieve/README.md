# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

### 学習ポータルの日本語訳

トラストラインを作成してXRPを超えるトークンを受け取る
XRPLでは、XRP以外の価値あるものを表すトークンを作成することができます。例えば、誰かが不換紙幣を表すstablecoinトークンを作成することができます。

他のチェーンでは、どんなトークンでも誰にでも送ることが許されています。比喩的に言えば、たとえあなたがそれを使うことがなくても、誰でもあなたのウォレットにコインを入れることができると言っているようなものです。

その代わりにXRPLでは、トークンを受け取る意思があることを明示的に示す必要があります。そのためには、特定のトークンの特定の口座に最大金額までの「トラストライン」を設定します。トークン名は一意ではないため、信頼する特定の口座を指定する必要があります。ドルのデジタル表現は、見ず知らずの他人がランダムに作成したものよりも、銀行が作成したものの方が信用できる。

信頼関係が確立されていれば、そのトークンを持っている他の人があなたにトークンを送ることができますし、その逆も同様です。そこでこのレッスンでは、トラスト・ラインを確立し、その後トークンを送る方法を紹介する。

実際にやってみる
以下のサンドボックスを開き、トラストラインがどのように機能するかをデモします。
テストアカウントが作成され終わるのを待ちます。
ソースウォレットのアドレスをコピーします。
そのアドレスを宛先ウォレットの最初の空白フィールドに貼り付けます。
ソースウォレットから受け取りたい通貨の上限を設定します。(この例では通貨をUSDに設定していますが、好きなものに変更できます）。
- これは、宛先ウォレットがソースウォレットから指定された名前（デフォルトでは USD）のトークンを受け取る意思があることを示します。
Send をクリックしてトラストラインを作成します。
- 裏側では、提供した情報で「TrustSet」トランザクションが送信されます。
次に、ソースウォレットから宛先ウォレットにトークンを送信します。
- 注：トラストラインに設定した最大値以上のトークンを送信しようとすると、失敗します！