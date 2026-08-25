import { useEffect, useState } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedGallery from '@/components/FeaturedGallery';
import Gallery from '@/components/Gallery';
import Lightbox from '@/components/Lightbox';
import HorizontalStory from '@/components/HorizontalStory';
import VideoSection from '@/components/VideoSection';
import QuoteSection from '@/components/QuoteSection';
import About from '@/components/About';
import ContactCTA from '@/components/ContactCTA';
import Footer from '@/components/Footer';
import { useLenis } from '@/hooks/useLenis';

function App() {
  const [loaded, setLoaded] = useState(false);
  const [lightboxId, setLightboxId] = useState<number | null>(null);
  useLenis();

  useEffect(() => {
    if (!loaded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [loaded]);

  return (
    <div className="grain relative min-h-screen bg-ink-950 text-bone-100">
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
      <Navbar />
      <main>
        <Hero />
        <FeaturedGallery />
        <Gallery onOpen={(id) => setLightboxId(id)} />
        <HorizontalStory />
        <VideoSection />
        <QuoteSection />
        <About />
        <ContactCTA />
      </main>
      <Footer />
      <Lightbox
        id={lightboxId}
        onClose={() => setLightboxId(null)}
        onNavigate={(id) => setLightboxId(id)}
      />
    </div>
  );
}

export default App;
