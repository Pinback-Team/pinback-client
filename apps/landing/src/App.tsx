import './App.css';
import FeatureBookmarkSection from './components/FeatureBookmarkSection';
import FeatureReminderSection from './components/FeatureReminderSection';
import FeatureRewardSection from './components/FeatureRewardSection';
import FinalCTASection from './components/FinalCTASection';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ShareBookmarkSection from './components/ShareBookmarkSection';

function App() {
  return (
    <div className="h-dvh snap-y snap-mandatory overflow-y-scroll scroll-smooth">
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
