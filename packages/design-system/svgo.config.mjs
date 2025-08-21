export default {
  multipass: true,
  plugins: [
    // 기본 최적화 + viewBox 유지
    { name: 'preset-default', params: { overrides: { removeViewBox: false } } },
    // 루트 <svg>의 width/height 제거
    { name: 'removeDimensions' },
  ],
};
