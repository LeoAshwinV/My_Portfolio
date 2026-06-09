import { useScroll, useSpring, motion } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 origin-left"
      style={{
        scaleX,
        height: '2px',
        background: 'linear-gradient(90deg, #4F8EF7 0%, #A78BFA 50%, #22D3EE 100%)',
        zIndex: 9996,
      }}
    />
  );
}
