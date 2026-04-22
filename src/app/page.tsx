import Hero from '@/components/Hero';
import RSVP from '@/components/RSVP';
import Countdown from '@/components/Countdown';
import PersonalMessage from '@/components/PersonalMessage';
import EventDetails from '@/components/EventDetails';
import Footer from '@/components/Footer';
import FallingParticles from '@/components/FallingParticles';

export default function Home() {
  return (
    <>
      <FallingParticles />
      <main className="min-h-screen relative" style={{ zIndex: 1 }}>
        <Hero />
        <PersonalMessage />
        <RSVP />
        <EventDetails />
        <Countdown />
        <Footer />
      </main>
    </>
  );
}
