import { useRef, useEffect } from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  animate,
} from 'framer-motion';
import {
  fadeUp,
  stagger,
  staggerItem,
  maskReveal,
  viewport,
  CINEMATIC,
} from '../lib/motion';

// ── Syntax-highlighted code lines ─────────────────────────────────────────────

type Token = { text: string; color: string };

const KW   = '#FF7B72'; // keywords: const
const PROP = '#79C0FF'; // property names
const STR  = '#A5D6FF'; // string values
const PUNC = '#E6EDF3'; // punctuation / brackets

const codeLines: Token[][] = [
  [{ text: 'const ', color: KW }, { text: 'leo', color: PUNC }, { text: ' = {', color: PUNC }],
  [{ text: '  role', color: PROP }, { text: ':     ', color: PUNC }, { text: '"Full-Stack Engineer"', color: STR }, { text: ',', color: PUNC }],
  [{ text: '  location', color: PROP }, { text: ': ', color: PUNC }, { text: '"Chennai, India 🇮🇳"', color: STR }, { text: ',', color: PUNC }],
  [{ text: '  current', color: PROP }, { text: ':  ', color: PUNC }, { text: '"Cognizant GenC Intern"', color: STR }, { text: ',', color: PUNC }],
  [{ text: '  stack', color: PROP }, { text: ':    ', color: PUNC }, { text: '[', color: PUNC }, { text: '"React"', color: STR }, { text: ', ', color: PUNC }, { text: '"Spring Boot"', color: STR }, { text: ', ', color: PUNC }, { text: '"YOLO v11"', color: STR }, { text: '],', color: PUNC }],
  [{ text: '  openTo', color: PROP }, { text: ':   ', color: PUNC }, { text: '"Full-time roles"', color: STR }, { text: ',', color: PUNC }],
  [{ text: '  leetcode', color: PROP }, { text: ': ', color: PUNC }, { text: '"500+ problems solved"', color: STR }, { text: ',', color: PUNC }],
  [{ text: '  cgpa', color: PROP }, { text: ':     ', color: PUNC }, { text: '"8.5 / 10"', color: STR }, { text: ',', color: PUNC }],
  [{ text: '}', color: PUNC }],
];

// ── Count-up stat ──────────────────────────────────────────────────────────────

