import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { copyEmail } from './Toast';

/* ── Module-level open trigger so Navbar ⌘K badge can call it ── */
type VoidFn = () => void;
const _openListeners = new Set<VoidFn>();
export function openPalette() { _openListeners.forEach(fn => fn()); }

/* ── Command definitions ── */
type Command = {
  id:     string;
  group:  string;
  label:  string;
  sub:    string;
  icon:   React.ReactNode;
  kbd?:   string;
  action: () => void;
};

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

const GH_ICON = (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
  </svg>
);

const LI_ICON = (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const MAIL_ICON = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
  </svg>
);

const COMMANDS: Command[] = [
  // Navigate
  { id:'nav-hero',       group:'Navigate',      label:'Home',         sub:'Back to the top',                        icon:'🏠', action: () => scrollTo('hero')       },
  { id:'nav-skills',     group:'Navigate',      label:'Skills',       sub:'Technical expertise & stack',            icon:'⚡', action: () => scrollTo('skills')     },
  { id:'nav-experience', group:'Navigate',      label:'Experience',   sub:'Cognizant · GenC Intern',                icon:'💼', action: () => scrollTo('experience') },
  { id:'nav-projects',   group:'Navigate',      label:'Projects',     sub:'SmartLogix · Video Analytics',           icon:'🛠️', action: () => scrollTo('projects')   },
  { id:'nav-education',  group:'Navigate',      label:'Education',    sub:'B.E. CSE · Achievements',                icon:'🎓', action: () => scrollTo('education')  },
  // Quick Actions
  { id:'copy-email',     group:'Quick Actions', label:'Copy Email',   sub:'leoashwin22@gmail.com',                  icon:'📋', action: () => copyEmail()            },
  { id:'send-email',     group:'Quick Actions', label:'Send Email',   sub:'Open mail client',                       icon: MAIL_ICON, action: () => { window.location.href = 'mailto:leoashwin22@gmail.com'; } },
  { id:'open-github',    group:'Quick Actions', label:'GitHub',       sub:'github.com/LeoAshwin',                   icon: GH_ICON, action: () => window.open('https://github.com/LeoAshwin','_blank')                        },
  { id:'open-linkedin',  group:'Quick Actions', label:'LinkedIn',     sub:'linkedin.com/in/leo-ashwin-859b99256',   icon: LI_ICON, action: () => window.open('https://linkedin.com/in/leo-ashwin-859b99256','_blank')       },
];

/* ── Fuzzy match: exact substring = 2pts, subsequence = 1pt, no match = 0 ── */
function fuzzyScore(query: string, cmd: Command): number {
  if (!query.trim()) return 1;
  const q = query.toLowerCase();
  const hay = `${cmd.label} ${cmd.sub}`.toLowerCase();
  if (hay.includes(q)) return 2;
  let qi = 0;
  for (let i = 0; i < hay.length && qi < q.length; i++) {
    if (hay[i] === q[qi]) qi++;
  }
  return qi === q.length ? 1 : 0;
}

