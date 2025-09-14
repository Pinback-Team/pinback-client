interface SaveBookmarkParams {
  url: string;
  title: string;
  description: string;
  imgUrl: string;
  memo: string;
  isRemindOn: boolean;
  selectedCategory: string | null;
  date: string | null;
  time: string | null;
}

export const useSaveBookmark = () => {
  const save = async (params: SaveBookmarkParams) => {
    try {
      const saveData = {
        ...params,
        createdAt: new Date().toISOString(),
      };

      const result = await new Promise<{ bookmarks?: any[] }>((resolve) => {
        chrome.storage.local.get(['bookmarks'], (items) => resolve(items));
      });

      const bookmarks = result.bookmarks || [];
      bookmarks.push(saveData);

      await new Promise<void>((resolve) => {
        chrome.storage.local.set({ bookmarks }, resolve);
      });

      chrome.bookmarks.create(
        {
          parentId: '1',
          title: params.title || params.url,
          url: params.url,
        },
        (newBookmark) => {
          console.log('크롬 북마크바에 저장 완료: ', newBookmark);
        }
      );
      //window.close();
    } catch (error) {
      console.error('저장 중 오류:', error);
    }
  };

  return { save };
};
