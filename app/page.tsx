"use client";

import ScrollyCanvas from "./components/ScrollyCanvas";
import Overlay from "./components/Overlay";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Footer from "./components/Footer";
import SectionTransition from "./components/SectionTransition";
import CinematicBackground from "./components/CinematicBackground";
import WelcomeScreen from "./components/WelcomeScreen";
import { useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const introRef = useRef<HTMLElement>(null);
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <main className="min-h-screen text-[#ededed] relative">
      <AnimatePresence>
        {showWelcome && (
          <WelcomeScreen onFinish={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>

      {/* Fixed Background Layer */}
      <CinematicBackground />

      {/* Scroll Section */}
      <section id="home" ref={introRef} className="relative z-10">
        <Overlay containerRef={introRef} />
        <ScrollyCanvas />
      </section>

      {/* Content Section */}
      <SectionTransition id="projects">
        <Projects />
      </SectionTransition>

      {/* Animated Gradient Line Separator */}
      <div className="w-full max-w-7xl mx-auto px-6 relative z-50 my-8">
        <div className="h-[2px] w-full separator-gradient rounded-full" />
      </div>

      <SectionTransition id="certifications">
        <Certifications />
      </SectionTransition>

      <SectionTransition id="contact">
        <Footer />
      </SectionTransition>
    </main>
  );
}
