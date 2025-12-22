import apiRequest from '@shared/apis/setting/axiosInstance';
import LoadingChippi from '@shared/components/loadingChippi/LoadingChippi';
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
    accessToken: string | undefined
  ) => {
    if (isUser) {
      if (accessToken) {
        localStorage.setItem('token', accessToken);

        if (typeof chrome !== 'undefined' && chrome.storage?.local) {
          chrome.storage.local.set({ token: accessToken }, () => {
            console.log('Token saved to chrome storage');
          });
        }
      }

      navigate('/');
    } else {
      navigate('/onboarding?step=ALARM');
    }
  };

  const loginWithCode = async (code: string) => {
    try {
      const res = await apiRequest.post('/api/v2/auth/google', { code });
      const { isUser, userId, email, accessToken } = res.data.data;

      localStorage.setItem('email', email);
      localStorage.setItem('userId', userId);

      handleUserLogin(isUser, accessToken);
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
