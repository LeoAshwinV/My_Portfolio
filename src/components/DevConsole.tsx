import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useActiveSection } from '../hooks/useActiveSection';

type LogType = 'info' | 'success' | 'warn';
type LogEntry = { id: number; type: LogType; text: string; ts: string };

const LOGS: Record<string, { type: LogType; text: string }[]> = {
  hero: [
    { type: 'info',    text: 'Portfolio v2.0.0 initialized' },
    { type: 'success', text: 'WebGL context acquired · three.js r168' },
    { type: 'info',    text: 'Lenis scroll engine: active' },
  ],
  skills: [
    { type: 'info',    text: 'Loading tech stack configuration...' },
    { type: 'success', text: 'Java 21 · Spring Boot 3.x: READY' },
    { type: 'success', text: 'React 19 renderer: MOUNTED' },
    { type: 'info',    text: 'REST API layer: CONFIGURED' },
  ],
  experience: [
    { type: 'info',    text: 'Initializing JWT Security Filter Chain...' },
    { type: 'success', text: 'Spring Security context: LOADED' },
    { type: 'success', text: 'Agile sprint board: SYNCED' },
    { type: 'info',    text: 'Cognizant GenC FSE env: ACTIVE' },
  ],
  projects: [
    { type: 'info',    text: 'Compiling SmartLogix manifest service...' },
    { type: 'success', text: 'Deterministic routing engine: READY' },
    { type: 'info',    text: 'Loading YOLO v11 weights (52.8 MB)...' },
    { type: 'success', text: 'Inference pipeline latency: stable <12ms' },
  ],
  education: [
    { type: 'info',    text: 'Verifying academic credentials...' },
    { type: 'success', text: 'Oracle GenAI certification: VERIFIED' },
    { type: 'success', text: 'LeetCode 500+ problems: CONFIRMED' },
    { type: 'success', text: 'SIH 2024 Top 20 finalist: LOGGED' },
  ],
};

const COLOR: Record<LogType, string> = {
  info:    '#4F8EF7',
  success: '#22C55E',
  warn:    '#FBBF24',
};

const stamp = () => new Date().toLocaleTimeString('en', { hour12: false });
let uid = 0;

export default function DevConsole() {
  const [logs, setLogs]       = useState<LogEntry[]>(() => [
    { id: uid++, type: 'info',    text: 'Portfolio v2.0.0 ready',         ts: stamp() },
    { id: uid++, type: 'success', text: 'WebGL renderer initialized',     ts: stamp() },
    { id: uid++, type: 'info',    text: 'Awaiting section focus...',      ts: stamp() },
  ]);
  const [minimized, setMin]   = useState(false);
  const bodyRef               = useRef<HTMLDivElement>(null);
  const lastSec               = useRef('');

  const active = useActiveSection(['hero', 'skills', 'experience', 'projects', 'education']);

  useEffect(() => {
    if (!active || active === lastSec.current) return;
    lastSec.current = active;
    const entries = (LOGS[active] ?? []).map((e, i) => ({
      id: uid++, type: e.type, text: e.text, ts: stamp(),
      _i: i, // used only internally for ordering
    }));
    // Stagger entries into state one by one
    entries.forEach((e, i) => {
      setTimeout(() => {
        setLogs(prev => [...prev, e].slice(-24));
      }, i * 320);
    });
  }, [active]);

  // Auto-scroll
  useEffect(() => {
    if (bodyRef.current && !minimized) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [logs, minimized]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 2.4 }}
      className="hidden lg:block fixed bottom-6 left-6 z-40 w-[288px] select-none"
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      <div
        className="rounded-xl overflow-hidden"
        style={{
          background: 'rgba(8,8,8,0.93)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.07)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.65)',
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center justify-between px-3 py-2"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="flex items-center gap-2.5">
            {/* Traffic lights */}
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#EF4444', opacity: 0.65 }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#FBBF24', opacity: 0.65 }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#22C55E', opacity: 0.65 }} />
            </div>
            <span className="text-[10px]" style={{ color: '#888' }}>leo@ashwin — system log</span>
          </div>
          <button
            data-cursor
            onClick={() => setMin(m => !m)}
            className="text-[10px] px-1.5 py-0.5 rounded transition-colors"
            style={{ color: '#666' }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#ccc')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#666')}
            aria-label={minimized ? 'Expand console' : 'Minimize console'}
          >
            {minimized ? '▲' : '▼'}
          </button>
        </div>

        {/* Log body */}
        <AnimatePresence initial={false}>
          {!minimized && (
            <motion.div
              key="body"
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.22 }}
              style={{ overflow: 'hidden' }}
            >
              <div
                ref={bodyRef}
                className="overflow-y-auto px-3 pt-2 pb-1 space-y-1"
                style={{ maxHeight: '172px', scrollbarWidth: 'none' }}
              >
                <AnimatePresence initial={false}>
                  {logs.map(log => (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-start gap-1.5 text-[10px] leading-[1.6]"
                    >
                      <span className="flex-shrink-0" style={{ color: '#555' }}>{log.ts}</span>
                      <span className="flex-shrink-0 font-bold" style={{ color: COLOR[log.type] }}>
                        [{log.type.toUpperCase()}]
                      </span>
                      <span style={{ color: '#B0B0B0' }}>{log.text}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              {/* Prompt line */}
              <div className="px-3 pb-2.5 pt-1 flex items-center gap-1 text-[10px]" style={{ color: '#22C55E' }}>
                <span>$</span>
                <span className="inline-block w-[6px] h-[11px]"
                  style={{ background: '#22C55E', animation: 'blink 1s step-end infinite' }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
