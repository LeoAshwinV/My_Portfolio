import { useState, useEffect } from 'react';

export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState('');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.25, rootMargin: '-10% 0px -55% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, [ids]);

  return active;
}
