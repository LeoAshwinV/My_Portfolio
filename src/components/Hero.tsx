import { useRef, lazy, Suspense } from 'react';
import { motion, useMotionValue, useMotionTemplate, useSpring, useInView, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { fadeIn, stagger, EASE, CINEMATIC } from '../lib/motion';
import { useScramble } from '../hooks/useScramble';
import { useTypewriter } from '../hooks/useTypewriter';

const HeroCanvas = lazy(() => import('./HeroCanvas'));

const ROLES = ['Full-Stack Engineer', 'Backend Architect', 'Microservices Developer'];

const socials = [
  { label: 'GitHub',   href: 'https://github.com/LeoAshwin',                  icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/></svg> },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/leo-ashwin-859b99256', icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  { label: 'Email',    href: 'mailto:leoashwin22@gmail.com',                  icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg> },
];

const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.18 } },
};
const heroItem = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.75, ease: CINEMATIC } },
};

/* Magnetic wrapper for CTA buttons */
function MagneticBtn({ href, primary, children }: { href: string; primary?: boolean; children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xS = useSpring(x, { stiffness: 190, damping: 14 });
  const yS = useSpring(y, { stiffness: 190, damping: 14 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.3);
    y.set((e.clientY - r.top - r.height / 2) * 0.3);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  const primaryStyle = {
    x: xS, y: yS,
    background: 'linear-gradient(135deg,#4F8EF7 0%,#6366F1 100%)',
    boxShadow: '0 0 0 1px rgba(79,142,247,0.35), 0 8px 32px rgba(79,142,247,0.22)',
  };
  const ghostStyle = {
    x: xS, y: yS,
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#888',
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      data-cursor
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileTap={{ scale: 0.96 }}
      style={primary ? primaryStyle : ghostStyle}
      className={
        primary
          ? 'inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl text-sm font-bold text-white'
          : 'inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl text-sm font-semibold'
      }
    >
      {children}
    </motion.a>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView   = useInView(sectionRef, { once: false, amount: 0 });
  const mouseRef   = useRef({ x: 0, y: 0 });
  const mouseX     = useMotionValue(0);
  const mouseY     = useMotionValue(0);
  const spotlight  = useMotionTemplate`radial-gradient(540px circle at ${mouseX}px ${mouseY}px, rgba(79,142,247,0.08), transparent 75%)`;

  const reduced       = useReducedMotion();
  // When reduced motion is active: show final text immediately, no scramble/typewriter
  const scrambledName = useScramble('Leo Ashwin V', 260);
  const role          = useTypewriter(ROLES);

  /* ── Scroll-parallax — text layers move at different rates, creating depth ── */
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  // Entire content block drifts up as user scrolls (base parallax)
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  // Name moves SLOWER than the block (feels "closest" — foreground)
  const nameExtraY = useTransform(scrollYProgress, [0, 1], [0, 22]);
  // Description moves FASTER (feels "furthest" — background plane)
  const descExtraY = useTransform(scrollYProgress, [0, 1], [0, -38]);

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = (e.clientX - rect.left) / rect.width * 2 - 1;
    const ny = -((e.clientY - rect.top) / rect.height * 2 - 1);
    mouseRef.current = { x: nx, y: ny };
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      onMouseMove={onMouseMove}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* 3D Canvas — lazily loaded, pointer-events:none */}
      <Suspense fallback={null}>
        <HeroCanvas mouse={mouseRef} active={isInView} reduced={reduced} />
      </Suspense>

      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid pointer-events-none" style={{ opacity: 0.4 }} />

      {/* Mouse spotlight */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ background: spotlight }} />

      {/* Ambient glows */}

      {/* Top-center atmospheric bloom — fills the dark upper region */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2.2, delay: 0.3 }}
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-[900px] h-[520px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(79,142,247,0.13) 0%, rgba(120,60,220,0.07) 45%, transparent 72%)' }}
      />

      {/* Top-left blue orb */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, delay: 0.2 }}
        className="absolute -top-56 -left-56 w-[760px] h-[760px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(79,142,247,0.15) 0%, transparent 65%)' }}
      />

      {/* Top-right purple orb */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, delay: 0.45 }}
        className="absolute -top-32 -right-32 w-[560px] h-[560px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 65%)' }}
      />

      {/* Bottom-right purple orb */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute -bottom-48 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 65%)' }}
      />

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-60 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #0E0E0E)' }} />

      {/* Content — whole block drifts up on scroll; individual layers add depth */}
      <motion.div
        className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-28 pb-20"
        variants={heroContainer} initial="hidden" animate="show"
        style={{ y: contentY }}
      >
        {/* Status chip */}
        <motion.div variants={heroItem}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wide mb-10"
          style={{ background: 'rgba(34,197,94,0.09)', border: '1px solid rgba(34,197,94,0.22)', color: '#4ADE80' }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: '#22C55E', boxShadow: '0 0 10px rgba(34,197,94,0.9)' }} />
          Available for full-time roles
        </motion.div>

        {/* Name — per-word cinematic mask curtain.
              Each word has its own overflow:hidden clip zone so it rises
              independently: blur clears and the letter lifts into place.
              Words stagger 110ms apart → "Leo … Ashwin … V" cascade.        */}
        <motion.h1
          className="font-black leading-none font-mono"
          style={{
            fontSize: 'clamp(52px, 9vw, 96px)',
            letterSpacing: '-0.04em',
            display: 'flex',
            flexWrap: 'wrap',
            columnGap: '0.28em',
            rowGap: 0,
            marginBottom: '1.5rem',
            y: nameExtraY,
          }}
          aria-label="Leo Ashwin V"
        >
          {['Leo', 'Ashwin', 'V'].map((word, i) => (
            <span
              key={word}
              style={{
                display: 'block',
                overflow: 'hidden',
                /* tiny bottom padding prevents descenders being clipped */
                paddingBottom: '0.06em',
                lineHeight: 1.05,
              }}
            >
              <motion.span
                initial={{ y: '105%', filter: 'blur(12px)', opacity: 0.6 }}
                animate={{ y: '0%',   filter: 'blur(0px)',  opacity: 1   }}
                transition={{ duration: 1.0, ease: CINEMATIC, delay: 0.28 + i * 0.11 }}
                className="heading"
                style={{ display: 'block' }}
              >
                {(reduced ? 'Leo Ashwin V' : scrambledName).split(' ')[i] ?? word}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        {/* Typewriter role */}
        <motion.div variants={heroItem} className="flex flex-col gap-2.5 mb-7">
          {/* Stable row: min-h prevents layout collapse when text is ~1 char */}
          <div className="min-h-9 flex items-center">
            <span className="text-xl sm:text-2xl font-semibold" style={{ color: '#E8E8E8' }}>
              {reduced ? ROLES[0] : role}
              <span
                className="inline-block w-[2px] h-6 ml-1 align-middle"
                style={{ background: '#4F8EF7', animation: 'blink 1s step-end infinite' }}
              />
            </span>
          </div>
          {/* Accent line + tech stack tag — independent row, never jumps */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:block w-8 h-[2px] rounded-full flex-shrink-0"
              style={{ background: 'linear-gradient(90deg,#4F8EF7,#8B5CF6)' }} />
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold"
              style={{ background: 'rgba(79,142,247,0.1)', border: '1px solid rgba(79,142,247,0.25)', color: '#93BBFF' }}>
              Java · Spring Boot · React
            </span>
          </div>
        </motion.div>

        {/* Summary — deeper background-plane parallax layer */}
        <motion.p variants={heroItem}
          className="text-base sm:text-[17px] max-w-2xl mb-10"
          style={{ color: '#888', lineHeight: '1.82', y: descExtraY }}
        >
          CS graduate building enterprise-grade microservices and high-performance systems.
          Currently at <span style={{ color: '#D0D0D0', fontWeight: 500 }}>Cognizant</span> as a GenC FSE Intern —
          architecting scalable, production-ready solutions from the backend up.
        </motion.p>

        {/* Magnetic CTAs */}
        <motion.div variants={heroItem} className="flex flex-wrap gap-4 mb-14">
          <MagneticBtn href="#projects" primary>
            View Projects
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </MagneticBtn>
          <MagneticBtn href="mailto:leoashwin22@gmail.com">
            Get In Touch
          </MagneticBtn>
        </motion.div>

        {/* Socials */}
        <motion.div variants={stagger(0.08)} initial="hidden" animate="show" className="flex flex-wrap items-center gap-6">
          {socials.map(({ label, href, icon }) => (
            <motion.a
              key={label} href={href}
              data-cursor
              variants={fadeIn}
              whileHover={{ y: -2, color: '#E4E4E7' }} whileTap={{ scale: 0.95 }}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="flex items-center gap-2 text-sm font-medium"
              style={{ color: '#71717A' }}
              transition={{ duration: 0.2 }}
            >
              {icon} {label}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} transition={{ delay: 1.8, duration: 0.7 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none"
      >
        <div className="w-px h-12" style={{ background: 'linear-gradient(to bottom, transparent, #4F8EF7)' }} />
        <svg className="w-4 h-4 animate-bounce" style={{ color: '#4F8EF7' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
        </svg>
      </motion.div>
    </section>
  );
}
