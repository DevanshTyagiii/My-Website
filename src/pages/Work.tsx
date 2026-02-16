import Navbar from "@/components/Navbar";
import Portfolio from "@/components/Portfolio";
import Footer from "@/components/Footer";
import AmbientWaveBackground from "@/components/AmbientWaveBackground";
import { SEO } from "@/components/SEO";

const Work = () => {
    return (
        <div className="min-h-screen bg-background relative">
            <AmbientWaveBackground />
            <SEO
                title="Our Work"
                description="Explore our portfolio of premium websites designed for modern businesses. See how we help brands stand out."
                canonical="https://devanshstudio.online/work"
            />
            <Navbar />
            <div className="pt-20"> {/* Add padding for fixed navbar */}
                <Portfolio />
            </div>
            <Footer />
        </div>
    );
};

export default Work;
