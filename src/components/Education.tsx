import { useRef, useState } from 'react';
import { motion, useInView, useSpring, useMotionValue, useMotionValueEvent, animate } from 'framer-motion';
import { fadeUp, stagger, staggerItem, maskReveal, viewport, EASE } from '../lib/motion';

const education = [
  { degree: 'B.E. in Computer Science', institution: 'Panimalar Engineering College', period: '2022 – 2026', grade: '8.5 / 10 CGPA', active: true  },
  { degree: 'Higher Secondary (12th)',  institution: "St. Bede's Academy",           period: '2022',        grade: '83.6%',         active: false },
  { degree: 'Secondary School (10th)',  institution: "St. Bede's Academy",           period: '2020',        grade: '83.4%',         active: false },
];

const achievements = [
  { emoji:'🏅', color:'#FBBF24', bg:'rgba(251,191,36,0.09)',  border:'rgba(251,191,36,0.2)',   title:'Oracle Certified Professional',  sub:'Generative AI · 2024',                            badge:'Cert',  desc:'Focused on cloud infrastructure integration, model execution mechanics, and secure API deployment workflows.' },
  { emoji:'🏦', color:'#60A5FA', bg:'rgba(96,165,250,0.08)',  border:'rgba(96,165,250,0.18)',  title:'JP Morgan Chase & Co.',          sub:'Software Engineering Virtual Experience · 2024',  badge:'Cert',  desc: undefined },
  { emoji:'🏆', color:'#A78BFA', bg:'rgba(167,139,250,0.08)', border:'rgba(167,139,250,0.18)', title:'Smart India Hackathon 2024',     sub:'Top 20 Finalist · College Level',                 badge:'Award', desc: undefined },
];

