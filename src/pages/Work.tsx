import Navbar from "@/components/Navbar";
import Portfolio from "@/components/Portfolio";
import Footer from "@/components/Footer";
import AmbientWaveBackground from "@/components/AmbientWaveBackground";

const Work = () => {
    return (
        <div className="min-h-screen bg-background relative">
            <AmbientWaveBackground />
            <Navbar />
            <div className="pt-20"> {/* Add padding for fixed navbar */}
                <Portfolio />
            </div>
            <Footer />
        </div>
    );
};

export default Work;
