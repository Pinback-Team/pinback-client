import apiRequest from '@shared/apis/setting/axiosInstance';
import LoadingChippi from '@shared/components/loadingChippi/LoadingChippi';
import { authStorage } from '@shared/utils/authStorage';
import { extensionBridge } from '@shared/utils/extensionBridge';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI;

const GoogleCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const saveSession = (params: {
    accessToken: string | null;
    refreshToken: string | null;
    email: string;
    userId: string;
    hasJob?: boolean;
  }) => {
    const { accessToken, refreshToken, email, userId, hasJob } = params;

    authStorage.setUserIdentity(email, userId);

    if (accessToken) {
      authStorage.setAccessToken(accessToken);
      extensionBridge.syncToken(accessToken);
    }

    if (refreshToken) {
      authStorage.setRefreshToken(refreshToken);
    }

    if (typeof hasJob === 'boolean') {
      authStorage.setHasJob(hasJob);
    }
  };

  const loginWithCode = async (code: string) => {
    try {
      const res = await apiRequest.post(
        '/api/v3/auth/google',
        { code, uri: REDIRECT_URI },
        { withCredentials: true }
      );

      const { isUser, userId, email, accessToken, refreshToken, hasJob } =
        res.data.data;

      saveSession({ accessToken, refreshToken, email, userId, hasJob });
      queryClient.invalidateQueries({ queryKey: ['amplitudeUserProperties'] });

      navigate(isUser ? '/' : '/onboarding?step=JOB');
    } catch (error) {
      console.error('로그인 오류:', error);
      navigate('/onboarding?step=SOCIAL_LOGIN');
    }
  };

  useEffect(() => {
    const code = searchParams.get('code');

    if (!code) {
      alert('로그인 실패. 다시 시도해주세요.');
      navigate('/onboarding?step=SOCIAL_LOGIN');
      return;
    }

    loginWithCode(code);
  }, []);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <LoadingChippi className="mb-6" />
      <p className="text-font-black-2 head3 mt-[1.6rem]">
        잠시만 기다려주세요…
      </p>
      <p className="body1-m text-font-gray-3 text-center">
        치삐가 로그인 중입니다
      </p>
    </div>
  );
};

export default GoogleCallback;