function LeetCodeCard() {
  const ref       = useRef<HTMLDivElement>(null);
  const inView    = useInView(ref, { once: true, amount: 0.6 });
  const raw       = useMotionValue(0);
  const displayed = useSpring(raw, { stiffness: 60, damping: 18, mass: 1.1 });

  // Kick off count animation exactly once when the card enters view
  const fired = useRef(false);
  if (inView && !fired.current) { fired.current = true; animate(raw, 500, { duration: 1.6, ease: [0.16, 1, 0.3, 1] }); }

  return (
    <motion.div
      ref={ref}
      variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}
      whileHover={{ y: -4, boxShadow: '0 20px 56px rgba(34,211,238,0.12)' }}
      transition={{ duration: 0.25, ease: EASE }}
      className="h-full rounded-2xl p-7 relative overflow-hidden flex flex-col justify-center"
      style={{ background: 'rgba(34,211,238,0.04)', border: '1px solid rgba(34,211,238,0.18)' }}
    >
      {/* Subtle corner glow */}
      <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%)' }} />

      <div className="flex items-start gap-6">
        {/* Counter block */}
        <div className="text-center flex-shrink-0 min-w-[72px]">
          <div className="flex items-end justify-center gap-0.5">
            <motion.span
              className="text-5xl font-black font-mono leading-none tabular-nums"
              style={{ color: '#22D3EE', textShadow: '0 0 28px rgba(34,211,238,0.45)' }}
            >
              <Counter value={displayed} />
            </motion.span>
            <span className="text-3xl font-black font-mono leading-none mb-0.5"
              style={{ color: '#22D3EE', opacity: 0.7 }}>+</span>
          </div>
          <p className="text-[10px] font-mono mt-2 uppercase tracking-[0.14em]"
            style={{ color: '#22D3EE', opacity: 0.5 }}>Problems</p>
        </div>

        {/* Text block */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-base" aria-hidden="true">💻</span>
            <p className="text-sm font-bold" style={{ color: '#E8E8E8' }}>LeetCode DSA Mastery</p>
          </div>
          <p className="text-xs leading-relaxed" style={{ color: '#888', lineHeight: '1.7' }}>
            Arrays, graphs, dynamic programming, trees, and system design — solved consistently across all difficulty tiers.
          </p>
          <div className="mt-3 flex gap-1.5">
            {['Easy', 'Medium', 'Hard'].map((d, i) => (
              <span key={d} className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold"
                style={{
                  background: ['rgba(34,197,94,0.08)','rgba(251,191,36,0.08)','rgba(239,68,68,0.08)'][i],
                  border: `1px solid ${['rgba(34,197,94,0.2)','rgba(251,191,36,0.2)','rgba(239,68,68,0.2)'][i]}`,
                  color: ['#4ADE80','#FBBF24','#F87171'][i],
                }}>{d}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* Subscribes to a MotionValue and re-renders on every tick */
function Counter({ value }: { value: ReturnType<typeof useSpring> }) {
  const [display, setDisplay] = useState(0);
  useMotionValueEvent(value, 'change', v => setDisplay(Math.round(v)));
  return <>{display}</>;
}

export default function Education() {
  return (
    <section id="education" className="py-28 relative"
      style={{ background: 'linear-gradient(150deg,#0A0A10 0%,#0E0E0E 45%,#0C0A0E 100%)' }}
    >
      {/* Subtle dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(rgba(167,139,250,0.055) 1px, transparent 1px)',
        backgroundSize: '30px 30px',
      }} />

      <div className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(167,139,250,0.30),transparent)' }} />

      {/* Blue aurora blob — top-right */}
      <div className="absolute -right-12 -top-12 w-[400px] h-[320px] rounded-full pointer-events-none"
        style={{ background: 'rgba(79,130,247,0.22)', filter: 'blur(90px)' }} />
      {/* Purple aurora blob — left-center */}
      <div className="absolute -left-12 top-1/3 w-[360px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'rgba(167,139,250,0.22)', filter: 'blur(85px)' }} />
      {/* Warm amber hint — bottom (echoes achievement card) */}
      <div className="absolute right-1/4 -bottom-8 w-[280px] h-[180px] rounded-full pointer-events-none"
        style={{ background: 'rgba(251,191,36,0.12)', filter: 'blur(70px)' }} />

      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport} className="mb-14 relative">
          <span className="absolute -top-6 -left-1 text-[100px] font-black select-none pointer-events-none leading-none"
            style={{ color: '#fff', opacity: 0.025, lineHeight: 1 }}>04</span>
          <p className="text-xs font-mono font-bold uppercase tracking-[0.2em] mb-3" style={{ color: '#A78BFA' }}>Background</p>
          <div style={{ overflow: 'hidden', display: 'block' }}>
            <motion.h2
              variants={maskReveal} initial="hidden" whileInView="show"
              viewport={{ once: true, margin: '0px 0px -40px 0px' }}
              className="text-4xl sm:text-5xl font-black tracking-tight heading"
              style={{ letterSpacing: '-0.03em' }}
            >Education &amp; Achievements</motion.h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:items-stretch">

          {/* Education */}
          <div className="flex flex-col">
            <motion.p
              variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}
              className="text-xs font-mono font-bold uppercase tracking-[0.15em] mb-5" style={{ color: '#A78BFA' }}
            >Academic History</motion.p>

            <motion.div
              className="space-y-3"
              variants={stagger(0.12)} initial="hidden" whileInView="show" viewport={viewport}
            >
              {education.map(e => (
                <motion.div
                  key={e.degree}
                  variants={staggerItem}
                  whileHover={{ y: -2, borderColor: e.active ? 'rgba(167,139,250,0.4)' : 'rgba(255,255,255,0.12)' }}
                  transition={{ duration: 0.2, ease: EASE }}
                  className="rounded-2xl p-5"
                  style={{
                    background: '#161616',
                    border: e.active ? '1px solid rgba(167,139,250,0.22)' : '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold" style={{ color: '#ECECEC' }}>{e.degree}</p>
                      <p className="text-xs mt-1.5" style={{ color: '#888' }}>{e.institution}</p>
                    </div>
                    <span className="text-[12px] font-mono font-medium flex-shrink-0" style={{ color: '#666' }}>{e.period}</span>
                  </div>
                  <div className="mt-4 pt-4 flex items-center justify-between"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <span className="text-xs font-medium" style={{ color: '#666' }}>Grade</span>
                    <motion.span
                      className="text-sm font-bold font-mono"
                      style={{ color: e.active ? '#A78BFA' : e.grade.includes('%') ? '#22D3EE' : '#A0A0A0' }}
                      whileHover={{ scale: 1.08 }} transition={{ duration: 0.15 }}
                    >{e.grade}</motion.span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Achievements */}
          <div className="flex flex-col">
            <motion.p
              variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}
              className="text-xs font-mono font-bold uppercase tracking-[0.15em] mb-5" style={{ color: '#A78BFA' }}
            >Certifications & Milestones</motion.p>

            <motion.div
              className="space-y-3"
              variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={viewport}
            >
              {achievements.map(a => (
                <motion.div
                  key={a.title}
                  variants={staggerItem}
                  whileHover={{ y: -3, boxShadow: `0 8px 32px ${a.bg}` }}
                  transition={{ duration: 0.22, ease: EASE }}
                  className="rounded-2xl p-4 flex items-center gap-4"
                  style={{ background: '#161616', border: `1px solid ${a.border}` }}
                >
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: -5 }} transition={{ duration: 0.2 }}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                    style={{ background: a.bg, border: `1px solid ${a.border}` }}
                  >{a.emoji}</motion.div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold leading-snug" style={{ color: '#E8E8E8' }}>{a.title}</p>
                    <p className="text-xs mt-0.5" style={{ color: '#888' }}>{a.sub}</p>
                    {a.desc && (
                      <p className="text-[11px] mt-1.5 leading-relaxed" style={{ color: '#555', lineHeight: '1.6' }}>{a.desc}</p>
                    )}
                  </div>
                  <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wide flex-shrink-0"
                    style={{ background: a.bg, border: `1px solid ${a.border}`, color: a.color }}>
                    {a.badge}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* LeetCode counter card — flex-1 stretches it to meet the left column's bottom */}
            <div className="flex-1 flex flex-col mt-5">
              <LeetCodeCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
