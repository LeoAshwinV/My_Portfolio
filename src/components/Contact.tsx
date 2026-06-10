import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { maskReveal, stagger, staggerItem, viewport, CINEMATIC } from '../lib/motion';

const fieldVariants = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: CINEMATIC, delay: i * 0.07 },
  }),
};

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact - ${form.name}`);
    const body = encodeURIComponent(form.message);
    window.open(
      `mailto:leoashwin22@gmail.com?subject=${subject}&body=${body}`,
      '_blank'
    );
    setSent(true);
  }

  const inputStyle = (field: string): React.CSSProperties => ({
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: `1px solid ${focused === field ? 'rgba(79,130,247,0.5)' : 'rgba(255,255,255,0.08)'}`,
    borderRadius: '12px',
    padding: '12px 16px',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxShadow: focused === field ? '0 0 0 3px rgba(79,130,247,0.1)' : 'none',
    fontFamily: 'Inter, sans-serif',
  });

  return (
    <section
      id="contact"
      style={{
        background: 'linear-gradient(165deg,#09091A 0%,#0E0E0E 50%,#0A0A12 100%)',
        position: 'relative',
        overflow: 'hidden',
        padding: '100px 0 120px',
      }}
    >
      {/* Divider line top */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, #6366F1 30%, #4F82F7 70%, transparent 100%)',
          opacity: 0.5,
        }}
      />

      {/* Aurora blobs */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-40px',
          right: '-60px',
          width: '360px',
          height: '300px',
          background: 'rgba(99,102,241,0.20)',
          filter: 'blur(85px)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '-40px',
          width: '320px',
          height: '260px',
          background: 'rgba(79,130,247,0.18)',
          filter: 'blur(80px)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '72px' }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.5, ease: CINEMATIC }}
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#4F82F7',
              marginBottom: '16px',
            }}
          >
            Get In Touch
          </motion.p>

          <div style={{ overflow: 'hidden', display: 'inline-block' }}>
            <motion.h2
              variants={maskReveal}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(36px, 5vw, 56px)',
                fontWeight: 900,
                color: '#fff',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                margin: 0,
              }}
            >
              Let's Build Together
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.6, ease: CINEMATIC, delay: 0.15 }}
            style={{
              color: '#666',
              fontSize: '16px',
              marginTop: '20px',
              maxWidth: '520px',
              margin: '20px auto 0',
              lineHeight: 1.6,
            }}
          >
            Open to full-time full-stack roles and collaborative engineering opportunities. Let's talk.
          </motion.p>
        </div>

        {/* Two-column layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '48px',
            alignItems: 'start',
          }}
          className="contact-grid"
        >
          {/* LEFT — info */}
          <motion.div
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            {/* Info cards */}
            {[
              {
                icon: (
                  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                ),
                label: 'Email',
                value: 'leoashwin22@gmail.com',
                href: 'mailto:leoashwin22@gmail.com',
              },
              {
                icon: (
                  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                ),
                label: 'Location',
                value: 'Chennai, India',
                href: null,
              },
              {
                icon: (
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                  </svg>
                ),
                label: 'GitHub',
                value: 'github.com/LeoAshwin',
                href: 'https://github.com/LeoAshwin',
              },
            ].map((item) => (
              <motion.div key={item.label} variants={staggerItem}>
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      padding: '16px 20px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: '14px',
                      textDecoration: 'none',
                      transition: 'border-color 0.2s, background 0.2s',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = 'rgba(79,130,247,0.3)';
                      el.style.background = 'rgba(79,130,247,0.06)';
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = 'rgba(255,255,255,0.07)';
                      el.style.background = 'rgba(255,255,255,0.03)';
                    }}
                  >
                    <div style={{ color: '#4F82F7', flexShrink: 0 }}>{item.icon}</div>
                    <div>
                      <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2px' }}>{item.label}</p>
                      <p style={{ color: '#ccc', fontSize: '14px', fontWeight: 500 }}>{item.value}</p>
                    </div>
                  </a>
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      padding: '16px 20px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: '14px',
                    }}
                  >
                    <div style={{ color: '#4F82F7', flexShrink: 0 }}>{item.icon}</div>
                    <div>
                      <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2px' }}>{item.label}</p>
                      <p style={{ color: '#ccc', fontSize: '14px', fontWeight: 500 }}>{item.value}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            {/* Available badge */}
            <motion.div variants={staggerItem}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 18px',
                  background: 'rgba(34,197,94,0.08)',
                  border: '1px solid rgba(34,197,94,0.2)',
                  borderRadius: '100px',
                  marginTop: '8px',
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#22C55E',
                    flexShrink: 0,
                    boxShadow: '0 0 0 0 rgba(34,197,94,0.6)',
                    animation: 'pulse-green 2s infinite',
                  }}
                />
                <span style={{ color: '#22C55E', fontSize: '13px', fontWeight: 600 }}>Open to opportunities</span>
              </div>
            </motion.div>

            {/* Response time */}
            <motion.p
              variants={staggerItem}
              style={{ color: '#555', fontSize: '13px', marginTop: '4px' }}
            >
              ⚡ Typically responds within 24 hours
            </motion.p>
          </motion.div>

          {/* RIGHT — form */}
          <div>
            <AnimatePresence mode="wait">
              {!sent ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: CINEMATIC }}
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '20px',
                    padding: '36px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                  }}
                >
                  {/* Name */}
                  <motion.div
                    custom={0}
                    variants={fieldVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={viewport}
                  >
                    <label style={{
                      display: 'block',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '10px',
                      color: '#555',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      marginBottom: '8px',
                    }}>Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                      style={{ ...inputStyle('name'), caretColor: '#4F82F7' }}
                    />
                  </motion.div>

                  {/* Email */}
                  <motion.div
                    custom={1}
                    variants={fieldVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={viewport}
                  >
                    <label style={{
                      display: 'block',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '10px',
                      color: '#555',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      marginBottom: '8px',
                    }}>Email</label>
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      style={{ ...inputStyle('email'), caretColor: '#4F82F7' }}
                    />
                  </motion.div>

                  {/* Message */}
                  <motion.div
                    custom={2}
                    variants={fieldVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={viewport}
                  >
                    <label style={{
                      display: 'block',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '10px',
                      color: '#555',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      marginBottom: '8px',
                    }}>Message</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell me about your project or opportunity..."
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      style={{
                        ...inputStyle('message'),
                        resize: 'vertical',
                        minHeight: '120px',
                        caretColor: '#4F82F7',
                      }}
                    />
                  </motion.div>

                  {/* Submit */}
                  <motion.div
                    custom={3}
                    variants={fieldVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={viewport}
                  >
                    <motion.button
                      type="submit"
                      whileHover={{ y: -2, scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        width: '100%',
                        padding: '14px 24px',
                        background: 'linear-gradient(135deg, #4F8EF7, #8B5CF6)',
                        border: 'none',
                        borderRadius: '12px',
                        color: '#fff',
                        fontSize: '15px',
                        fontWeight: 700,
                        fontFamily: 'Inter, sans-serif',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        boxShadow: '0 4px 24px rgba(79,142,247,0.3)',
                      }}
                    >
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                      </svg>
                      Send Message
                    </motion.button>
                  </motion.div>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: CINEMATIC }}
                  style={{
                    background: 'rgba(34,197,94,0.06)',
                    border: '1px solid rgba(34,197,94,0.2)',
                    borderRadius: '20px',
                    padding: '48px 36px',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '16px',
                  }}
                >
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      background: 'rgba(34,197,94,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg width="28" height="28" fill="none" stroke="#22C55E" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <h3 style={{ color: '#22C55E', fontSize: '22px', fontWeight: 800, margin: 0, fontFamily: 'Inter, sans-serif' }}>
                    Message sent!
                  </h3>
                  <p style={{ color: '#666', fontSize: '15px', margin: 0, lineHeight: 1.6 }}>
                    I'll get back to you within 24 hours.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-green {
          0% { box-shadow: 0 0 0 0 rgba(34,197,94,0.6); }
          70% { box-shadow: 0 0 0 8px rgba(34,197,94,0); }
          100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
        }
        @media (min-width: 1024px) {
          .contact-grid {
            grid-template-columns: 45% 55% !important;
          }
        }
        .contact-grid input::placeholder,
        .contact-grid textarea::placeholder {
          color: #444;
        }
      `}</style>
    </section>
  );
}
