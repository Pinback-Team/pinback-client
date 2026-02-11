import type { Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    // 익스텐션 관련
    './popup/**/*.{js,ts,jsx,tsx,html}',
    './extension/**/*.{js,ts,jsx,tsx,html}',

    // 디자인 시스템 & 공용 Tailwind
    './node_modules/@pinback/design-system/**/*.{js,ts,jsx,tsx}',
    './node_modules/@pinback/tailwind-config/**/*.{js,ts,jsx,tsx,css}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
