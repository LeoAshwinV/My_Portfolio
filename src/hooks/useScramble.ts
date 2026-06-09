import { useState, useEffect } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&!?';

export function useScramble(text: string, delay = 400) {
  const [output, setOutput] = useState(text);

  useEffect(() => {
    let iter = 0;
    let interval: ReturnType<typeof setInterval>;

    const start = setTimeout(() => {
      interval = setInterval(() => {
        setOutput(
          text.split('').map((char, idx) => {
            if (char === ' ') return ' ';
            if (idx < iter) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          }).join('')
        );
        iter += 0.34;
        if (iter >= text.length) {
          setOutput(text);
          clearInterval(interval);
        }
      }, 28);
    }, delay);

    return () => { clearTimeout(start); clearInterval(interval); };
  }, [text, delay]);

  return output;
}
