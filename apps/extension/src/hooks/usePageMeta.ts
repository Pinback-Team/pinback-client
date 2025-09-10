import { useEffect, useState } from 'react';
import { OgImageFetcher } from '@utils/OGFetch';

export interface PageMeta {
  url: string;
  title: string;
  description: string;
  imgUrl: string;
}

export const usePageMeta = () => {
  const [meta, setMeta] = useState<PageMeta>({
    url: '',
    title: '',
    description: '',
    imgUrl: '',
  });

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const activeTab = tabs[0];
      if (!activeTab?.url) return;

      const currentUrl = activeTab.url;

      chrome.storage.local.set({ bookmarkedUrl: currentUrl });

      const imageUrl = await OgImageFetcher({ url: currentUrl });
      // 개발중에는 잠시 주석처리
      //   const isInternalChromePage =
      //     /^chrome:\/\//.test(currentUrl) ||
      //     /^edge:\/\//.test(currentUrl) ||
      //     /^about:/.test(currentUrl);
      //   // chrome-extension:// 은 내부 페이지로 취급하지 않음

      //   if (isInternalChromePage || !imageUrl?.title) {
      //     window.close();
      //     return;
      //   }

      const newMeta = {
        url: currentUrl,
        title: imageUrl.title ?? '',
        description: imageUrl.description ?? '',
        imgUrl: imageUrl.image ?? '',
      };

      setMeta(newMeta);

      chrome.storage.local.set({ titleSave: newMeta.title });
    });
  }, []);

  return meta;
};
