import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

export type SidebarTab = 'mybookmark' | 'remind' | 'level';

export function useSidebarNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [activeTab, setActiveTab] = useState<SidebarTab>('remind');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );

  useEffect(() => {
    const path = location.pathname;

    if (path.startsWith('/my-bookmarks')) {
      setActiveTab('mybookmark');

      const id = searchParams.get('id');
      if (id) {
        setSelectedCategoryId(Number(id));
      } else {
        setSelectedCategoryId(null);
      }
    } else if (path === '/' || path.startsWith('/remind')) {
      setActiveTab('remind');
      setSelectedCategoryId(null);
    } else if (path.startsWith('/level')) {
      setActiveTab('level');
      setSelectedCategoryId(null);
    }
  }, [location.pathname, searchParams]);

  const goRemind = useCallback(() => {
    setActiveTab('remind');
    setSelectedCategoryId(null);
    navigate('/');
  }, [navigate]);

  const goBookmarks = useCallback(() => {
    setActiveTab('mybookmark');
    setSelectedCategoryId(null);
    navigate('/my-bookmarks');
  }, [navigate]);

  const selectCategory = useCallback(
    (id: number, name: string) => {
      setActiveTab('mybookmark');
      setSelectedCategoryId(id);
      navigate(`/my-bookmarks?id=${id}&category=${name}`);
    },
    [navigate]
  );

  const goLevel = useCallback(() => {
    setActiveTab('level');
    setSelectedCategoryId(null);
    navigate('/level');
  }, [navigate]);

  return {
    activeTab,
    selectedCategoryId,
    goRemind,
    goBookmarks,
    selectCategory,
    goLevel,
    setSelectedCategoryId,
    setActiveTab,
  };
}
