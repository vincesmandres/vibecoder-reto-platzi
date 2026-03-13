import ProfileSection from '@/components/ProfileSection';
import RetosSection from '@/components/RetosSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="flex flex-col lg:flex-row">
        {/* Left side - Fixed profile */}
        <aside className="lg:fixed lg:left-0 lg:top-0 lg:w-1/3 lg:h-screen bg-background border-b-2 lg:border-b-0 lg:border-r-2 border-charcoal flex items-center justify-center">
          <ProfileSection />
        </aside>

        {/* Right side - Scrollable retos */}
        <section className="lg:ml-[33.333%] lg:w-2/3 min-h-screen">
          <RetosSection />
        </section>
      </div>
    </main>
  );
}
