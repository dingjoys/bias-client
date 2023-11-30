import { ReactComponent as IconWallet } from "@/component/icons/svg/wallet.svg";
import { WalletContext } from "@/core/wallet/context";
import { isDevelopment } from "@/global/constant";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useContext, useEffect, useMemo } from "react";
import { useNetwork, useSwitchNetwork } from "wagmi";
import "./index.scss";
import { WalletIcon } from "../icons";
import { useGitcoinPass } from "@/core/gitcoin";

const LogoIcon = (props: { src: string }) => {
  return (
    <div
      className={"logo-icon-wrapper"}
      onClick={() => (window.location.href = "/")}
    >
      <span className="icon icon-metopia-logo">
        <span className="path1"></span>
        <span className="path2"></span>
        <span className="path3"></span>
      </span>
    </div>
  );
};

const MenuItem = (props: { name: string; link: string; active?: any }) => {
  const { name, link, active } = props;
  return (
    <a className={"menu-item" + (active ? " active" : "")} href={link}>
      {name}
    </a>
  );
};

const NetworkSelector = (props) => {
  const { chain } = useNetwork();
  const chainId = chain && "0x" + chain?.id.toString(16);
  const { switchNetwork } = useSwitchNetwork();

  const onChange = (chain: number) => {
    switchNetwork(chain); // TODO
  };

  const chainInfo = useMemo(() => {
    if (chainId === "0x13881") {
      return (
        <>
          <img
            src="https://oss.metopia.xyz/imgs/polygon.svg"
            style={{ backgroundColor: "#A195FF" }}
            alt=""
          />
        </>
      );
    } else {
      return (
        <>
          <img src="https://oss.metopia.xyz/imgs/error-fill.svg" alt="" />
        </>
      );
    }
  }, [chainId]);

  return (
    <div className="network-selector">
      <div className="value">{chainInfo}</div>
      <div className="drop-down">
        <div className="drop-down-content">
          <div className="option" onClick={() => onChange(0x13881)}>
            <div className="img-wrapper">
              <img src="https://oss.metopia.xyz/imgs/polygon.svg" alt="" />
            </div>
            <div className="text">Mumbai</div>
          </div>
        </div>
      </div>
    </div>
  );
};

function getActive() {
  let path = window.location.pathname;
  // if (path.indexOf('/metobadge') >= 0 || path.indexOf('/badge') >= 0) return 0;
  // else
  if (path.indexOf("/space") >= 0) return 1;
  else if (path.indexOf("/raffle") >= 0) return 2;
  else if (path.indexOf("/credential") >= 0) return 5;
  else if (path.indexOf("/leaderboard") >= 0) return 4;
  else if (path.indexOf("/quest") >= 0) return 3;
  else return -1;
}

const Menu = (props) => {
  const {
    address: account,
    disconnect: disconnectRainbow,
    isConnected,
    connect,
  } = useContext(WalletContext);

  useEffect(() => {
    if (isConnected) {
      localStorage.removeItem("disconnect");
    }
  }, [isConnected]);

  const { data: gitcoinData } = useGitcoinPass(account);
  return (
    <div className="menu-bar">
      <div className="container">
        <div
          style={{
            display: "flex",
            gap: "8px",
            fontSize: "20px",
            alignItems: "center",
          }}
        >
          Bias
          <img
            src="https://oss.metopia.xyz/imgs/bias-logo.png"
            onClick={() => (window.location.href = "/")}
            style={{ cursor: "pointer", height: "32px" }}
            alt=""
          />
          Protocol
        </div>
        {/* <Link
                    to={localRouterUrl('home')}
                    className={'logowrapper' + (isDevelopment ? ' alpha' : '')}
                >
                    <span className="icon icon-metopia-logo">
                        <span className="path1"></span>
                        <span className="path2"></span>
                        <span className="path3"></span>
                    </span>
                </Link> */}

        <div className="account-info-container">
          <ConnectButton.Custom>
            {
              ({ account, openConnectModal }) =>
                account ? (
                  <>
                    {gitcoinData?.items?.length ? (
                      <div
                        style={{
                          fontSize: "14px",
                          background: "lightgreen",
                          padding: "1px 4px",
                          borderRadius: "4px",
                        }}
                      >
                        Gitcoin Pass Connected
                      </div>
                    ) : (
                      <div
                        style={{
                          fontSize: "14px",
                          background: "lightgray",
                          padding: "1px 4px",
                          borderRadius: "4px",
                        }}
                      >
                        Gitcoin Pass Unconnected
                      </div>
                    )}
                    <NetworkSelector />
                    <div
                      className="avatar-wrapper"
                      style={{ fontSize: "14px" }}
                    >
                      {account.address}
                      <div className="drop-down">
                        <div className="drop-down-content">
                          <div
                            className="option"
                            onClick={(e) => {
                              disconnectRainbow();
                              localStorage.setItem("disconnect", "true");
                              e.stopPropagation();
                            }}
                          >
                            <img
                              src="https://oss.metopia.xyz/imgs/exit.svg"
                              alt=""
                            />
                            <div className="text">Disconnect</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div
                    onClick={openConnectModal}
                    className="connect-wallet-button"
                  >
                    <WalletIcon />
                    <span className="connect-wallet-button-text">
                      Connect wallet
                    </span>
                  </div>
                  // <HollowButton  variant="contained">

                  // </HollowButton>
                )
              // <HollowButton  variant="contained">

              // </HollowButton>
            }
          </ConnectButton.Custom>
        </div>
      </div>
    </div>
  );
};
let timer = null;
export { LogoIcon, Menu, MenuItem };
