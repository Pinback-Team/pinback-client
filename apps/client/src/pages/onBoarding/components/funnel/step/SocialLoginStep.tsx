const SocialLoginStep = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="mb-4 text-lg font-bold">소셜 로그인해주세요</h2>

      <button
        onClick={() => {
          // 원래 네 소셜 로그인 플로우로 이동하도록 수정
          window.location.href = `/social-login?nextStep=4`;
        }}
        className="rounded bg-blue-500 px-4 py-2 text-white"
      >
        구글 로그인
      </button>
    </div>
  );
};

export default SocialLoginStep;
