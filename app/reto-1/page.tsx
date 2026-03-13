'use client';

import ManifoldAnimation from '@/components/ManifoldAnimation';
import FestivalHero from '@/components/FestivalHero';
import FestivalLineup from '@/components/FestivalLineup';
import FestivalAgenda from '@/components/FestivalAgenda';
import FestivalLocation from '@/components/FestivalLocation';
import FestivalTickets from '@/components/FestivalTickets';
import FestivalFooter from '@/components/FestivalFooter';

export default function Festival() {
  return (
    <main className="bg-bone">
      <ManifoldAnimation />
      <FestivalHero />
      <FestivalLineup />
      <FestivalAgenda />
      <FestivalLocation />
      <FestivalTickets />
      <FestivalFooter />
    </main>
  );
}
