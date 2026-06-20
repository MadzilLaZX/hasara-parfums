import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import FeaturedCollections from "@/components/sections/FeaturedCollections";
import BrandStory from "@/components/sections/BrandStory";
import BestSellers from "@/components/sections/BestSellers";
import WhyHasara from "@/components/sections/WhyHasara";
import Reviews from "@/components/sections/Reviews";
import InstagramGallery from "@/components/sections/InstagramGallery";
import ContactSection from "@/components/sections/ContactSection";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import ScratchCard from "@/components/ui/ScratchCard";
import FAQSection from "@/components/sections/FAQSection";
import TesterSection from "@/components/sections/TesterSection";

export default function Home() {
  return (
    <main className="overflow-x-hidden w-full max-w-full">
      <ScratchCard />
      <Navbar />
      <HeroSection />
      <FeaturedCollections />
      <BestSellers />
      <TesterSection />
      <BrandStory />
      <WhyHasara />
      <FAQSection />
      <Reviews />
      <InstagramGallery />
      <ContactSection />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
