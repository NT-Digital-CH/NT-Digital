import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

interface ScrambleTitleProps {
  prefix: string;
  words: string[];
  className?: string;
  delay?: number;
}

export function ScrambleTitle({
  prefix,
  words,
  className = '',
  delay = 0.3,
}: ScrambleTitleProps) {
  const titleRef    = useRef<HTMLHeadingElement>(null);
  const prefixRef   = useRef<HTMLSpanElement>(null);
  const scrambleRef = useRef<HTMLSpanElement>(null);
  const cycleRef    = useRef<gsap.core.Timeline | null>(null);
  const timerRef    = useRef<ReturnType<typeof gsap.delayedCall> | null>(null);

  useEffect(() => {
    if (!prefixRef.current || !scrambleRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let splitInstance: InstanceType<typeof SplitText> | null = null;
    let idx = 0;

    const ctx = gsap.context(() => {
      // Split only the prefix — scramble span stays untouched
      splitInstance = new SplitText(prefixRef.current!, { type: 'chars' });

      gsap.from(splitInstance.chars, {
        opacity: 0,
        y: 60,
        rotateX: -90,
        stagger: 0.03,
        duration: 0.8,
        ease: 'back.out(1.7)',
        delay,
      });

      gsap.from(scrambleRef.current!, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        delay: delay + 0.3,
      });
    }, titleRef);

    function animateTypewriter(from: string, to: string, onDone: () => void) {
      const el = scrambleRef.current!;
      const tl = gsap.timeline({ onComplete: onDone });
      const deleteSpeed = 0.045;
      const typeSpeed   = 0.065;

      // Delete one char at a time from the right
      for (let i = from.length - 1; i >= 0; i--) {
        const snap = from.slice(0, i);
        tl.call(() => { el.textContent = snap; }, undefined, (from.length - 1 - i) * deleteSpeed);
      }

      // Short pause then type one char at a time
      const typeStart = from.length * deleteSpeed + 0.1;
      for (let i = 1; i <= to.length; i++) {
        const snap = to.slice(0, i);
        tl.call(() => { el.textContent = snap; }, undefined, typeStart + (i - 1) * typeSpeed);
      }

      cycleRef.current = tl;
    }

    function nextWord() {
      if (!scrambleRef.current) return;
      idx = (idx + 1) % words.length;
      const current = scrambleRef.current.textContent ?? words[(idx - 1 + words.length) % words.length];
      animateTypewriter(current, words[idx], () => {
        timerRef.current = gsap.delayedCall(2.5, nextWord);
      });
    }

    if (words.length > 1) {
      timerRef.current = gsap.delayedCall(delay + 1.9, nextWord);
    }

    return () => {
      ctx.revert();
      splitInstance?.revert();
      cycleRef.current?.kill();
      timerRef.current?.kill();
    };
  }, [prefix, words.join('\x00'), delay]);

  const reservedWidth = `${Math.max(...words.map((w) => w.length)) * 0.62}ch`;

  return (
    <h1 ref={titleRef} className={`scramble-title ${className}`.trim()}>
      <span ref={prefixRef}>{prefix}</span>
      <br />
      <span ref={scrambleRef} className="scramble-word" style={{ display: 'inline-block', width: reservedWidth }}>
        {words[0]}
      </span>
    </h1>
  );
}
