import React from 'react';

import Hero from './components/hero';
import Scene from './components/Scene';
import BentoGrid from './components/BentoGrid';
import WeTextSection from './components/WeTextSection';

export default function Home() {
  return (
  <div>
    <Hero />
    <BentoGrid />
    <WeTextSection />
  </div>
    
  );
}

