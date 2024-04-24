import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./popup.css";

const App: React.FC<{}> = () => {
  return (
    <>
      <Loader />
    </>
  );
};

const Loader = () => {
  const [isActiveYoutube, setIsActiveYoutube] = useState(true);
  const [isConnecting, setisConnecting] = useState(false);
  useEffect(() => {
    chrome.storage.local.get((result) => {
      setIsActiveYoutube(result.ExtensionState);
    });
  }, [isActiveYoutube]);

  const turnOnAdBlc = () => {
    setIsActiveYoutube(!isActiveYoutube);
    setisConnecting(true);
    setTimeout(() => {
      setisConnecting(false);
    }, 2000);
    chrome.runtime.sendMessage({ action: "RELOADTHEPAGE", state: false });
    // chrome.storage.local.set({ extensionState: false });
  };

  const tunOffAdBlc = () => {
    setIsActiveYoutube(!isActiveYoutube);
    chrome.runtime.sendMessage({ action: "RELOADTHEPAGE", state: true });
    // chrome.storage.local.set({ extensionState: true });
  };

  return (
    <div>
      {isActiveYoutube === false ? (
        <div className="entry-connect">
          <div style={{ marginTop: "45px" }}>
            <h3 className="extHeading" style={{ fontSize: "25px" }}>
              Connect to Block Ads On
            </h3>
            <h1 className="extHeading">Youtube</h1>
          </div>
          <div className="main" onClick={tunOffAdBlc}>
            <input type="checkbox" id="checkbox" />
            <label htmlFor="checkbox" className="switch">
              <div className="powersign"></div>
            </label>
          </div>
        </div>
      ) : (
        <div className="main-connecting">
          {isConnecting ? (
            <div className="loading-container">
              <div className="loading"></div>
              <div id="loading-text">Connecting...</div>
            </div>
          ) : (
            <>
              {isActiveYoutube ? (
                <div className="main-dis">
                  <div className="features">
                    <div className="top">
                      <img
                        src="./TrueAdBlocker128x128.png"
                        alt=""
                        width="128px"
                      />
                      <h2 className="text">Connected to Youtube Ad Blocker</h2>
                      <p className=""></p>
                    </div>
                    <div className="bottom">
                      <div className="loader" onClick={turnOnAdBlc}>
                        <span className="title">Disconnect</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
