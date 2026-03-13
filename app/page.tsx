import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Lineup from '@/components/Lineup';
import Agenda from '@/components/Agenda';
import Location from '@/components/Location';
import Tickets from '@/components/Tickets';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="w-full">
      <Header />
      <Hero />
      <Lineup />
      <Agenda />
      <Location />
      <Tickets />
      <Footer />
    </main>
  );
}
