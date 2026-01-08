export const handleGoogleLogin = () => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const redirectUri = import.meta.env.PROD
    ? import.meta.env.VITE_GOOGLE_REDIRECT_URI_PROD
    : import.meta.env.VITE_GOOGLE_REDIRECT_URI_DEV;

  if (!clientId || !redirectUri) {
    alert('Google OAuth 설정이 누락되었습니다.');
    return;
  }
  const googleAuthUrl =
    `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${clientId}` +
    `&redirect_uri=${redirectUri}` +
    `&response_type=code` +
    `&scope=email profile`;

  window.location.href = googleAuthUrl;
};
