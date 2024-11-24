import React from 'react';

import Hero from './components/hero';
import Footer from './components/Footer';
import BentoGrid from './components/BentoGrid';
import WeTextSection from './components/WeTextSection';

export default function Home() {
  return (
  <div>
    <Hero/>
    <BentoGrid />
    <WeTextSection />
    <Footer/>
  </div>
  );
}

