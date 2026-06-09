import { motion } from 'framer-motion';
import { fadeUp, stagger, staggerItem, maskReveal, viewport, EASE, CINEMATIC } from '../lib/motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

const groups = [
  {
    label: 'Backend Development',
    accent: '#4F8EF7', glow: 'rgba(79,142,247,0.09)', border: 'rgba(79,142,247,0.18)',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"/></svg>,
    skills: ['Java', 'Spring Boot', 'Spring Security', 'JWT Auth', 'Microservices', 'RESTful APIs', 'SQL', 'Database Design'],
  },
  {
    label: 'Frontend Development',
    accent: '#A78BFA', glow: 'rgba(167,139,250,0.09)', border: 'rgba(167,139,250,0.18)',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>,
    skills: ['React', 'JavaScript ES6+', 'TypeScript', 'HTML5', 'CSS3', 'Responsive Design', 'State Management'],
  },
  {
    label: 'Computer Vision',
    accent: '#22D3EE', glow: 'rgba(34,211,238,0.08)', border: 'rgba(34,211,238,0.16)',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/></svg>,
    skills: ['YOLO v11', 'OpenCV', 'Object Detection', 'Video Stream Processing', 'Image Pipelines'],
  },
  {
    label: 'Tools & Workflow',
    accent: '#FBBF24', glow: 'rgba(251,191,36,0.08)', border: 'rgba(251,191,36,0.16)',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
    skills: ['IntelliJ IDEA', 'Agile / Scrum', 'Git', 'GitHub', 'Jira', 'VS Code'],
  },
];

/* Row 1 — Backend & Systems Architecture (blue) */
const row1 = ['Java', 'Spring Boot', 'Microservices', 'REST APIs', 'SQL', 'Spring Security', 'JWT Auth', 'Database Design', 'Spring MVC', 'JPA / Hibernate', 'API Gateway'];
/* Row 2 — Frontend · Computer Vision · Workflow (purple) */
const row2 = ['React', 'TypeScript', 'JavaScript ES6+', 'YOLO v11', 'OpenCV', 'Agile / Scrum', 'Git', 'VS Code', 'Object Detection', 'Video Streams', 'Jira'];

