import Navbar from "@/components/shared/Navbar";
import LuxuryPerfumeHero from "@/components/home/HeroSection";
import Features from "@/components/home/Features";


const HomePage = () => {
    return (
        <>
        <Navbar />
        {/* HeroSection  */}
        <LuxuryPerfumeHero />
        {/* Features */}
        <Features />
        </>
    );
};

export default HomePage;