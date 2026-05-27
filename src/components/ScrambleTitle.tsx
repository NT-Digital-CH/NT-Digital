import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

interface ScrambleTitleProps {
  prefix: string;
  words: string[];
  className?: string;
  delay?: number;
  scrambleChars?: string;
}

export function ScrambleTitle({
  prefix,
  words,
  className = '',
  delay = 0.3,
  scrambleChars = 'NT01_',
}: ScrambleTitleProps) {
  const titleRef   = useRef<HTMLHeadingElement>(null);
  const scrambleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!titleRef.current || !scrambleRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let splitInstance: InstanceType<typeof SplitText> | null = null;

    const ctx = gsap.context(() => {
      splitInstance = new SplitText(titleRef.current!, { type: 'chars' });

      gsap.from(splitInstance.chars, {
        opacity: 0,
        y: 60,
        rotateX: -90,
        stagger: 0.03,
        duration: 0.8,
        ease: 'back.out(1.7)',
        delay,
      });

      if (words.length > 1) {
        let idx = 0;

        function nextScramble() {
          idx = (idx + 1) % words.length;
          gsap.to(scrambleRef.current!, {
            duration: 1.2,
            scrambleText: {
              text: words[idx],
              chars: scrambleChars,
              revealDelay: 0.3,
              speed: 0.4,
              delimiter: '',
            },
            ease: 'none',
            onComplete: () => gsap.delayedCall(2.5, nextScramble),
          });
        }

        gsap.delayedCall(delay + 1.9, nextScramble);
      }
    }, titleRef);

    return () => {
      ctx.revert();
      splitInstance?.revert();
    };
  }, [prefix, words, delay, scrambleChars]);

  return (
    <h1 ref={titleRef} className={`scramble-title ${className}`.trim()}>
      {prefix}
      <br />
      <span ref={scrambleRef} className="scramble-word">
        {words[0]}
      </span>
    </h1>
  );
}
