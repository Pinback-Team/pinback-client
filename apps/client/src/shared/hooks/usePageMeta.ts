import { fetchOGData } from '@shared/utils/fetchOgData';
import { useEffect, useState } from 'react';

export interface PageMeta {
  url: string;
  title: string;
  description: string;
  imgUrl: string;
}

export const usePageMeta = (url: string) => {
  const [meta, setMeta] = useState<PageMeta>({
    url: '',
    title: '',
    description: '',
    imgUrl: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url || url.trim().length < 5) {
      setMeta({ url: '', title: '', description: '', imgUrl: '' });
      return;
    }

    const getOgData = async () => {
      setLoading(true);
      setError(null);
      try {
        const ogData = await fetchOGData(url);

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
  }, [url]);

  return { meta, loading, error };
};
