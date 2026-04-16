import { CategoryPillars } from "@/components/home/category-pillars";
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
      <DtfHub />
      <FeaturedProducts />
      <DesignStudio />
      <Membership />
      <ValueProps />
    </>
  );
}
