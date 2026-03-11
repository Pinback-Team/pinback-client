import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { ROUTES_CONFIG } from '@routes/routesConfig';

export type SidebarTab = 'mybookmark' | 'remind' | 'level' | 'job-pins';

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

    if (path.startsWith(ROUTES_CONFIG.myBookmarks.path)) {
      setActiveTab('mybookmark');

      const id = searchParams.get('id');
      if (id) {
        setSelectedCategoryId(Number(id));
      } else {
        setSelectedCategoryId(null);
      }
    } else if (
      path === ROUTES_CONFIG.remind.path ||
      path.startsWith('/remind')
    ) {
      setActiveTab('remind');
      setSelectedCategoryId(null);
    } else if (path.startsWith(ROUTES_CONFIG.level.path)) {
      setActiveTab('level');
      setSelectedCategoryId(null);
    } else if (path.startsWith(ROUTES_CONFIG.jobPins.path)) {
      setActiveTab('job-pins');
      setSelectedCategoryId(null);
    }
  }, [location.pathname, searchParams]);

  const goRemind = useCallback(() => {
    setActiveTab('remind');
    setSelectedCategoryId(null);
    navigate(ROUTES_CONFIG.remind.path);
  }, [navigate]);

  const goBookmarks = useCallback(() => {
    setActiveTab('mybookmark');
    setSelectedCategoryId(null);
    navigate(ROUTES_CONFIG.myBookmarks.path);
  }, [navigate]);

  const selectCategory = useCallback(
    (id: number, name: string) => {
      setActiveTab('mybookmark');
      setSelectedCategoryId(id);
      navigate(`${ROUTES_CONFIG.myBookmarks.path}?id=${id}&category=${name}`);
    },
    [navigate]
  );

  const goLevel = useCallback(() => {
    setActiveTab('level');
    setSelectedCategoryId(null);
    navigate(ROUTES_CONFIG.level.path);
  }, [navigate]);

  const goJobPins = useCallback(() => {
    setActiveTab('job-pins');
    setSelectedCategoryId(null);
    navigate(ROUTES_CONFIG.jobPins.path);
  }, [navigate]);

  return {
    activeTab,
    selectedCategoryId,
    goRemind,
    goBookmarks,
    selectCategory,
    goLevel,
    goJobPins,
    setSelectedCategoryId,
    setActiveTab,
  };
}
