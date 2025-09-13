console.log('백그라운드 기능');
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    chrome.identity.getProfileUserInfo(function (info) {
      console.log('google email:', info.email);

      setTimeout(() => {
        chrome.tabs.create({
          url: `http://localhost:5173/onboarding?email=${info.email}`,
        });
      }, 1000);
    });
  }
});


