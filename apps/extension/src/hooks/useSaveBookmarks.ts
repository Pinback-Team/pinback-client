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

      // --- 기존 북마크 local 저장
      const result = await new Promise<{ bookmarks?: any[] }>((resolve) => {
        chrome.storage.local.get(['bookmarks'], (items) => resolve(items));
      });

      const bookmarks = result.bookmarks || [];
      bookmarks.push(saveData);

      await new Promise<void>((resolve) => {
        chrome.storage.local.set({ bookmarks }, resolve);
      });

      // --- 📂 'PinBack' 폴더 찾기
      const pinbackFolder =
        await new Promise<chrome.bookmarks.BookmarkTreeNode | null>(
          (resolve) => {
            chrome.bookmarks.search({ title: 'PinBack' }, (results) => {
              const folder = results.find((r) => r.url === undefined); // 폴더만
              resolve(folder || null);
            });
          }
        );

      // --- 📂 폴더 없으면 '기타 북마크(3)' 아래 새로 만들기
      const folderId = pinbackFolder
        ? pinbackFolder.id
        : await new Promise<string>((resolve, reject) => {
            chrome.bookmarks.create(
              {
                parentId: '2', // 기타 북마크
                title: 'PinBack',
              },
              (newFolder) => {
                if (chrome.runtime.lastError) {
                  reject(chrome.runtime.lastError);
                  return;
                }
                console.log('새 폴더 생성됨 👉', newFolder);
                resolve(newFolder.id);
              }
            );
          });

      // --- 📑 북마크 생성
      await new Promise<void>((resolve, reject) => {
        chrome.bookmarks.create(
          {
            parentId: folderId,
            title: params.title || params.url,
            url: params.url,
          },
          (newBookmark) => {
            if (chrome.runtime.lastError) {
              reject(chrome.runtime.lastError);
              return;
            }
            console.log('📌 PinBack 폴더에 북마크 저장 완료:', newBookmark);
            resolve();
          }
        );
      });

      // window 닫기
      // window.close();
    } catch (error) {
      console.error('저장 중 오류:', error);
    }
  };

  return { save };
};
