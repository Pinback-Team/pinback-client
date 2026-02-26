import { useId } from 'react';

const JobPinsBottomSpinner = () => {
  const gradientId = useId();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      className="animate-spin-smooth h-[3rem] w-[3rem]"
    >
      <circle cx="15" cy="15" r="13" stroke="#E5E7EB" strokeWidth="4" />
      <circle
        cx="15"
        cy="15"
        r="13"
        stroke={`url(#${gradientId})`}
        strokeWidth="4"
        strokeDasharray="46 120"
        strokeLinecap="round"
      />
      <defs>
        <radialGradient
          id={gradientId}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(13 9.75) rotate(122.975) scale(20.3637)"
        >
          <stop stopColor="var(--color-gradient-start, #cff080)" />
          <stop offset="1" stopColor="var(--color-gradient-end, #33d08f)" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export default JobPinsBottomSpinner;
