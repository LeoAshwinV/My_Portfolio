import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { fadeUp, stagger, staggerItem, maskReveal, viewport, EASE, CINEMATIC } from '../lib/motion';

/* ── SmartLogix microservices topology diagram ── */
const ARCH_NODES = [
  { label: 'Gateway',   sub: 'Ingestion API',  cx: 85,  color: '#4F8EF7' },
  { label: 'Manifest',  sub: 'Microservice',   cx: 255, color: '#A78BFA' },
  { label: 'Routing',   sub: 'ETA · ATA',      cx: 425, color: '#22D3EE' },
  { label: 'PDF Engine',sub: 'Trip Sheet',     cx: 595, color: '#FBBF24' },
];
const ARCH_ARROWS = [
  { x1: 158, x2: 182, color: '#4F8EF7', label: 'REST', delay: 0.15 },
  { x1: 328, x2: 352, color: '#A78BFA', label: 'events', delay: 0.55 },
  { x1: 498, x2: 522, color: '#22D3EE', label: 'stream', delay: 0.95 },
];

function ArchDiagram() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
      className="mt-6 rounded-2xl p-4"
      style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.05)' }}
    >
      <p className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] mb-3" style={{ color: '#2A2A2A' }}>
        System Topology · Deterministic Pipeline
      </p>
      <svg
        viewBox="0 0 680 100"
        aria-hidden="true"
        className="w-full h-auto overflow-visible"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        {/* Arrow lines + arrowheads */}
        {ARCH_ARROWS.map((a) => (
          <g key={a.label}>
            {/* Animated line */}
            <motion.path
              d={`M ${a.x1} 50 L ${a.x2 - 7} 50`}
              stroke={a.color}
              strokeWidth={1.5}
              fill="none"
              strokeOpacity={0.7}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.45, delay: a.delay, ease: 'easeInOut' }}
            />
            {/* Arrowhead polygon — fades in after the line */}
            <motion.polygon
              points={`${a.x2 - 8},46.5 ${a.x2},50 ${a.x2 - 8},53.5`}
              fill={a.color}
              fillOpacity={0.8}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: a.delay + 0.42 }}
            />
            {/* Protocol label above arrow */}
            <motion.text
              x={(a.x1 + a.x2) / 2}
              y={42}
              textAnchor="middle"
              fontSize={7.5}
              fill={a.color}
              fillOpacity={0.45}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: a.delay + 0.5 }}
            >{a.label}</motion.text>
          </g>
        ))}

        {/* Nodes */}
        {ARCH_NODES.map((n, i) => (
          <motion.g
            key={n.label}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.12, ease: EASE }}
          >
            {/* Card background */}
            <rect
              x={n.cx - 70} y={18} width={140} height={66}
              rx={7}
              fill="rgba(255,255,255,0.025)"
              stroke={n.color}
              strokeWidth={0.8}
              strokeOpacity={0.35}
            />
            {/* Colored top strip */}
            <rect
              x={n.cx - 70} y={18} width={140} height={3.5}
              rx={7}
              fill={n.color}
              fillOpacity={0.22}
            />
            {/* Label */}
            <text x={n.cx} y={50} textAnchor="middle" fontSize={10} fill={n.color} fillOpacity={0.85} fontWeight="700">
              {n.label}
            </text>
            {/* Sub */}
            <text x={n.cx} y={66} textAnchor="middle" fontSize={8.5} fill="#3A3A3A">
              {n.sub}
            </text>
          </motion.g>
        ))}
      </svg>
    </motion.div>
  );
}

