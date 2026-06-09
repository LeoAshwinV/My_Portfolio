import { useEffect } from 'react';
import Lenis from 'lenis';
import { MotionConfig } from 'framer-motion';
import Cursor from './components/Cursor';
import ScrollProgress from './components/ScrollProgress';
import DevConsole from './components/DevConsole';
import CommandPalette from './components/CommandPalette';
import Toast from './components/Toast';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId: number;
    const raf = (time: number) => { lenis.raf(time); rafId = requestAnimationFrame(raf); };
    rafId = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(rafId); lenis.destroy(); };
  }, []);

  return (
    /* reducedMotion="user" — Framer Motion reads the OS preference and disables
       all spring / tween animations automatically for users who request it.      */
    <MotionConfig reducedMotion="user">
      <ScrollProgress />
      <Cursor />
      <DevConsole />
      <CommandPalette />
      <Toast />

      {/* Film grain overlay */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 9990,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          opacity: 0.036,
        }}
      />

      <div className="min-h-screen">
        <Navbar />
        <main>
          <Hero />
          <Skills />
          <Experience />
          <Projects />
          <Education />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}

export default App;
