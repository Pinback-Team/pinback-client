import { analytics } from '@pinback/analytics';
import { ROUTES_CONFIG } from '@routes/routesConfig';
import { useGetHasJob } from '@shared/apis/queries';
import JobSelectionFunnel from '@shared/components/jobSelectionFunnel/JobSelectionFunnel';
import { Sidebar } from '@shared/components/sidebar/Sidebar';
import { authStorage } from '@shared/utils/authStorage';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();
  const queryClient = useQueryClient();

  // TODO: 유저 프로퍼티 추가 시 전용 API + AmplitudeProvider 패턴으로 리팩토링 필요
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const jobRole = authStorage.getJobRole();
    if (userId) {
      analytics.identify(userId, jobRole ? { job_role: jobRole } : undefined);
    }
  }, []);

  const isPolicyPage =
    location.pathname === ROUTES_CONFIG.privacyPolicy.path ||
    location.pathname === ROUTES_CONFIG.termsOfService.path;

  const isAuthPage =
    location.pathname.startsWith(ROUTES_CONFIG.onboarding.path) ||
    location.pathname.startsWith(ROUTES_CONFIG.login.path) ||
    location.pathname.startsWith(ROUTES_CONFIG.onboardingCallback.path);

  const isSidebarHidden = isAuthPage || isPolicyPage;
  const isLoggedIn = authStorage.hasAccessToken();

  const { data: hasJobData, isLoading: isHasJobLoading } = useGetHasJob(
    isLoggedIn && !isAuthPage
  );

  const shouldShowJobSelectionFunnel =
    isLoggedIn &&
    !isAuthPage &&
    !isPolicyPage &&
    !isHasJobLoading &&
    hasJobData?.hasJob === false;

  return (
    <>
      <div className="flex h-screen">
        {!isSidebarHidden && <Sidebar />}
        <main className="bg-gray-bg flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
      {shouldShowJobSelectionFunnel && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/40 p-4">
          <JobSelectionFunnel
            onComplete={() => {
              queryClient.invalidateQueries({ queryKey: ['hasJob'] });
            }}
          />
        </div>
      )}
    </>
  );
};

export default Layout;
