import FeatureBookmarkSection from './FeatureBookmarkSection';
import FeatureReminderSection from './FeatureReminderSection';
import FeatureRewardSection from './FeatureRewardSection';
import FinalCTASection from './FinalCTASection';
import HeroSection from './HeroSection';
import ShareBookmarkSection from './ShareBookmarkSection';

const Contents = () => {
  return (
    <>
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
    </>
  );
};

export default Contents;
