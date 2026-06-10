import { useState, useEffect } from 'react';

export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => {
      const viewH   = window.innerHeight;
      // Trigger line = 38% down the viewport (below navbar, above midscreen)
      const trigger = window.scrollY + viewH * 0.38;

      let current = '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        // Use offsetTop so it works even before layout paint
        if (el.offsetTop <= trigger) current = id;
      }
      setActive(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on mount so the initial section is highlighted
    return () => window.removeEventListener('scroll', onScroll);
  // ids is a stable array reference from Navbar — no need to re-run on its changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return active;
}
