console.log('백그라운드 기능');
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    chrome.identity.getProfileUserInfo(function (info) {
       chrome.storage.local.set({ 'userEmail': info.email }, () => {
          console.log(info.email);
        });
      setTimeout(() => {
        chrome.tabs.create({
          url: `http://localhost:5173/onboarding?email=${info.email}`,
        });
      }, 1000);
    });
  }
});


chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'SET_TOKEN') {
    chrome.storage.local.set({ 'token': message.token }, () => {
      console.log('Token saved!', message.token);
    });
  }
});