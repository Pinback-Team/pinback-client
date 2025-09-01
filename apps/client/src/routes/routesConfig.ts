export const ROUTES_CONFIG = {
  remind: {
    title: '리마인드',
    path: '/',
  },
  myBookmarks: {
    title: '나의 북마크',
    path: '/my-bookmarks',
  },
  category: {
    title: '카테고리',
    path: (id: string) => `/category/${id}`,
  },
  level: {
    title: '레벨',
    path: '/level',
  },
  onBoarding: {
    title: '온보딩',
    path: '/onBoarding',
  },
};
