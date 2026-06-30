import { Hero } from "@/components/hero";
import { BrandMarquee } from "@/components/brand-marquee";
import { FeaturedBrands } from "@/components/featured-brands";
import { HowItWorks } from "@/components/how-it-works";
import { AiFeatures } from "@/components/ai-features";
import { FeaturedCreators } from "@/components/featured-creators";
import { SuccessStories } from "@/components/success-stories";
import { Testimonials } from "@/components/testimonials";
import { Stats } from "@/components/stats";

export default function Home() {
  return (
    <div className="w-full flex flex-col">
      <Hero />
      <BrandMarquee />
      <FeaturedBrands />
      <HowItWorks />
      <AiFeatures />
      <FeaturedCreators />
      <SuccessStories />
      <Testimonials />
      <Stats />
    </div>
  );
}
