import { BlankBanner } from "@/components/home/blank-banner";
import { CategoryPillars } from "@/components/home/category-pillars";
import { ContactStrip } from "@/components/home/contact-strip";
import { DesignStudio } from "@/components/home/design-studio";
import { DtfHub } from "@/components/home/dtf-hub";
import { FeaturedProducts } from "@/components/home/featured-products";
import { Hero } from "@/components/home/hero";
import { Membership } from "@/components/home/membership";
import { ValueProps } from "@/components/home/value-props";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryPillars />
      <ValueProps />
      <DtfHub />
      <BlankBanner />
      <FeaturedProducts />
      <DesignStudio />
      <Membership />
      <ContactStrip />
    </>
  );
}
