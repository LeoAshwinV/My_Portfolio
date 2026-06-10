import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { CINEMATIC } from '../lib/motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function IntroLoader({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotion();
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Skip intro entirely for reduced-motion users or repeat visits
    if (reduced || sessionStorage.getItem('intro')) {
      onDone();
      return;
    }

    // After 1.8s mark session and start the slide-up exit
    const t = setTimeout(() => {
      sessionStorage.setItem('intro', '1');
      setExiting(true);
    }, 1800);

    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Render nothing when we should skip (effect fires onDone synchronously)
  if (reduced || sessionStorage.getItem('intro')) return null;

  return (
    <motion.div
      initial={{ y: '0%' }}
      animate={exiting ? { y: '-100%' } : { y: '0%' }}
      transition={{ duration: 0.7, ease: CINEMATIC }}
      onAnimationComplete={() => { if (exiting) onDone(); }}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#07071C',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Center content */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        {/* Name — pure mask reveal: overflow:hidden clips the text at the boundary,
            child rises from y:100% to y:0% with no opacity change */}
        <div style={{ overflow: 'hidden' }}>
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.8, ease: CINEMATIC }}
            style={{
              fontSize: '80px',
              fontWeight: 900,
              color: '#ffffff',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              margin: 0,
            }}
          >
            LEO ASHWIN V
          </motion.h1>
        </div>

        {/* Subtitle fades in after name settles */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7, ease: CINEMATIC }}
          style={{
            fontSize: '12px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            letterSpacing: '0.25em',
            color: '#4F8EF7',
            margin: 0,
          }}
        >
          FULL-STACK ENGINEER
        </motion.p>
      </div>

      {/* Thin progress bar pinned to the bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'rgba(255,255,255,0.06)',
        }}
      >
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.4, ease: 'linear' }}
          style={{
            height: '100%',
            background: '#4F8EF7',
            boxShadow: '0 0 12px rgba(79,142,247,0.8)',
          }}
        />
      </div>
    </motion.div>
  );
}
