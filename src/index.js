import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  WalletProvider,
  SuietWallet,
  SuiWallet,
  EthosWallet, IDefaultWallet,
  PresetWallet,
} from '@suiet/wallet-kit';

const CustomizeWallet = {
  name: "myWallet",
  iconUrl: "external url or data url",
  downloadUrl: {
    browserExtension: 'chrome extension store url...'
  },
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WalletProvider defaultWallets={[
      // order defined by you
      SuietWallet,
      SuiWallet,
      EthosWallet,
      // ...
    ]}>
      {/* or just leave it as default which contains all preset wallets */}
      {/*<WalletProvider>*/}
      <App />
    </WalletProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
