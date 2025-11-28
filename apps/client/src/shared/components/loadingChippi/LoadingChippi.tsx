import chippi from '@/assets/chippi_x.svg';

export default function LoadingChippi({ className }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg className="absolute h-[18rem] w-[18rem]" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="spinnerGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00b76b" />
            <stop offset="100%" stopColor="#e0f6ed" />
          </linearGradient>
        </defs>

        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="#E5E7EB"
          strokeWidth="5"
          fill="none"
        />

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
  );
}
