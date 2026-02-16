import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Premium Web Design"
        description="Devansh Digital Studio is a boutique design agency specializing in premium, high-converting websites for cafes, salons, restaurants, and modern businesses."
      />
      <Navbar />
      <Hero />
      <div id="services"><Services /></div>
      <WhyUs />
      <div id="process"><Process /></div>
      <div id="pricing"><Pricing /></div>
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
