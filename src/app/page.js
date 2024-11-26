import React from 'react';

import Hero from './components/hero';
import BentoGrid from './components/BentoGrid';
import WeTextSection from './components/WeTextSection';
import Parallax from './components/parallax';


export default function Home() {
  return (
    <div className="relative">

      {/* Main content */}
      <div className="relative min-h-screen">
        <main className="relative z-10">
          <section className="h-screen">
            <Hero />
          </section>

          <section>
            <BentoGrid />
          </section>

          <section>
            <WeTextSection />
          </section>

          <section>
            <Parallax/>
          </section>

        </main>
      </div>
    </div>
  );
}

