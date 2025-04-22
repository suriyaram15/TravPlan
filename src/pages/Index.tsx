import HeroSection from "@/components/Home/HeroSection";
import TrendingSection from "@/components/Home/TrendingSection";
import OffersSection from "@/components/Home/OffersSection";
import FeaturesSection from "@/components/Home/FeaturesSection";
import TestimonialsSection from "@/components/Home/TestimonialsSection";
import CtaSection from "@/components/Home/CtaSection";

const Index = () => {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <TrendingSection />
      <OffersSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CtaSection />
    </div>
  );
};

export default Index;