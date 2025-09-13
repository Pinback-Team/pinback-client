import { fetchOGData } from '@shared/utils/fetchOgData';
import { useEffect, useState } from 'react';

export interface PageMeta {
  url: string;
  title: string;
  description: string;
  imgUrl: string;
}

export const usePageMeta = (url: string) => {
  // 컴포넌트에서 사용할 상태들
  const [meta, setMeta] = useState<PageMeta>({
    url: '',
    title: '',
    description: '',
    imgUrl: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // URL이 유효하지 않으면 아무 작업도 하지 않음
    if (!url || url.trim().length < 5) {
      // 초기 상태로 리셋
      setMeta({ url: '', title: '', description: '', imgUrl: '' });
      return;
    }

    const getOgData = async () => {
      setLoading(true);
      setError(null);
      try {
        const ogData = await fetchOGData(url);

        // fetchOGData의 결과(OGData)를 컴포넌트에서 사용할 형태(PageMeta)로 변환
        setMeta({
          url: ogData.url,
          title: ogData.title,
          description: ogData.description,
          imgUrl: ogData.image, // `image`를 `imgUrl`로 매핑
        });
      } catch (err: any) {
        setError(err.message || '알 수 없는 에러가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    getOgData();
  }, [url]); // url이 변경될 때마다 이 useEffect는 다시 실행됩니다.

  // 훅의 결과물로 상태와 관련된 값들을 객체로 반환
  return { meta, loading, error };
};
