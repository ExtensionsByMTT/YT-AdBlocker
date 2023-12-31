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

const Header = (props) => {
  return (
    <div className="header">
      <div>
        <img src="./TrueAdBlocker128x128.png" alt="" width="128px" />
      </div>
      <div className="extHeading2">
              <img src="./youtube.png" alt="" width="30px" />
              <span>YouTube</span>
            </div>
    </div>
  );
};

const Loader = () => {
  const [isActiveYoutube, setIsActiveYoutube] = useState(true);

  const [isConnecting, setisConnecting] = useState(false);
  useEffect(() => {
    const storedData = localStorage.getItem("appData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setIsActiveYoutube(parsedData.isActiveYoutube);
    }
  }, []);

  useEffect(() => {
    const dataToStore = { isActiveYoutube };
    localStorage.setItem("appData", JSON.stringify(dataToStore));
  }, [isActiveYoutube]);

  //////////////////////////////////

  const tunOffAdBlc = () => {
    setIsActiveYoutube(!isActiveYoutube);

    setisConnecting(true);
    setTimeout(() => {
      setisConnecting(false);
      // Code to handle turning on ad blocking
    }, 2000);
    const message = { message: true };
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab) {
        chrome.tabs.sendMessage(activeTab.id!, message, (response) => {
          if (response && response.farewell) {
            console.log(response.farewell, "response");
          }
        });
      }
    });
  };

  const turnOnAdBlc = () => {
    setIsActiveYoutube(!isActiveYoutube);
    const message = { message: false };
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab) {
        chrome.tabs.sendMessage(activeTab.id!, message, (response) => {
          if (response && response.farewell) {
            console.log(response.farewell, "response");
          }
        });
      }
    });
  };

  /////////////////////////////////

  return (
    <div>
      {isActiveYoutube === false ? (
        <div className="entry-connect">
          <Header title="TrueAdBlocker" />
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
