// background.js
chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason === "install") {
    chrome.storage.local.set({ isInstalled: true });
  }
});
