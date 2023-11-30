import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { arbitrum, bsc, bscTestnet, mainnet, polygon } from "wagmi/chains";
import App from "./App";
import store from "./global/redux";
import "./index.scss";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { publicProvider } from "wagmi/providers/public";
import WalletProvider from "./core/wallet/provider";
import { CookiesProvider } from "react-cookie";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-tooltip/dist/react-tooltip.css";
import "@rainbow-me/rainbowkit/styles.css";
import "swiper/swiper-bundle.css";

// const root = ReactDOM.createRoot(document.getElementById("root"));

const base = {
  id: 0x2105,
  network: "base",
  name: "Base",
  nativeCurrency: {
    name: "Base",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [
        "https://lingering-virulent-dinghy.base-mainnet.quiknode.pro/057afecb0d9a981657fec3c0bf94f0bd5075b8fc/",
      ],
    },
    public: {
      http: [
        "https://lingering-virulent-dinghy.base-mainnet.quiknode.pro/057afecb0d9a981657fec3c0bf94f0bd5075b8fc/",
      ],
    },
  },
  blockExplorers: {
    etherscan: {
      name: "Basescan",
      url: "https://basescan.org/",
    },
    default: {
      name: "Basescan",
      url: "https://basescan.org/",
    },
  },
  testnet: true,
};

const { chains, provider } = configureChains(
  [mainnet, polygon, arbitrum, bsc, bscTestnet, base],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Metopia",
  // projectId: "e3ac52789e2343ee783380dcb4d9e4e5",
  chains,
});

const isDisconnected = window.localStorage.getItem("disconnect");
const wagmiClient = createClient({
  autoConnect: !isDisconnected,
  connectors,
  provider,
});

ReactDOM.render(
  <Provider store={store}>
    <div className="root">
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <WalletProvider>
            {/* <Web3OnboardProvider web3Onboard={web3Onboard}> */}
            <CookiesProvider>
              {/* <BaseModal /> */}
              <App />
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
              />
            </CookiesProvider>
            {/* </Web3OnboardProvider> */}
          </WalletProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  </Provider>,
  document.getElementById("root")
);
// root.render(
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
