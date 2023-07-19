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
        <img src="./TrueAdBlocker128x128.png" alt="" height="80px" />
      </div>
      <div>
        <h1>{props.title}</h1>
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
            <h2 className="extHeading">Youtube,Twitch,And Malicious ads </h2>
          </div>
          <div className="main" onClick={tunOffAdBlc}>
            <div id="ConnectionButton" className="disconnected">
              <div className="staticOuterCircle"></div>
              <div className="staticInnerCircle"></div>
              <div className="staticBackground"></div>
              <span className="title">Connect</span>
            </div>
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
                  <div className="main-disconnect">
                    <div
                      id="ConnectionButton"
                      className="connected"
                      onClick={turnOnAdBlc}
                    >
                      <div className="staticOuterCircle"></div>
                      <div className="staticInnerCircle"></div>
                      <div className="staticBackground"></div>
                      <span className="title">Stop</span>
                    </div>
                  </div>

                  <div className="features">
                    <img src="" alt="" />
                    <div style={{ padding: "0px 10px 0px 10px" }}>
                      {" "}
                      <div className="youtube">
                        <h4>YouTube</h4>
                        <span>
                          <img src="./youtube.png"></img>{" "}
                        </span>
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
