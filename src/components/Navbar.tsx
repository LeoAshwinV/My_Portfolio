import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useActiveSection } from '../hooks/useActiveSection';
import { EASE } from '../lib/motion';
import { openPalette } from './CommandPalette';

const links = [
  { label: 'Skills',     href: '#skills',     id: 'skills'     },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Projects',   href: '#projects',   id: 'projects'   },
  { label: 'Education',  href: '#education',  id: 'education'  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const activeSection = useActiveSection(links.map(l => l.id));

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
      style={scrolled ? {
        background: 'rgba(14,14,14,0.82)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 8px 48px rgba(0,0,0,0.7)',
      } : {}}
    >
      {/* Navbar bottom border — fades at both ends, softer when not scrolled */}
      <motion.div
        className="absolute bottom-0 inset-x-0 h-[1px]"
        animate={{ opacity: scrolled ? 0.65 : 0.2 }}
        transition={{ duration: 0.5 }}
        style={{
          background: 'linear-gradient(90deg, transparent 0%, transparent 8%, #4F8EF7 30%, #A78BFA 50%, #22D3EE 70%, transparent 92%, transparent 100%)',
        }}
      />

      <nav className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">

        {/* ── Logo / initials ── */}
        <a
          href="#hero"
          data-cursor
          className="flex items-center gap-2.5 flex-shrink-0 group"
          aria-label="Leo Ashwin V – Home"
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black tracking-tight transition-all duration-200 group-hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #4F8EF7 0%, #8B5CF6 100%)',
              boxShadow: '0 0 0 1px rgba(79,142,247,0.4), 0 4px 16px rgba(79,142,247,0.2)',
              color: '#fff',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            LA
          </div>
        </a>

        {/* Nav links */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map(l => {
            const isActive = activeSection === l.id;
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="relative px-4 py-2 rounded-xl text-sm font-semibold transition-colors duration-200 block overflow-hidden"
                  style={{ color: isActive ? '#fff' : '#555' }}
                >
                  {/* Animated active/hover bg pill */}
                  <motion.span
                    className="absolute inset-0 rounded-xl"
                    animate={{
                      opacity: isActive ? 1 : 0,
                      background: isActive
                        ? 'linear-gradient(135deg, rgba(79,142,247,0.16), rgba(167,139,250,0.16))'
                        : 'transparent',
                    }}
                    transition={{ duration: 0.25, ease: EASE }}
                  />
                  <span className="relative">{l.label}</span>
                  {/* Active dot indicator */}
                  {isActive && (
                    <motion.span
                      layoutId="active-dot"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ background: '#4F8EF7' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://github.com/LeoAshwin"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor
            className="p-2 rounded-xl transition-colors duration-200"
            style={{ color: '#444' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fff'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#444'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            aria-label="GitHub"
          >
            <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
            </svg>
          </a>

          {/* ⌘K palette trigger */}
          <button
            onClick={openPalette}
            data-cursor
            aria-label="Open command palette"
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-mono transition-all duration-200"
            style={{ color: '#555', border: '1px solid rgba(255,255,255,0.07)', background: 'transparent' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#999'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(79,142,247,0.3)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#555'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)'; }}
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <span>⌘K</span>
          </button>

          {/* Resume download */}
          <a
            href="/Leo_Ashwin_V_Resume.docx"
            download="Leo_Ashwin_V_Resume.docx"
            data-cursor
            aria-label="Download Resume"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all duration-200"
            style={{ color: '#4F8EF7', border: '1px solid rgba(79,142,247,0.25)', background: 'rgba(79,142,247,0.06)' }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(79,142,247,0.14)'; el.style.borderColor = 'rgba(79,142,247,0.5)'; el.style.color = '#7EB3FF'; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(79,142,247,0.06)'; el.style.borderColor = 'rgba(79,142,247,0.25)'; el.style.color = '#4F8EF7'; }}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17v3a1 1 0 001 1h16a1 1 0 001-1v-3"/>
            </svg>
            Resume
          </a>

          <div className="w-px h-5 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }} />

          <a
            href="mailto:leoashwin22@gmail.com"
            data-cursor
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white relative overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg,#4F8EF7 0%,#8B5CF6 100%)',
              boxShadow: '0 0 0 1px rgba(79,142,247,0.5), 0 4px 24px rgba(79,142,247,0.25)',
            }}
          >
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.18) 50%, transparent 65%)' }}
            />
            <svg className="w-3.5 h-3.5 relative" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <span className="relative">Hire Me</span>
          </a>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden p-2 rounded-xl transition-all"
          style={{ color: '#777' }}
          onClick={() => setOpen(!open)}
          aria-label="menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
            }
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="md:hidden px-5 py-3 flex flex-col gap-1"
            style={{
              background: 'rgba(14,14,14,0.97)',
              backdropFilter: 'blur(28px)',
              borderTop: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {links.map(l => (
              <a
                key={l.href} href={l.href}
                className="px-4 py-3 rounded-xl text-sm font-semibold transition-all"
                style={{ color: activeSection === l.id ? '#fff' : '#666', background: activeSection === l.id ? 'rgba(79,142,247,0.1)' : 'transparent' }}
                onClick={() => setOpen(false)}
              >{l.label}</a>
            ))}
            <a
              href="/Leo_Ashwin_V_Resume.docx"
              download="Leo_Ashwin_V_Resume.docx"
              className="mt-1 px-4 py-3 rounded-xl text-sm font-bold text-center flex items-center justify-center gap-2"
              style={{ color: '#4F8EF7', border: '1px solid rgba(79,142,247,0.3)', background: 'rgba(79,142,247,0.08)' }}
              onClick={() => setOpen(false)}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17v3a1 1 0 001 1h16a1 1 0 001-1v-3"/>
              </svg>
              Download Resume
            </a>
            <a
              href="mailto:leoashwin22@gmail.com"
              className="px-4 py-3 rounded-xl text-sm font-bold text-white text-center"
              style={{ background: 'linear-gradient(135deg,#4F8EF7,#8B5CF6)' }}
              onClick={() => setOpen(false)}
            >Hire Me</a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
