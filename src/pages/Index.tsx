import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import ScrollingMarquee from "@/components/ScrollingMarquee";
import ParallaxDivider from "@/components/ParallaxDivider";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Premium Web Design"
        description="Devansh Digital Studio is a boutique design agency specializing in premium, high-converting websites for cafes, salons, restaurants, and modern businesses."
      />
      <Navbar />
      <Hero />

      {/* Marquee between Hero & Services */}
      <ScrollingMarquee className="bg-background border-y border-white/5" />

      <div id="services"><Services /></div>

      {/* Parallax divider between Services & WhyUs */}
      <ParallaxDivider variant="dots" />

      <WhyUs />

      {/* Parallax divider between WhyUs & Process */}
      <ParallaxDivider variant="orbs" />

      <div id="process"><Process /></div>

      {/* Marquee (reverse direction) between Process & Pricing */}
      <ScrollingMarquee
        reverse
        className="bg-background border-y border-white/5"
        items={[
          "5–7 Day Delivery",
          "✦",
          "No Templates",
          "✦",
          "WhatsApp Ready",
          "✦",
          "Google Optimized",
          "✦",
          "Conversion Focused",
          "✦",
          "Mobile Perfect",
          "✦",
        ]}
      />

      <div id="pricing"><Pricing /></div>

      {/* Parallax divider between Pricing & Testimonials */}
      <ParallaxDivider variant="lines" />

      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
