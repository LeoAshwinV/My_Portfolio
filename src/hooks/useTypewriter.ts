import { useState, useEffect } from 'react';

export function useTypewriter(
  words: string[],
  typeSpeed = 72,
  deleteSpeed = 36,
  pause = 2500,
) {
  const [output, setOutput]   = useState('');
  const [idx, setIdx]         = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[idx % words.length];
    let t: ReturnType<typeof setTimeout>;

    if (!deleting && output.length < word.length) {
      t = setTimeout(() => setOutput(word.slice(0, output.length + 1)), typeSpeed);
    } else if (!deleting && output.length === word.length) {
      t = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && output.length > 0) {
      t = setTimeout(() => setOutput(word.slice(0, output.length - 1)), deleteSpeed);
    } else {
      setDeleting(false);
      setIdx(i => i + 1);
    }

    return () => clearTimeout(t);
  }, [output, deleting, idx, words, typeSpeed, deleteSpeed, pause]);

  return output;
}
