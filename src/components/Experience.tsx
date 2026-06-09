import { motion } from 'framer-motion';
import { fadeUp, stagger, staggerItem, slideLeft, maskReveal, viewport, EASE } from '../lib/motion';

const PURPLE        = '#A78BFA';
const PURPLE_BG     = 'rgba(167,139,250,0.09)';
const PURPLE_BORDER = 'rgba(167,139,250,0.2)';

const tags    = ['React', 'Spring Boot', 'State Management', 'REST APIs', 'Agile/Scrum', 'Enterprise Architecture'];
const bullets = [
  'Specializing in Full-Stack Engineering (FSE) with a core focus on React, state management, and modern web architectures.',
  'Collaborating on enterprise-grade development workflows, integrating responsive frontend components with robust, secure backend services.',
  'Applying Agile/Scrum methodologies to develop, test, and deliver scalable software solutions within a fast-paced professional engineering environment.',
];

export default function Experience() {
  return (
    <section id="experience" className="py-28 relative"
      style={{ background: 'linear-gradient(145deg,#0E0E0E 0%,#0B0A14 50%,#0E0E0E 100%)' }}
    >
      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(rgba(167,139,250,0.055) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }} />

      <div className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(139,92,246,0.32),transparent)' }} />

      {/* Purple aurora blob — right */}
      <div className="absolute -right-12 top-16 w-[380px] h-[320px] rounded-full pointer-events-none"
        style={{ background: 'rgba(139,92,246,0.26)', filter: 'blur(88px)' }} />
      {/* Indigo blob — top-left */}
      <div className="absolute -left-16 -top-12 w-[340px] h-[280px] rounded-full pointer-events-none"
        style={{ background: 'rgba(79,79,247,0.20)', filter: 'blur(80px)' }} />
      {/* Violet accent — bottom-center */}
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-8 w-[300px] h-[200px] rounded-full pointer-events-none"
        style={{ background: 'rgba(99,102,241,0.18)', filter: 'blur(70px)' }} />

      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport} className="mb-14 relative">
          <span className="absolute -top-6 -left-1 text-[100px] font-black select-none pointer-events-none leading-none"
            style={{ color: '#fff', opacity: 0.025, lineHeight: 1 }}>02</span>
          <p className="text-xs font-mono font-bold uppercase tracking-[0.2em] mb-3" style={{ color: PURPLE }}>Work History</p>
          <div style={{ overflow: 'hidden', display: 'block' }}>
            <motion.h2
              variants={maskReveal} initial="hidden" whileInView="show"
              viewport={{ once: true, margin: '0px 0px -40px 0px' }}
              className="text-4xl sm:text-5xl font-black tracking-tight heading"
              style={{ letterSpacing: '-0.03em' }}
            >Experience</motion.h2>
          </div>
        </motion.div>

        {/* Card */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}
          className="rounded-3xl p-8 sm:p-10 relative overflow-hidden"
          style={{ background: '#161616', border: `1px solid ${PURPLE_BORDER}` }}
        >
          <div className="absolute top-0 inset-x-0 h-[3px] rounded-t-3xl"
            style={{ background: `linear-gradient(90deg,#8B5CF6,${PURPLE},#8B5CF6)` }} />
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)' }} />

          <div className="relative">
            {/* Role header */}
            <motion.div
              variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={viewport}
              className="flex flex-col sm:flex-row sm:items-start justify-between gap-5 mb-8"
            >
              <motion.div variants={slideLeft} className="flex items-start gap-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -4 }} transition={{ duration: 0.2 }}
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-base font-black flex-shrink-0"
                  style={{ background: PURPLE_BG, border: `1px solid ${PURPLE_BORDER}`, color: PURPLE }}
                >C</motion.div>
                <div>
                  <h3 className="text-xl font-bold text-white">GenC Intern</h3>
                  <p className="text-sm mt-0.5 font-semibold" style={{ color: PURPLE }}>Cognizant</p>
                  <p className="text-sm mt-0.5" style={{ color: '#777' }}>Full-Stack Engineering Track</p>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="flex flex-col items-start sm:items-end gap-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold"
                  style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', color: '#4ADE80' }}>
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ background: '#22C55E', boxShadow: '0 0 6px rgba(34,197,94,0.8)' }} />
                  Feb 2026 – Present
                </div>
                <span className="text-xs font-mono" style={{ color: '#777' }}>Chennai, India</span>
              </motion.div>
            </motion.div>

            {/* Cascading tags */}
            <motion.div
              className="flex flex-wrap gap-2 mb-8"
              variants={stagger(0.06)} initial="hidden" whileInView="show" viewport={viewport}
            >
              {tags.map(t => (
                <motion.span
                  key={t} variants={staggerItem}
                  whileHover={{ scale: 1.06 }} transition={{ duration: 0.15 }}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium"
                  style={{ background: PURPLE_BG, border: `1px solid ${PURPLE_BORDER}`, color: '#C4B5FD' }}
                >{t}</motion.span>
              ))}
            </motion.div>

            {/* Timeline bullets — each grows in with the line */}
            <div className="relative pl-5">
              {/* Animated vertical line */}
              <motion.div
                className="absolute left-[7px] top-2 w-px rounded-full"
                initial={{ scaleY: 0, originY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={viewport}
                transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
                style={{ height: `${bullets.length * 68}px`, background: `linear-gradient(to bottom, ${PURPLE}, transparent)`, transformOrigin: 'top' }}
              />

              <motion.div
                className="space-y-5"
                variants={stagger(0.15)} initial="hidden" whileInView="show" viewport={viewport}
              >
                {bullets.map((b, i) => (
                  <motion.div
                    key={i}
                    variants={{
                      hidden: { opacity: 0, x: -16 },
                      show:   { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE } },
                    }}
                    className="flex items-start gap-4"
                  >
                    <motion.div
                      className="mt-2 w-[7px] h-[7px] rounded-full flex-shrink-0 -ml-[3px]"
                      initial={{ scale: 0 }} whileInView={{ scale: 1 }}
                      viewport={viewport}
                      transition={{ duration: 0.3, delay: 0.3 + i * 0.15, ease: EASE }}
                      style={{ background: PURPLE, boxShadow: `0 0 8px ${PURPLE}` }}
                    />
                    <p className="text-sm leading-relaxed" style={{ color: '#666', lineHeight: '1.7' }}>{b}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}
          className="mt-5 flex items-center gap-3 px-1"
        >
          <div className="w-2 h-2 rounded-full border border-dashed" style={{ borderColor: PURPLE_BORDER }} />
          <p className="text-xs font-mono" style={{ color: '#555' }}>More milestones ahead · Building track record</p>
        </motion.div>
      </div>
    </section>
  );
}
