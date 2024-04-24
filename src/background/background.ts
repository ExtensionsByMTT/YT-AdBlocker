chrome.runtime.onInstalled.addListener((details) => {
  switch (details.reason) {
    case "install":
      console.info("EXTENSION INSTALLED");
      const urlPrefixes = ["https://www.youtube.com"];
      chrome.tabs.query({}, (tabs) => {
        tabs
          .filter((tab) =>
            urlPrefixes.some((prefix) => tab.url.startsWith(prefix))
          )
          .forEach(({ id }) => {
            console.log("TABS DETECTED:", id);
            chrome.tabs.reload(id);
          });
      });
      chrome.storage.local.set({ ExtensionState: true });
      chrome.tabs.create({ url: "https://www.youtubeadblocker.net" });
      break;
    case "update":
      console.info("EXTENSION UPDATED");
      break;
    default:
      console.info("BROWSER UPDATED");
      break;
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message.state);
  if (message && message.action === "RELOADTHEPAGE") {
    chrome.storage.local.set({ ExtensionState: message.state });
    chrome.tabs.query({ url: "https://www.youtube.com/*" }, (tabs) => {
      tabs.forEach(({ id }) => {
        chrome.tabs.reload(id);
      });
    });
  }
});
