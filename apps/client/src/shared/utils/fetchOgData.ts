import axios, { AxiosResponse } from 'axios';

export interface OGData {
  title: string;
  description: string;
  image: string;
  url: string;
  siteName: string;
}

// 헬퍼: URL 경로를 절대 경로로 변환
function resolveUrl(baseUrl: string, relativeUrl?: string | null): string {
  if (!relativeUrl) return '';
  // 이미 절대 경로인 경우 그대로 반환
  if (/^(https?|data):/i.test(relativeUrl)) {
    return relativeUrl;
  }
  try {
    // new URL()을 사용하여 안전하게 절대 경로 생성
    return new URL(relativeUrl, baseUrl).href;
  } catch (error) {
    console.error('URL 변환 오류:', error);
    // baseUrl이 유효하지 않은 경우 등 에러 발생 시 원래 경로 반환
    return relativeUrl;
  }
}

/**
 * HTML 문자열에서 DOMParser를 사용해 OG 데이터를 안정적으로 파싱합니다.
 * OG 태그 > 트위터 카드 > 일반 태그 순으로 우선순위를 가집니다.
 */
export function parseOgData(html: string, sourceUrl: string): OGData {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  const getMetaContent = (selector: string) =>
    doc.querySelector(selector)?.getAttribute('content')?.trim();

  // 우선순위에 따라 값을 찾습니다.
  const title =
    getMetaContent('meta[property="og:title"]') ||
    getMetaContent('meta[name="twitter:title"]') ||
    doc.querySelector('title')?.textContent ||
    '';

  const description =
    getMetaContent('meta[property="og:description"]') ||
    getMetaContent('meta[name="twitter:description"]') ||
    getMetaContent('meta[name="description"]') ||
    '';

  const image = resolveUrl(
    sourceUrl,
    getMetaContent('meta[property="og:image"]') ||
      getMetaContent('meta[name="twitter:image"]')
  );

  const url =
    resolveUrl(sourceUrl, getMetaContent('meta[property="og:url"]')) ||
    sourceUrl;

  const siteName = getMetaContent('meta[property="og:site_name"]') || '';

  return { title, description, image, url, siteName };
}

/**
 * 프록시 서비스 설정
 * - buildUrl: 타겟 URL로 프록시 요청 URL을 만드는 함수
 * - extractHtml: 프록시 응답에서 순수 HTML을 추출하는 함수
 */
// const proxyServices = [
//   // {
//   //   name: 'CORSProxy.io',
//   //   buildUrl: (targetUrl: string) =>
//   //     `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`,
//   //   extractHtml: (response: AxiosResponse) => response.data,
//   // },
//   // TODO: 2개까지 보낼 필요 없어서 일단 주석처리
//   {
//     name: 'AllOrigins',
//     buildUrl: (targetUrl: string) =>
//       `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`,
//     extractHtml: (response: AxiosResponse) => response.data?.contents,
//   },
// ];
const proxyServices = [
  {
    name: 'Codetabs',
    buildUrl: (url: string) =>
      `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
    extractHtml: (res: AxiosResponse) => res.data,
  },
];

/**
 * 주어진 URL에서 OG 데이터를 가져옵니다.
 * 여러 CORS 프록시를 동시에 시도하여 가장 먼저 성공한 결과를 사용합니다.
 */
export async function fetchOGData(
  inputUrl: string,
  timeout = 10000
): Promise<OGData> {
  let targetUrl = inputUrl.trim();
  if (!targetUrl.startsWith('http')) {
    targetUrl = `https://${targetUrl}`;
  }

  // 각 프록시에 대한 비동기 요청 Promise 배열을 생성
  const fetchPromises = proxyServices.map((proxy) =>
    axios.get(proxy.buildUrl(targetUrl), { timeout }).then((response) => {
      const html = proxy.extractHtml(response);
      if (typeof html !== 'string' || html.length < 100) {
        // 유효하지 않은 HTML 응답은 실패로 간주
        throw new Error(`${proxy.name} returned invalid content.`);
      }
      return html;
    })
  );

  try {
    // 가장 먼저 성공하는 프록시의 HTML 결과를 기다립니다.
    const html = await Promise.any(fetchPromises);
    // 성공한 HTML을 파싱하여 OG 데이터를 반환합니다.
    return parseOgData(html, targetUrl);
  } catch (error) {
    // 모든 프록시가 실패한 경우
    console.error('All proxy services failed.', error);
    throw new Error(
      '페이지 메타 정보를 가져올 수 없습니다. URL을 확인해주세요.'
    );
  }
}