export default function CommandPalette() {
  const [open,   setOpen]   = useState(false);
  const [query,  setQuery]  = useState('');
  const [cursor, setCursor] = useState(0);
  const inputRef            = useRef<HTMLInputElement>(null);
  const listRef             = useRef<HTMLDivElement>(null);

  /* Open/close listeners */
  useEffect(() => {
    const openHandler: VoidFn = () => setOpen(o => !o);
    _openListeners.add(openHandler);
    return () => { _openListeners.delete(openHandler); };
  }, []);

  /* Global ⌘K / Ctrl+K and Escape */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setOpen(o => !o); }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  /* Focus input on open, reset state */
  useEffect(() => {
    if (open) {
      setQuery('');
      setCursor(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  /* Flat list of matching commands */
  const filtered = useMemo(() =>
    COMMANDS
      .map(cmd => ({ cmd, score: fuzzyScore(query, cmd) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ cmd }) => cmd),
  [query]);

  /* Flat rows: interleaved group headers + items with stable flat indices */
  const rows = useMemo(() => {
    type Row =
      | { kind: 'header'; label: string }
      | { kind: 'item';   cmd: Command; idx: number };
    const result: Row[] = [];
    let i = 0;
    const seen = new Set<string>();
    for (const cmd of filtered) {
      if (!seen.has(cmd.group)) { seen.add(cmd.group); result.push({ kind: 'header', label: cmd.group }); }
      result.push({ kind: 'item', cmd, idx: i++ });
    }
    return result;
  }, [filtered]);

  /* Reset cursor when results change */
  useEffect(() => { setCursor(0); }, [query]);

  /* Scroll active item into view */
  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-idx="${cursor}"]`)
      ?.scrollIntoView({ block: 'nearest' });
  }, [cursor]);

  const execute = useCallback((cmd: Command) => {
    setOpen(false);
    setQuery('');
    setTimeout(() => cmd.action(), 100); // let exit animation start
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setCursor(c => Math.min(c + 1, filtered.length - 1)); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setCursor(c => Math.max(c - 1, 0)); }
    if (e.key === 'Enter' && filtered[cursor]) execute(filtered[cursor]);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cp-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[9993]"
            style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            key="cp-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, scale: 0.96, y: -20 }}
            animate={{ opacity: 1, scale: 1,    y: 0   }}
            exit={{    opacity: 0, scale: 0.96,  y: -12 }}
            transition={{ type: 'spring', stiffness: 440, damping: 32 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[9994] w-[calc(100%-2rem)] max-w-[560px] rounded-2xl overflow-hidden"
            style={{
              background:    'rgba(10,10,10,0.98)',
              border:        '1px solid rgba(255,255,255,0.1)',
              boxShadow:     '0 40px 100px rgba(0,0,0,0.85), 0 0 0 1px rgba(79,142,247,0.18)',
              fontFamily:    'Inter, sans-serif',
            }}
          >
            {/* ── Search bar ── */}
            <div className="flex items-center gap-3 px-4 py-3.5"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              <svg className="w-4 h-4 flex-shrink-0" style={{ color: '#888' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search sections or actions…"
                aria-autocomplete="list"
                aria-controls="cp-list"
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-[#555]"
                style={{ color: '#E8E8E8' }}
              />
              <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono flex-shrink-0"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#888' }}>
                ESC
              </kbd>
            </div>

            {/* ── Results ── */}
            <div
              ref={listRef}
              id="cp-list"
              role="listbox"
              className="overflow-y-auto py-2"
              style={{ maxHeight: '380px', scrollbarWidth: 'none' }}
            >
              {filtered.length === 0 ? (
                <p className="py-12 text-center text-sm" style={{ color: '#666' }}>
                  No results for <span style={{ color: '#999' }}>"{query}"</span>
                </p>
              ) : (
                rows.map((row, ri) =>
                  row.kind === 'header' ? (
                    <p key={`h-${ri}`}
                      className="px-4 pt-3 pb-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.18em]"
                      style={{ color: '#666' }}>
                      {row.label}
                    </p>
                  ) : (
                    <motion.button
                      key={row.cmd.id}
                      data-idx={row.idx}
                      role="option"
                      aria-selected={cursor === row.idx}
                      onClick={() => execute(row.cmd)}
                      onMouseEnter={() => setCursor(row.idx)}
                      className="w-full flex items-center gap-3.5 px-4 py-2.5 text-left"
                      animate={{
                        background: cursor === row.idx ? 'rgba(79,142,247,0.1)' : 'rgba(0,0,0,0)',
                        borderLeftColor: cursor === row.idx ? '#4F8EF7' : 'transparent',
                      }}
                      transition={{ duration: 0.1 }}
                      style={{ borderLeft: '2px solid transparent' }}
                    >
                      {/* Icon */}
                      <span
                        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-sm"
                        style={{
                          background: cursor === row.idx ? 'rgba(79,142,247,0.14)' : 'rgba(255,255,255,0.04)',
                          color: cursor === row.idx ? '#4F8EF7' : '#555',
                          border: '1px solid rgba(255,255,255,0.06)',
                          transition: 'background 0.1s, color 0.1s',
                        }}
                      >{row.cmd.icon}</span>

                      {/* Label + sub */}
                      <span className="flex-1 min-w-0">
                        <span className="block text-sm font-medium"
                          style={{ color: cursor === row.idx ? '#fff' : '#BBBBBB' }}>
                          {row.cmd.label}
                        </span>
                        <span className="block text-[11px] truncate font-mono"
                          style={{ color: cursor === row.idx ? '#4F8EF7' : '#777' }}>
                          {row.cmd.sub}
                        </span>
                      </span>

                      {/* Enter badge on active */}
                      {cursor === row.idx && (
                        <motion.kbd
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex-shrink-0 px-1.5 py-0.5 rounded text-[10px] font-mono"
                          style={{ background: 'rgba(79,142,247,0.15)', border: '1px solid rgba(79,142,247,0.3)', color: '#4F8EF7' }}
                        >↵</motion.kbd>
                      )}
                    </motion.button>
                  )
                )
              )}
            </div>

            {/* ── Footer hint bar ── */}
            <div className="px-4 py-2.5 flex items-center gap-5"
              style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              {[['↑↓','navigate'], ['↵','select'], ['ESC','close']].map(([k, h]) => (
                <span key={k} className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#888' }}>{k}</kbd>
                  <span className="text-[10px]" style={{ color: '#666' }}>{h}</span>
                </span>
              ))}
              <span className="ml-auto flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono"
                  style={{ background: 'rgba(79,142,247,0.08)', border: '1px solid rgba(79,142,247,0.2)', color: '#4F8EF7' }}>⌘K</kbd>
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
