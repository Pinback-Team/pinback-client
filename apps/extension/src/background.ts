console.log('백그라운드 기능');
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === 'FETCH_OG_META') {
    fetch(message.url)
      .then((res) => res.text())
      .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const getMeta = (prop) =>
          doc
            .querySelector(`meta[property="${prop}"]`)
            ?.getAttribute('content') || '';

        const makeAbsoluteUrl = (base, img) => {
          try {
            return img ? new URL(img, base).href : '';
          } catch {
            return img;
          }
        };

        const image = getMeta('og:image');

        sendResponse({
          title: getMeta('og:title'),
          description: getMeta('og:description'),
          siteName: getMeta('og:site_name'),
          image: makeAbsoluteUrl(message.url, image),
          url: getMeta('og:url') || message.url,
        });
      })
      .catch((err) => {
        console.error('OG fetch 실패:', err);
        sendResponse(null);
      });
    return true; // async 응답
  }
});
