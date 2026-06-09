import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Module-level pub/sub — any component calls toast(), one <Toast /> renders it ── */
type Handler = (msg: string) => void;
const _listeners = new Set<Handler>();

export function toast(msg: string) {
  _listeners.forEach(fn => fn(msg));
}

/** Secure copy-to-clipboard; falls back to mailto on clipboard API denial */
export async function copyEmail(e?: { preventDefault?: () => void }) {
  e?.preventDefault?.();
  try {
    await navigator.clipboard.writeText('leoashwin22@gmail.com');
    toast('✓ Email copied to clipboard!');
  } catch {
    window.location.href = 'mailto:leoashwin22@gmail.com';
  }
}

export default function Toast() {
  const [msg, setMsg]   = useState<string | null>(null);
  const timer           = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const handler: Handler = (m) => {
      setMsg(m);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setMsg(null), 2200);
    };
    _listeners.add(handler);
    return () => {
      _listeners.delete(handler);
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <AnimatePresence>
      {msg && (
        <motion.div
          key="toast"
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 18, scale: 0.93 }}
          animate={{ opacity: 1, y: 0,  scale: 1     }}
          exit={{    opacity: 0, y: 10, scale: 0.93  }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          className="fixed bottom-28 left-1/2 -translate-x-1/2 z-[9997] flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-semibold pointer-events-none select-none whitespace-nowrap"
          style={{
            background:    'rgba(14,14,14,0.97)',
            border:        '1px solid rgba(34,197,94,0.35)',
            color:         '#4ADE80',
            backdropFilter:'blur(20px)',
            boxShadow:     '0 8px 32px rgba(34,197,94,0.14), 0 0 0 1px rgba(34,197,94,0.07)',
          }}
        >
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
          </svg>
          {msg}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
