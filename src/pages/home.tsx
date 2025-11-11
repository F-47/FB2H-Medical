import Features from "@/components/home/features";
import Hero from "@/components/home/hero";
import HowItWorks from "@/components/home/howItWorks";
import Testimonials from "@/components/home/testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      {/* <Cta /> */}
      {/* <TopDoctors />
      <HowItWorks />
      <Testimonials />
      <CTAFooter /> */}
    </>
  );
}