function StatCard({
  value,
  label,
  suffix = '',
  decimals = 0,
}: {
  value: number;
  label: string;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const count = useMotionValue(0);
  const displayRef = useRef<HTMLSpanElement>(null);

  useMotionValueEvent(count, 'change', (v) => {
    if (displayRef.current) {
      displayRef.current.textContent = decimals > 0 ? v.toFixed(decimals) : Math.round(v).toString();
    }
  });

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(count, value, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      variants={staggerItem}
      whileHover={{
        y: -4,
        boxShadow: '0 16px 48px rgba(79,142,247,0.12)',
        borderColor: 'rgba(79,142,247,0.22)',
      }}
      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        background: '#161616',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '16px',
        padding: '28px 24px',
        textAlign: 'center',
        cursor: 'default',
      }}
    >
      <div
        style={{
          fontSize: '36px',
          fontWeight: 900,
          color: '#E8E8E8',
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
          lineHeight: 1,
          marginBottom: '8px',
        }}
      >
        <span ref={displayRef}>0</span>
        {suffix}
      </div>
      <div style={{ fontSize: '12px', color: '#555', fontWeight: 500, letterSpacing: '0.04em' }}>
        {label}
      </div>
    </motion.div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function About() {
  const codeRef = useRef<HTMLDivElement>(null);
  const codeInView = useInView(codeRef, { once: true, margin: '-60px' });

  return (
    <section
      id="about"
      className="py-28 relative overflow-hidden"
      style={{
        background: 'linear-gradient(155deg,#0A0A14 0%,#0E0E0E 50%,#0A0A10 100%)',
      }}
    >
      {/* ── Aurora blobs ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-80px',
          left: '-80px',
          width: '380px',
          height: '300px',
          borderRadius: '50%',
          background: 'rgba(79,130,247,0.22)',
          filter: 'blur(90px)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '-60px',
          right: '-60px',
          width: '340px',
          height: '280px',
          borderRadius: '50%',
          background: 'rgba(139,92,246,0.18)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: '50%',
          left: '55%',
          transform: 'translateY(-50%)',
          width: '280px',
          height: '220px',
          borderRadius: '50%',
          background: 'rgba(34,211,238,0.10)',
          filter: 'blur(70px)',
        }}
      />

      {/* Top rule */}
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{
          background: 'linear-gradient(90deg,transparent,rgba(79,142,247,0.22),transparent)',
        }}
      />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 relative">
        {/* ── Section header ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mb-14 relative"
        >
          <p
            className="text-xs font-mono font-bold uppercase mb-3"
            style={{ color: '#4F8EF7', letterSpacing: '0.2em' }}
          >
            Introduction
          </p>

          <div style={{ overflow: 'hidden', display: 'block' }}>
            <motion.h2
              variants={maskReveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '0px 0px -40px 0px' }}
              className="text-4xl sm:text-5xl font-black tracking-tight heading"
              style={{ letterSpacing: '-0.03em' }}
            >
              About Me
            </motion.h2>
          </div>
        </motion.div>

        {/* ── Two-column body ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-12 mb-14 items-start">
          {/* ── LEFT ── */}
          <motion.div
            variants={stagger(0.09)}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          >
            {/* Label */}
            <motion.p
              variants={staggerItem}
              style={{
                fontSize: '11px',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                fontWeight: 700,
                letterSpacing: '0.18em',
                color: '#4F8EF7',
                textTransform: 'uppercase',
                margin: 0,
              }}
            >
              Who I Am
            </motion.p>

            {/* Para 1 */}
            <motion.p
              variants={staggerItem}
              style={{ fontSize: '15px', color: '#888', lineHeight: '1.82', margin: 0 }}
            >
              Computer Science student and Full-Stack Engineer who finds the intersection of backend
              systems, modern web, and computer vision genuinely exciting. I care deeply about building
              things that are deterministic, auditable, and production-ready — not just demos. Currently
              accelerating at{' '}
              <span style={{ color: '#D0D0D0', fontWeight: 500 }}>Cognizant</span> while architecting{' '}
              <span style={{ color: '#D0D0D0', fontWeight: 500 }}>SmartLogix</span> on the side.
            </motion.p>

            {/* Para 2 */}
            <motion.p
              variants={staggerItem}
              style={{ fontSize: '15px', color: '#888', lineHeight: '1.82', margin: 0 }}
            >
              Outside of work I spend time on LeetCode sharpening algorithmic thinking, reading about
              distributed systems, and exploring what's possible when modern ML meets real-world
              infrastructure.
            </motion.p>

            {/* Status chips */}
            <motion.div
              variants={staggerItem}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  fontSize: '12px',
                  fontWeight: 600,
                  background: 'rgba(34,197,94,0.09)',
                  border: '1px solid rgba(34,197,94,0.22)',
                  color: '#4ADE80',
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#22C55E',
                    boxShadow: '0 0 8px rgba(34,197,94,0.8)',
                    animation: 'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite',
                    flexShrink: 0,
                  }}
                />
                Currently @ Cognizant — GenC Intern
              </span>

              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  fontSize: '12px',
                  fontWeight: 600,
                  background: 'rgba(79,142,247,0.09)',
                  border: '1px solid rgba(79,142,247,0.25)',
                  color: '#93BBFF',
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#4F8EF7',
                    boxShadow: '0 0 8px rgba(79,142,247,0.8)',
                    animation: 'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite',
                    animationDelay: '0.4s',
                    flexShrink: 0,
                  }}
                />
                Open to full-time full-stack roles
              </span>
            </motion.div>

            {/* Feature pills */}
            <motion.div variants={staggerItem}>
              <p
                style={{
                  fontSize: '12px',
                  color: '#555',
                  fontWeight: 600,
                  marginBottom: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                What I bring:
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['End-to-end systems', 'Clean API design', 'Ship fast, ship right'].map((pill) => (
                  <span
                    key={pill}
                    style={{
                      padding: '5px 14px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontFamily:
                        'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                      fontWeight: 500,
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.09)',
                      color: '#999',
                    }}
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT — VS Code card ── */}
          <motion.div
            ref={codeRef}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            style={{
              background: '#0D1117',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '14px',
              overflow: 'hidden',
            }}
          >
            {/* Window chrome */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 16px',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(255,255,255,0.02)',
              }}
            >
              <span
                style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FF5F56', flexShrink: 0 }}
              />
              <span
                style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FFBD2E', flexShrink: 0 }}
              />
              <span
                style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27C93F', flexShrink: 0 }}
              />
              <span
                style={{
                  marginLeft: '8px',
                  fontSize: '12px',
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                  color: '#6E7681',
                }}
              >
                leo.config.ts
              </span>
            </div>

            {/* Code body */}
            <div
              style={{
                padding: '20px 20px 16px',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                fontSize: '13px',
                lineHeight: '1.75',
              }}
            >
              <motion.div
                variants={stagger(0.08)}
                initial="hidden"
                animate={codeInView ? 'show' : 'hidden'}
              >
                {codeLines.map((tokens, lineIdx) => (
                  <motion.div
                    key={lineIdx}
                    variants={{
                      hidden: { opacity: 0, y: 6 },
                      show: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.45, ease: CINEMATIC },
                      },
                    }}
                  >
                    {tokens.map((tok, i) => (
                      <span key={i} style={{ color: tok.color }}>
                        {tok.text}
                      </span>
                    ))}
                  </motion.div>
                ))}
              </motion.div>

              {/* Blinking cursor */}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                style={{
                  display: 'inline-block',
                  width: '2px',
                  height: '15px',
                  background: '#4F8EF7',
                  marginTop: '4px',
                  verticalAlign: 'middle',
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* ── Stats row ── */}
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          <StatCard value={500} label="LeetCode Problems" suffix="+" />
          <StatCard value={8.5} label="CGPA" suffix="/10" decimals={1} />
          <StatCard value={2} label="Production Projects" />
        </motion.div>
      </div>
    </section>
  );
}
