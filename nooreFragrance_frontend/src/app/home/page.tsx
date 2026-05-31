import Navbar from "@/components/shared/Navbar";
import LuxuryPerfumeHero from "@/components/home/HeroSection";
import Features from "@/components/home/Features";
import BrandNumbers from "@/components/home/BrandNumbers";
import Footer from "@/components/shared/Footer";


const HomePage = () => {
    return (
        <>
        <Navbar />
        {/* HeroSection  */}
        <LuxuryPerfumeHero />
        {/* Features */}
        <Features />
        {/* Brand Numbers */}
        <BrandNumbers />

        <Footer />
        </>
    );
};

export default HomePage;