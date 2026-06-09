import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function Cursor() {
  const reduced = useReducedMotion();
  // When reduced motion is requested restore the native cursor and render nothing
  if (reduced) return null;
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);

  const cfg = { stiffness: 320, damping: 28, mass: 0.4 };
  const rx = useSpring(mx, cfg);
  const ry = useSpring(my, cfg);

  const dotScale  = useSpring(1, { stiffness: 400, damping: 22 });
  const ringScale = useSpring(1, { stiffness: 280, damping: 22 });
  const ringOpacity = useSpring(0.55, { stiffness: 300, damping: 22 });

  useEffect(() => {
    const move = (e: MouseEvent) => { mx.set(e.clientX); my.set(e.clientY); };

    const enter = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button, [data-cursor]')) {
        dotScale.set(0);
        ringScale.set(1.9);
        ringOpacity.set(0.9);
      }
    };
    const leave = () => {
      dotScale.set(1);
      ringScale.set(1);
      ringOpacity.set(0.55);
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', enter);
    window.addEventListener('mouseout', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', enter);
      window.removeEventListener('mouseout', leave);
    };
  }, []);

  return (
    <>
      {/* Dot — tracks instantly, GPU layer forced via will-change */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ x: mx, y: my, translateX: '-50%', translateY: '-50%', willChange: 'transform' }}
      >
        <motion.div
          className="w-[5px] h-[5px] rounded-full bg-white mix-blend-difference"
          style={{ scale: dotScale }}
        />
      </motion.div>

      {/* Ring — spring lag, GPU layer forced */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%', willChange: 'transform' }}
      >
        <motion.div
          className="w-[34px] h-[34px] rounded-full border border-white mix-blend-difference"
          style={{ scale: ringScale, opacity: ringOpacity }}
        />
      </motion.div>
    </>
  );
}
