import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <div id="services"><Services /></div>
      <WhyUs />
      <div id="work"><Portfolio /></div>
      <div id="process"><Process /></div>
      <div id="pricing"><Pricing /></div>
      <Testimonials />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
