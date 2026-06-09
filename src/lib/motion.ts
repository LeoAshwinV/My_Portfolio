/* Shared motion variants — import wherever needed */

/** Standard ease — snappy, used for hover / micro-interactions */
export const EASE = [0.25, 0.1, 0.25, 1] as const;

/** Cinematic ease — explosive start, silky settle. Used for section entrances. */
export const CINEMATIC = [0.16, 1, 0.3, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.75, ease: CINEMATIC } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.6, ease: CINEMATIC } },
};

export const stagger = (delay = 0.07) => ({
  hidden: {},
  show:   { transition: { staggerChildren: delay } },
});

export const staggerItem = {
  hidden: { opacity: 0, y: 18, scale: 0.96 },
  show:   { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.6, ease: CINEMATIC } },
};

export const slideLeft = {
  hidden: { opacity: 0, x: -24 },
  show:   { opacity: 1, x: 0,  transition: { duration: 0.7, ease: CINEMATIC } },
};

export const viewport = { once: true, margin: '-72px' } as const;

/**
 * Mask reveal — text slides up from below its clip boundary.
 * Parent MUST have `overflow: hidden` (or `overflow-y: clip`) for the
 * cinema-curtain effect. Without it the element still enters smoothly but
 * the hard clip boundary isn't visible.
 */
/**
 * Pure clip reveal — NO opacity fade.
 * The overflow:hidden wrapper does the hiding; the text rises up from the
 * clip boundary exactly like Apple/Stripe section headers.
 * Parent MUST have `overflow: hidden` (or `overflow-y: clip`).
 */
export const maskReveal = {
  hidden: { y: '100%' },
  show:   { y: '0%', transition: { duration: 0.78, ease: CINEMATIC } },
};

/** Heavy entrance — for large hero-scale text or full-width cards */
export const heavyUp = {
  hidden: { opacity: 0, y: 56, scale: 0.97 },
  show:   { opacity: 1, y: 0,  scale: 1,   transition: { duration: 0.95, ease: CINEMATIC } },
};
