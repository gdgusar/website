"use client";
import { Suspense } from "react";
import {
  AboutUs,
  Belt,
  BentoGrid,
  Event,
  Footer,
  Hero,
  OurTeam,
  Parallax,
  ScrambleText,
  WeTextSection,
} from "./components";
import Preloader from "./components/Preloader";



export default function Home() {
  return (
    <>
      {/* Preloader outside of Suspense */}
      <Preloader />

      <Suspense fallback={null}>
        <main className="relative z-10">
          <section className="h-screen w-full">
            <Hero />
          </section>

          <section>
            <AboutUs />
          </section>

          <section>
            <Belt />
          </section>

          <section className="container mx-auto">
            <BentoGrid />
          </section>

          <section>
            <Belt />
          </section>

          <section className="container mx-auto">
            <WeTextSection />
          </section>

          <section>
            <Parallax />
          </section>

          <section>
            <OurTeam />
          </section>

          <section>
            <Event />
          </section>

          <section className="container mx-auto">
            <ScrambleText />
          </section>
        </main>
        <Footer />
      </Suspense>
    </>
  );
}
