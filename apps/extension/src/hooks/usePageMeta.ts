import { useEffect, useState } from 'react';
import { OgImageFetcher } from '@utils/OGFetch';

export interface PageMeta {
  url: string;
  title: string;
  description: string;
  imgUrl: string;
}

const getOgMeta = async (url: string) => {
  const imageUrl = await OgImageFetcher({ url });
  return {
    url,
    title: imageUrl?.title ?? '',
    description: imageUrl?.description ?? '',
    imgUrl: imageUrl?.image ?? '',
  };
};

export const usePageMeta = () => {
  const [meta, setMeta] = useState<PageMeta>({
    url: '',
    title: '',
    description: '',
    imgUrl: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const activeTab = tabs[0];
      if (!activeTab?.url) {
        setLoading(false);
        return;
      }

      const currentUrl = activeTab.url;

      chrome.storage.local.set({ bookmarkedUrl: currentUrl });
      const newMeta = await getOgMeta(currentUrl);
      // 개발중에는 잠시 주석처리
      //   const isInternalChromePage =
      //     /^chrome:\/\//.test(currentUrl) ||
      //     /^edge:\/\//.test(currentUrl) ||
      //     /^about:/.test(currentUrl);
      //   // chrome-extension:// 은 내부 페이지로 취급하지 않음

      //   if (isInternalChromePage || !imageUrl?.title) {
      //
      //     return;
      //   }
      setMeta(newMeta);
      setLoading(false);

      chrome.storage.local.set({ titleSave: newMeta.title });
    });
  }, []);

  return { ...meta, loading };
};
