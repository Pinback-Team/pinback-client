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
  onBoardingCallback: {
    title: '구글 OAuth 콜백',
    path: '/onboarding/callback',
  },
  login: {
    title: '로그인',
    path: '/login',
  },
  privacyPolicy: {
    title: '개인정보처리방침',
    path: '/policy',
  },
  termsOfService: {
    title: '이용약관',
    path: '/terms',
  },
};
