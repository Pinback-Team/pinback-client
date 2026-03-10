import apiRequest from '@shared/apis/setting/axiosInstance';
import LoadingChippi from '@shared/components/loadingChippi/LoadingChippi';
import { authStorage } from '@shared/utils/authStorage';
import { extensionBridge } from '@shared/utils/extensionBridge';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const GoogleCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');

    if (!code) {
      alert('로그인 실패. 다시 시도해주세요.');
      navigate('/onboarding?step=SOCIAL_LOGIN');
      return;
    }

    loginWithCode(code);
  }, []);

  const handleUserLogin = (
    isUser: boolean,
    accessToken: string | null,
    refreshToken: string | null,
    hasJob?: boolean
  ) => {
    if (isUser) {
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
      navigate('/');
    } else {
      navigate('/onboarding?step=JOB');
    }
  };

  const redirectUri = import.meta.env.PROD
    ? import.meta.env.VITE_GOOGLE_REDIRECT_URI_PROD
    : import.meta.env.VITE_GOOGLE_REDIRECT_URI_DEV;

  const loginWithCode = async (code: string) => {
    try {
      const res = await apiRequest.post(
        '/api/v3/auth/google',
        {
          code,
          uri: redirectUri,
        },
        {
          withCredentials: true,
        }
      );

      const { isUser, userId, email, accessToken, refreshToken, hasJob } =
        res.data.data;

      authStorage.setUserIdentity(email, userId);

      handleUserLogin(isUser, accessToken, refreshToken, hasJob);
    } catch (error) {
      console.error('로그인 오류:', error);
      navigate('/onboarding?step=SOCIAL_LOGIN');
    }
  };

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