function TiltCard({
  children,
  borderColor,
  barGradient,
  glowColor,
  delay = 0,
}: {
  children: React.ReactNode;
  borderColor: string;
  barGradient: string;
  glowColor: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const glareOpacity = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 280, damping: 30 });
  const ySpring = useSpring(y, { stiffness: 280, damping: 30 });

  const rotateX = useTransform(ySpring, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-5, 5]);
  const glareX  = useTransform(x, [-0.5, 0.5], ['120%', '-20%']);
  const glareY  = useTransform(y, [-0.5, 0.5], ['120%', '-20%']);
  const glare   = useMotionTemplate`radial-gradient(380px at ${glareX} ${glareY}, rgba(255,255,255,0.055), transparent)`;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
    glareOpacity.set(1);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
    glareOpacity.set(0);
  };

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="rounded-3xl overflow-hidden relative"
      style={{
        background: '#161616',
        border: `1px solid ${borderColor}`,
        rotateX,
        rotateY,
        transformPerspective: 1100,
        boxShadow: `0 0 0 1px transparent`,
        opacity: 0.86,
        filter: 'brightness(0.88)',
      }}
      whileHover={{
        boxShadow: `0 28px 72px ${glowColor}`,
        opacity: 1,
        filter: 'brightness(1)',
      }}
      transition={{ duration: 0.32, ease: EASE }}
    >
      {/* Glare sheen */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-20 rounded-3xl"
        style={{ background: glare, opacity: glareOpacity }}
        transition={{ opacity: { duration: 0.3 } }}
      />

      {/* Border sweep glow — inset ring + top radial bloom that appears on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-10 rounded-3xl"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: CINEMATIC }}
        style={{
          boxShadow: `inset 0 0 0 1px ${glowColor.replace(/[\d.]+\)$/, '0.55)')}`,
          background: `radial-gradient(ellipse 90% 40% at 50% 0%, ${glowColor.replace(/[\d.]+\)$/, '0.12)')}, transparent)`,
        }}
      />

      {/* Animated accent bar */}
      <motion.div
        className="h-[3px]"
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={viewport}
        transition={{ duration: 0.65, ease: EASE, delay }}
        style={{ background: barGradient, transformOrigin: 'left' }}
      />

      {children}
    </motion.div>
  );
}

const bulletVariants = {
  hidden: { opacity: 0, x: -12 },
  show:   { opacity: 1, x: 0,  transition: { duration: 0.35, ease: EASE } },
};

