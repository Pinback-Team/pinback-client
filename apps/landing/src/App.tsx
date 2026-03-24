import { useEffect, useRef } from 'react';
import './App.css';
import FeatureBookmarkSection from './components/FeatureBookmarkSection';
import FeatureReminderSection from './components/FeatureReminderSection';
import FeatureRewardSection from './components/FeatureRewardSection';
import FinalCTASection from './components/FinalCTASection';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ShareBookmarkSection from './components/ShareBookmarkSection';

function App() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const container = scrollRef.current;
      if (!container) return;

      // 현재 브라우저의 높이(1vh)를 기준으로 이동 거리 산정
      const pageHeight = window.innerHeight;

      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
        case ' ':
          e.preventDefault();
          container.scrollBy({ top: pageHeight, behavior: 'smooth' });
          break;
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          container.scrollBy({ top: -pageHeight, behavior: 'smooth' });
          break;
        default:
          break;
      }
    };

    // window에 이벤트 리스너 등록
    window.addEventListener('keydown', handleKeyDown);

    // 클린업 함수: 컴포넌트 언마운트 시 리스너 제거
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div
      ref={scrollRef}
      className="h-dvh snap-y snap-mandatory overflow-y-scroll scroll-smooth outline-none"
      tabIndex={0}
    >
      <Header />

      {/* 각 섹션들 */}
      <section className="h-dvh snap-start">
        <HeroSection />
      </section>

      <section className="h-dvh snap-start">
        <ShareBookmarkSection />
      </section>

      <section className="h-dvh snap-start">
        <FeatureBookmarkSection />
      </section>

      <section className="h-dvh snap-start">
        <FeatureReminderSection />
      </section>

      <section className="h-dvh snap-start">
        <FeatureRewardSection />
      </section>

      <section className="h-dvh snap-start">
        <FinalCTASection />
      </section>
    </div>
  );
}

export default App;