export default function Skills() {
  const reduced = useReducedMotion();
  return (
    <section id="skills" className="py-28 relative"
      style={{ background: 'linear-gradient(160deg,#08081A 0%,#0E0E0E 40%,#0A0A10 100%)' }}
    >
      {/* Dot-grid texture */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(rgba(79,142,247,0.06) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />

      <div className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(79,142,247,0.28),transparent)' }} />

      {/* Blue aurora blob — top-left */}
      <div className="absolute -top-16 -left-16 w-[420px] h-[340px] rounded-full pointer-events-none"
        style={{ background: 'rgba(79,130,247,0.28)', filter: 'blur(90px)' }} />
      {/* Purple aurora blob — bottom-right */}
      <div className="absolute -bottom-16 -right-16 w-[360px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'rgba(139,92,246,0.22)', filter: 'blur(80px)' }} />
      {/* Teal accent — mid-right */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 w-56 h-56 rounded-full pointer-events-none"
        style={{ background: 'rgba(34,211,238,0.14)', filter: 'blur(72px)' }} />

      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport} className="mb-10 relative">
          <span className="absolute -top-6 -left-1 text-[100px] font-black select-none pointer-events-none leading-none"
            style={{ color: '#fff', opacity: 0.025, lineHeight: 1 }}>01</span>
          <p className="text-xs font-mono font-bold uppercase tracking-[0.2em] mb-3" style={{ color: '#4F8EF7' }}>Technical Expertise</p>
          {/* Mask reveal — text rises up from clip boundary (curtain effect) */}
          <div style={{ overflow: 'hidden', display: 'block' }}>
            <motion.h2
              variants={maskReveal} initial="hidden" whileInView="show"
              viewport={{ once: true, margin: '0px 0px -40px 0px' }}
              className="text-4xl sm:text-5xl font-black tracking-tight mb-3 heading"
              style={{ letterSpacing: '-0.03em' }}
            >Core Skills</motion.h2>
          </div>
          <p className="text-[15px] max-w-md" style={{ color: '#555' }}>A focused, production-proven stack built for enterprise systems at scale.</p>
        </motion.div>

        {/* ── Infinite marquee ── */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={viewport}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-14 overflow-hidden relative"
        >
          {/* Fade edges */}
          <div className="absolute inset-y-0 left-0 w-20 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #0E0E0E, transparent)' }} />
          <div className="absolute inset-y-0 right-0 w-20 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #0E0E0E, transparent)' }} />

          {/* Row 1 — scrolls left. select-none prevents text selection on moving targets */}
          <div
            aria-hidden="true"
            className="flex gap-3 mb-3 select-none"
            style={{ animation: reduced ? 'none' : 'marqueeLeft 30s linear infinite', width: 'max-content' }}
            onMouseEnter={e => { if (!reduced) (e.currentTarget as HTMLElement).style.animationPlayState = 'paused'; }}
            onMouseLeave={e => { if (!reduced) (e.currentTarget as HTMLElement).style.animationPlayState = 'running'; }}
          >
            {[...row1, ...row1, ...row1].map((s, i) => (
              <span key={i} className="flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-mono whitespace-nowrap"
                style={{ background: 'rgba(79,142,247,0.07)', border: '1px solid rgba(79,142,247,0.14)', color: '#4F8EF799' }}>
                {s}
              </span>
            ))}
          </div>

          {/* Row 2 — scrolls right */}
          <div
            aria-hidden="true"
            className="flex gap-3 select-none"
            style={{ animation: reduced ? 'none' : 'marqueeRight 26s linear infinite', width: 'max-content' }}
            onMouseEnter={e => { if (!reduced) (e.currentTarget as HTMLElement).style.animationPlayState = 'paused'; }}
            onMouseLeave={e => { if (!reduced) (e.currentTarget as HTMLElement).style.animationPlayState = 'running'; }}
          >
            {[...row2, ...row2, ...row2].map((s, i) => (
              <span key={i} className="flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-mono whitespace-nowrap"
                style={{ background: 'rgba(167,139,250,0.07)', border: '1px solid rgba(167,139,250,0.14)', color: '#A78BFA99' }}>
                {s}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Skill category cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={viewport}
        >
          {groups.map(g => (
            <motion.div
              key={g.label}
              variants={fadeUp}
              whileHover={{ y: -4, boxShadow: `0 16px 48px ${g.glow}`, opacity: 1, filter: 'brightness(1.06)' }}
              transition={{ duration: 0.28, ease: EASE }}
              className="rounded-2xl p-6"
              style={{ background: '#161616', border: `1px solid ${g.border}`, opacity: 0.84, filter: 'brightness(0.9)' }}
            >
              <div className="flex items-center gap-3 mb-5">
                <motion.div
                  whileHover={{ rotate: 8, scale: 1.1 }} transition={{ duration: 0.2 }}
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: g.glow, color: g.accent, border: `1px solid ${g.border}` }}
                >
                  {g.icon}
                </motion.div>
                <span className="text-sm font-bold" style={{ color: '#D8D8D8' }}>{g.label}</span>
              </div>

              <motion.div
                className="flex flex-wrap gap-2"
                variants={stagger(0.04)} initial="hidden" whileInView="show" viewport={viewport}
              >
                {g.skills.map(s => (
                  <motion.span
                    key={s}
                    variants={staggerItem}
                    whileHover={{ scale: 1.07, borderColor: g.border, color: g.accent, background: g.glow }}
                    transition={{ duration: 0.15 }}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium cursor-default"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#999' }}
                  >
                    {s}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