export default function Projects() {
  return (
    <section id="projects" className="py-28 relative"
      style={{ background: 'linear-gradient(170deg,#090C12 0%,#0E0E0E 40%,#090C10 100%)' }}
    >
      {/* Dot grid — cyan-tinted */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(rgba(34,211,238,0.055) 1px, transparent 1px)',
        backgroundSize: '26px 26px',
      }} />

      <div className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(34,211,238,0.28),transparent)' }} />

      {/* Teal aurora blob — bottom-right */}
      <div className="absolute -right-12 -bottom-12 w-[380px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'rgba(34,211,238,0.20)', filter: 'blur(85px)' }} />
      {/* Blue aurora blob — top-left */}
      <div className="absolute -left-12 -top-8 w-[400px] h-[320px] rounded-full pointer-events-none"
        style={{ background: 'rgba(79,130,247,0.24)', filter: 'blur(90px)' }} />
      {/* Purple shimmer — center */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[240px] rounded-full pointer-events-none"
        style={{ background: 'rgba(139,92,246,0.13)', filter: 'blur(80px)' }} />

      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport} className="mb-14 relative">
          <span className="absolute -top-6 -left-1 text-[100px] font-black select-none pointer-events-none leading-none"
            style={{ color: '#fff', opacity: 0.025, lineHeight: 1 }}>03</span>
          <p className="text-xs font-mono font-bold uppercase tracking-[0.2em] mb-3" style={{ color: '#4F8EF7' }}>Engineering Work</p>
          <div style={{ overflow: 'hidden', display: 'block' }}>
            <motion.h2
              variants={maskReveal} initial="hidden" whileInView="show"
              viewport={{ once: true, margin: '0px 0px -40px 0px' }}
              className="text-4xl sm:text-5xl font-black tracking-tight mb-3 heading"
              style={{ letterSpacing: '-0.03em' }}
            >Projects</motion.h2>
          </div>
          <p className="text-[15px] max-w-md" style={{ color: '#555' }}>Production-grade systems engineered to solve real operational problems.</p>
        </motion.div>

        <motion.div
          className="space-y-5"
          variants={stagger(0.15)} initial="hidden" whileInView="show" viewport={viewport}
        >
          {/* ── SmartLogix ── */}
          <TiltCard
            borderColor="rgba(79,142,247,0.2)"
            barGradient="linear-gradient(90deg,#4F8EF7,#6366F1,#4F8EF7)"
            glowColor="rgba(79,142,247,0.14)"
            delay={0.1}
          >
            <div className="p-8 sm:p-10">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5 mb-8">
                <div className="flex items-start gap-4">
                  <motion.div whileHover={{ rotate: -6, scale: 1.1 }} transition={{ duration: 0.2 }}
                    className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(79,142,247,0.1)', border: '1px solid rgba(79,142,247,0.2)' }}>
                    <svg className="w-5 h-5" style={{ color: '#4F8EF7' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                    </svg>
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-white">SmartLogix</h3>
                    <p className="text-sm mt-0.5" style={{ color: '#555' }}>Enterprise Logistics Orchestration Platform</p>
                  </div>
                </div>
                <div className="flex flex-col items-start sm:items-end gap-2.5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                    style={{ background: 'rgba(34,197,94,0.09)', border: '1px solid rgba(34,197,94,0.22)', color: '#4ADE80' }}>
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#22C55E' }} />
                    Mar 2026 – Present
                  </div>
                  <motion.div className="flex flex-wrap gap-1.5" variants={stagger(0.05)} initial="hidden" whileInView="show" viewport={viewport}>
                    {['Java','Spring Boot','Microservices','REST API'].map(t => (
                      <motion.span key={t} variants={staggerItem}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono"
                        style={{ background: 'rgba(79,142,247,0.08)', border: '1px solid rgba(79,142,247,0.18)', color: '#93BBFF' }}>{t}</motion.span>
                    ))}
                  </motion.div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport} transition={{ duration: 0.45, ease: EASE, delay: 0.15 }}
                className="rounded-2xl p-5 mb-8 relative"
                style={{ background: 'rgba(79,142,247,0.04)', border: '1px solid rgba(79,142,247,0.12)' }}
              >
                <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl"
                  style={{ background: 'linear-gradient(180deg,#4F8EF7,#6366F1)' }} />
                <div className="pl-4">
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-3.5 h-3.5" style={{ color: '#4F8EF7' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: '#4F8EF7' }}>Platform Overview</span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: '#999', lineHeight: '1.75' }}>
                    A <span style={{ color: '#E8E8E8', fontWeight: 600 }}>deterministic, compliance-focused last-mile delivery orchestration platform</span> for merchants, logistics operators, and carriers. Centralizes order ingestion, zone & SLA management, fleet & driver scheduling, deterministic routing & manifest generation, proof-of-delivery capture, exception handling, returns orchestration, and carrier settlement.
                  </p>
                  <p className="text-xs mt-2.5 leading-relaxed" style={{ color: '#666' }}>
                    All routing, capacity, and settlement rules are <span style={{ color: '#999' }}>fully deterministic, auditable, with manual override.</span>
                  </p>
                </div>
              </motion.div>

              <p className="text-xs font-mono font-bold uppercase tracking-[0.15em] mb-4" style={{ color: '#4F8EF7' }}>Key Contributions</p>
              <motion.div className="space-y-4" variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={viewport}>
                {[
                  { t: 'Core Microservices Architecture', b: 'Engineered manifest and routing microservices in Java + Spring Boot, establishing a decoupled, scalable architecture for high-throughput order data.' },
                  { t: 'Deterministic Routing Engine',    b: 'Implemented precise travel duration calculation and sequential stop optimization, handling the full ETA vs. ATA comparison matrix.' },
                  { t: 'Digital Trip Sheet Engine',       b: 'Built an automated PDF reporting engine generating "Digital Trip Sheets" to streamline driver workflows and enforce routing compliance.' },
                ].map(item => (
                  <motion.div key={item.t} variants={bulletVariants} className="flex items-start gap-4">
                    <div className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: '#4F8EF7', boxShadow: '0 0 6px rgba(79,142,247,0.7)' }} />
                    <div>
                      <span className="text-xs font-mono font-semibold" style={{ color: '#93BBFF' }}>{item.t} — </span>
                      <span className="text-sm leading-relaxed" style={{ color: '#666', lineHeight: '1.7' }}>{item.b}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Microservices topology */}
              <ArchDiagram />
            </div>
          </TiltCard>

          {/* ── Video Analytics ── */}
          <TiltCard
            borderColor="rgba(34,211,238,0.16)"
            barGradient="linear-gradient(90deg,#22D3EE,#06B6D4,#22D3EE)"
            glowColor="rgba(34,211,238,0.1)"
            delay={0.2}
          >
            <div className="p-8 sm:p-10">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5 mb-8">
                <div className="flex items-start gap-4">
                  <motion.div whileHover={{ rotate: 6, scale: 1.1 }} transition={{ duration: 0.2 }}
                    className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.16)' }}>
                    <svg className="w-5 h-5" style={{ color: '#22D3EE' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/>
                    </svg>
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Real-Time Video Analytics & Surveillance</h3>
                    <p className="text-sm mt-0.5" style={{ color: '#555' }}>Computer Vision Pipeline · Behavioral Anomaly Detection</p>
                  </div>
                </div>
                <div className="flex flex-col items-start sm:items-end gap-2.5">
                  <span className="px-3 py-1.5 rounded-full text-xs font-mono font-semibold"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#444' }}>
                    Jan 2026 – Mar 2026
                  </span>
                  <motion.div className="flex flex-wrap gap-1.5" variants={stagger(0.05)} initial="hidden" whileInView="show" viewport={viewport}>
                    {['YOLO v11','OpenCV','IEEE Paper'].map(t => (
                      <motion.span key={t} variants={staggerItem}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono"
                        style={{ background: 'rgba(34,211,238,0.07)', border: '1px solid rgba(34,211,238,0.15)', color: '#67E8F9' }}>{t}</motion.span>
                    ))}
                  </motion.div>
                </div>
              </div>

              <motion.div
                className="grid grid-cols-3 gap-3 mb-8"
                variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={viewport}
              >
                {[{ v: 'Real-Time', s: 'Inference' },{ v: 'YOLO v11', s: 'Architecture' },{ v: 'IEEE', s: 'Research Paper' }].map(m => (
                  <motion.div key={m.s} variants={staggerItem}
                    whileHover={{ scale: 1.04, borderColor: 'rgba(34,211,238,0.28)' }}
                    transition={{ duration: 0.2 }}
                    className="rounded-xl py-2.5 px-3 text-center"
                    style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <p className="text-sm font-bold font-mono" style={{ color: '#22D3EE' }}>{m.v}</p>
                    <p className="text-[11px] mt-0.5" style={{ color: '#666' }}>{m.s}</p>
                  </motion.div>
                ))}
              </motion.div>

              <p className="text-xs font-mono font-bold uppercase tracking-[0.15em] mb-4" style={{ color: '#22D3EE' }}>Technical Highlights</p>
              <motion.div className="space-y-4" variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={viewport}>
                {[
                  { t: 'Vision Pipeline Architecture', b: 'Architected a real-time computer vision pipeline using YOLO to detect object and behavioral anomalies in public environments.' },
                  { t: 'IEEE Research Paper',          b: "Authored an IEEE-style paper detailing the neural network's backbone, neck, and head components, documenting structural data flow and layer mechanics." },
                  { t: 'Inference Optimization',       b: 'Optimized model inference for minimal latency during live video stream processing while maintaining high-accuracy classification thresholds.' },
                ].map(item => (
                  <motion.div key={item.t} variants={bulletVariants} className="flex items-start gap-4">
                    <div className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: '#22D3EE', boxShadow: '0 0 6px rgba(34,211,238,0.6)' }} />
                    <div>
                      <span className="text-xs font-mono font-semibold" style={{ color: '#67E8F9' }}>{item.t} — </span>
                      <span className="text-sm leading-relaxed" style={{ color: '#666', lineHeight: '1.7' }}>{item.b}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
}
