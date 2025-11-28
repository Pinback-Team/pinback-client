import chippi from '@/assets/chippi_x.svg';

export default function LoadingChippi() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8">
      <div className="relative flex items-center justify-center">
        <svg className="absolute h-[18rem] w-[18rem]" viewBox="0 0 100 100">
          {/* Gradient 정의 */}
          <defs>
            <linearGradient id="spinnerGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00b76b" />
              <stop offset="100%" stopColor="#e0f6ed" />
            </linearGradient>
          </defs>

          {/* 회색 가이드 원 */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#E5E7EB"
            strokeWidth="5"
            fill="none"
          />

          {/* 그라디언트 스피너 */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="url(#spinnerGradient)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="75 999"
            fill="none"
            className="animate-spin-smooth origin-center"
          />
        </svg>

        <img
          src={chippi}
          alt="loading chippi"
          className="relative z-10 h-[14rem] w-[14rem]"
        />
      </div>

      <p className="text-font-black-2 text-[2rem] font-semibold">
        잠시만 기다려주세요…
      </p>
    </div>
  );
}
