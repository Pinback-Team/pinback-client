import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';

export type SidebarTab = 'mybookmark' | 'remind' | 'level';

export function useSidebarNav() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<SidebarTab>('remind');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );

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
