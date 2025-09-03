import { useLocation, matchPath } from 'react-router-dom';

export function useSidebarActive() {
  const { pathname } = useLocation();

  const isRemindActive =
    matchPath({ path: '/', end: true }, pathname) ||
    !!matchPath('/remind/*', pathname);

  const isBookmarkActive =
    !!matchPath('/my-bookmarks', pathname) ||
    !!matchPath('/my-bookmarks/*', pathname);

  // ToDo: mypage 추가

  return {
    isRemindActive: !!isRemindActive,
    isBookmarkActive: !!isBookmarkActive,
  };
}
