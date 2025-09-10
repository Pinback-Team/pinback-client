export const OgImageFetcher = ({ url }: { url: string }) => {
  if (!url || url.startsWith('chrome://')) {
    console.warn('크롬 내부 페이지는 OG 썸네일 불가함');
    return;
  }

  return fetchOgMeta(url);
};
export async function fetchOgMeta(url: string) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const getMeta = (property: string) =>
      doc
        .querySelector(`meta[property="${property}"]`)
        ?.getAttribute('content') || '';

    return {
      title: getMeta('og:title'),
      description: getMeta('og:description'),
      siteName: getMeta('og:site_name'),
      image: getMeta('og:image'),
      url: getMeta('og:url'),
    };
  } catch (e) {
    console.error('OG 태그 파싱 실패', e);
    return null;
  }
}
