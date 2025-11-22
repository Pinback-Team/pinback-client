import apiRequest from '@shared/apis/setting/axiosInstance';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (!code) {
      alert('로그인 실패. 다시 시도해주세요.');
      navigate('/onboarding?step=3');
      return;
    }

    loginWithCode(code);
  }, []);

  const loginWithCode = async (code: string) => {
    try {
      const res = await apiRequest.post('/api/v2/auth/google', {
        code,
      });
      console.log(res);
      const { isUser, userId, email, accessToken } = res.data.data;
      console.log({ isUser, userId, email, accessToken });
      // 공통 저장
      localStorage.setItem('email', email);
      localStorage.setItem('userId', userId);

      if (isUser) {
        // 기존 유저
        localStorage.setItem('token', accessToken);
        navigate('/');
      } else {
        // 신규 유저
        navigate('/onboarding?step=4');
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      alert('로그인 중 오류가 발생했습니다.');
      navigate('/onboarding?step=3');
    }
  };
  //TODO: 로딩 컴포넌트로 교체
  return (
    <div className="flex h-screen items-center justify-center">
      로그인 처리 중...
    </div>
  );
};

export default GoogleCallback;
