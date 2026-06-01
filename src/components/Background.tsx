import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';

type ShapeProps = {
  className: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient: string;
  mobileHidden?: boolean;
};

type ShapeStyle = CSSProperties & {
  '--shape-width': string;
  '--shape-height': string;
  '--shape-gradient': string;
};

type AmbientShapeProps = {
  className: string;
  delay?: number;
  mobileHidden?: boolean;
  opacity?: number;
  rotate?: number;
};

const revealTransition = {
  duration: 2.4,
  ease: [0.23, 0.86, 0.39, 0.96],
  opacity: { duration: 1.2 },
} as const;

const floatTransition = {
  duration: 18,
  repeat: Number.POSITIVE_INFINITY,
  ease: 'easeInOut',
} as const;

const breatheTransition = {
  duration: 16,
  repeat: Number.POSITIVE_INFINITY,
  ease: 'easeInOut',
} as const;

function useIsMobileBackground() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(query.matches);

    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return isMobile;
}

function shapeClass(baseClass: string, className: string, mobileHidden = false) {
  return `${baseClass} ${className}${mobileHidden ? ' background-shape-mobile-hidden' : ''}`;
}

function BackgroundPill({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient,
  mobileHidden = false,
}: ShapeProps) {
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsMobileBackground();
  const floatX = isMobile ? 8 : 14;
  const floatY = isMobile ? 14 : 26;
  const rotateDrift = isMobile ? 1.4 : 3;
  const style: ShapeStyle = {
    '--shape-width': `${width}px`,
    '--shape-height': `${height}px`,
    '--shape-gradient': gradient,
  };

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{
        ...revealTransition,
        delay,
      }}
      className={shapeClass('background-shape', className, mobileHidden)}
    >
      <motion.div
        animate={
          shouldReduceMotion
            ? undefined
            : { x: [0, floatX, 0], y: [0, floatY, 0], rotate: [0, rotateDrift, 0] }
        }
        transition={{ ...floatTransition, duration: isMobile ? 24 : 20 }}
        className="background-shape-float"
        style={style}
      >
        <div className="background-shape-surface" />
      </motion.div>
    </motion.div>
  );
}

function AmbientShape({
  className,
  delay = 0,
  mobileHidden = false,
  opacity = 0.7,
  rotate = 0,
  children,
}: AmbientShapeProps & { children: (isMobile: boolean, shouldReduceMotion: boolean | null) => ReactNode }) {
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsMobileBackground();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: -150, rotate: rotate - 6 }}
      animate={{ opacity, y: 0, rotate }}
      transition={{
        ...revealTransition,
        delay,
      }}
      className={shapeClass('background-ambient', className, mobileHidden)}
    >
      {children(isMobile, shouldReduceMotion)}
    </motion.div>
  );
}

function BackgroundOrb(props: AmbientShapeProps) {
  return (
    <AmbientShape {...props} className={`background-orb ${props.className}`}>
      {(isMobile, shouldReduceMotion) => (
        <motion.div
          className="background-ambient-float"
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  scale: [1, isMobile ? 1.035 : 1.06, 1],
                  opacity: [0.82, 1, 0.82],
                  x: [0, isMobile ? 10 : 20, 0],
                  y: [0, isMobile ? -12 : -22, 0],
                }
          }
          transition={{ ...breatheTransition, duration: isMobile ? 24 : 22 }}
        />
      )}
    </AmbientShape>
  );
}

function BackgroundLine(props: AmbientShapeProps) {
  return (
    <AmbientShape {...props} className={`background-line ${props.className}`}>
      {(isMobile, shouldReduceMotion) => (
        <motion.div
          className="background-ambient-float"
          animate={
            shouldReduceMotion
              ? undefined
              : { opacity: [0.35, 0.95, 0.35], x: [0, isMobile ? 6 : 14, 0], y: [0, isMobile ? -3 : -7, 0] }
          }
          transition={{ ...breatheTransition, duration: isMobile ? 22 : 18 }}
        />
      )}
    </AmbientShape>
  );
}

function BackgroundPanel(props: AmbientShapeProps) {
  return (
    <AmbientShape {...props} className={`background-panel ${props.className}`}>
      {(isMobile, shouldReduceMotion) => (
        <motion.div
          className="background-ambient-float"
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [0, isMobile ? 6 : 12, 0],
                  y: [0, isMobile ? -12 : -20, 0],
                  rotate: [0, isMobile ? 0.8 : 1.6, 0],
                  opacity: [0.7, 0.96, 0.7],
                }
          }
          transition={{ ...floatTransition, duration: isMobile ? 24 : 22 }}
        />
      )}
    </AmbientShape>
  );
}

export function Background() {
  return (
    <div className="site-background" aria-hidden="true">
      <div className="site-background-glow" />
      <div className="site-background-shapes">
        <BackgroundOrb className="background-orb-large" delay={0.2} opacity={0.58} />
        <BackgroundOrb className="background-orb-small" delay={0.65} opacity={0.52} />
        <BackgroundLine className="background-line-one" delay={0.45} opacity={0.48} rotate={-18} mobileHidden />
        <BackgroundLine className="background-line-accent" delay={0.7} opacity={0.34} rotate={16} mobileHidden />
        <BackgroundPanel className="background-panel-one" delay={0.55} opacity={0.46} rotate={-6} mobileHidden />
        <BackgroundPill
          delay={0.3}
          width={420}
          height={96}
          rotate={11}
          gradient="oklch(58% 0.2 268 / 0.19)"
          className="background-shape-one"
        />
        <BackgroundPill
          delay={0.5}
          width={280}
          height={70}
          rotate={-14}
          gradient="oklch(70% 0.16 20 / 0.16)"
          className="background-shape-two"
        />
        <BackgroundPill
          delay={0.6}
          width={500}
          height={112}
          rotate={-10}
          gradient="oklch(67% 0.14 305 / 0.12)"
          className="background-shape-three"
          mobileHidden
        />
      </div>
      <div className="site-background-vignette" />
    </div>
  );
}
