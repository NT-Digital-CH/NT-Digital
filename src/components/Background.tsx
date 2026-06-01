import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';

const revealTransition = {
  duration: 1.35,
  ease: [0.22, 1, 0.36, 1],
} as const;

const calmFloat = {
  repeat: Number.POSITIVE_INFINITY,
  ease: 'easeInOut',
} as const;

type FloatLayerProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  floatX?: number;
  floatY?: number;
  floatRotate?: number;
  opacity?: number;
  rotate?: number;
  depthTransform?: string;
  style: CSSProperties;
};

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

function FloatLayer({
  children,
  delay = 0,
  duration = 22,
  floatX = 12,
  floatY = -14,
  floatRotate = 1,
  opacity = 1,
  rotate = 0,
  depthTransform,
  style,
}: FloatLayerProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 28, rotate: rotate - 1.4, scale: 0.985 }}
      animate={{ opacity, y: 0, rotate, scale: 1 }}
      transition={{ ...revealTransition, delay }}
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        transformStyle: 'preserve-3d',
        willChange: 'transform, opacity',
        ...style,
      }}
    >
      <motion.div
        animate={
          shouldReduceMotion
            ? undefined
            : {
                x: [0, floatX, 0],
                y: [0, floatY, 0],
                rotate: [0, floatRotate, 0],
              }
        }
        transition={{ ...calmFloat, duration }}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            transform: depthTransform,
            transformStyle: 'preserve-3d',
          }}
        >
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}

function SkeletonLine({ width, marginTop = 0, opacity = 0.7 }: { width: string; marginTop?: number; opacity?: number }) {
  return (
    <span
      style={{
        display: 'block',
        width,
        height: 2,
        marginTop,
        borderRadius: 999,
        opacity,
        background:
          'linear-gradient(90deg, rgba(78, 107, 255, 0.1), rgba(127, 121, 255, 0.66) 44%, rgba(96, 187, 255, 0.22) 74%, rgba(78, 107, 255, 0.045))',
        boxShadow: '0 0 12px rgba(78, 107, 255, 0.14)',
      }}
    />
  );
}

function BrowserDots({ compact = false }: { compact?: boolean }) {
  return (
    <div style={{ display: 'flex', gap: compact ? 7 : 9, alignItems: 'center' }}>
      {[0, 1, 2].map((dot) => (
        <span
          key={dot}
          style={{
            width: compact ? 6 : 9,
            height: compact ? 6 : 9,
            borderRadius: 999,
            border: '1px solid rgba(132, 116, 255, 0.72)',
            background: dot === 1 ? 'rgba(78, 107, 255, 0.24)' : 'rgba(8, 11, 20, 0.2)',
            boxShadow: '0 0 14px rgba(78, 107, 255, 0.23)',
          }}
        />
      ))}
    </div>
  );
}

function ImagePlaceholder() {
  return (
    <div
      style={{
        height: '100%',
        minHeight: 152,
        borderRadius: 8,
        border: '1px solid rgba(138, 132, 255, 0.36)',
        background:
          'linear-gradient(135deg, rgba(51, 92, 255, 0.075), rgba(8, 11, 20, 0.04) 58%), radial-gradient(circle at 28% 20%, rgba(165, 107, 255, 0.08), transparent 46%)',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 0 26px rgba(51, 92, 255, 0.055)',
      }}
    >
      <span
        style={{
          position: 'absolute',
          left: '22%',
          bottom: 32,
          width: 92,
          height: 92,
          borderLeft: '1px solid rgba(132, 126, 255, 0.27)',
          borderTop: '1px solid rgba(132, 126, 255, 0.27)',
          transform: 'rotate(45deg)',
        }}
      />
      <span
        style={{
          position: 'absolute',
          left: '55%',
          bottom: 30,
          width: 70,
          height: 70,
          borderLeft: '1px solid rgba(132, 126, 255, 0.22)',
          borderTop: '1px solid rgba(132, 126, 255, 0.22)',
          transform: 'rotate(45deg)',
        }}
      />
      <span
        style={{
          position: 'absolute',
          inset: 'auto -18% 34% -12%',
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(78, 107, 255, 0.26), transparent)',
          transform: 'rotate(-18deg)',
        }}
      />
    </div>
  );
}

function GhostMobilePanel({ isMobile = false }: { isMobile?: boolean }) {
  return (
    <div
      style={{
        position: 'absolute',
        right: isMobile ? -42 : 22,
        bottom: isMobile ? -20 : -48,
        width: isMobile ? 126 : 168,
        height: isMobile ? 170 : 224,
        borderRadius: 9,
        border: '1px solid rgba(138, 132, 255, 0.42)',
        background: 'linear-gradient(145deg, rgba(17, 24, 42, 0.48), rgba(7, 10, 18, 0.14))',
        boxShadow:
          'inset 0 1px 0 rgba(255,255,255,0.06), 0 18px 42px rgba(0,0,0,0.16), 0 0 28px rgba(78,107,255,0.07)',
        transform: isMobile ? 'translateZ(30px)' : 'translateZ(72px) rotateY(-4deg)',
        transformStyle: 'preserve-3d',
      }}
    >
      <div style={{ padding: isMobile ? '13px 13px 0' : '15px 16px 0' }}>
        <BrowserDots compact />
        <div style={{ marginTop: isMobile ? 19 : 24 }}>
          <SkeletonLine width="74%" opacity={0.66} />
          <SkeletonLine width="58%" marginTop={isMobile ? 12 : 16} opacity={0.58} />
          <SkeletonLine width="66%" marginTop={isMobile ? 12 : 14} opacity={0.52} />
          <SkeletonLine width="47%" marginTop={isMobile ? 12 : 14} opacity={0.46} />
        </div>
        <div
          style={{
            width: isMobile ? 42 : 50,
            height: isMobile ? 13 : 15,
            marginTop: isMobile ? 17 : 22,
            borderRadius: 999,
            border: '1px solid rgba(128, 123, 255, 0.28)',
            background: 'rgba(51, 92, 255, 0.035)',
          }}
        />
      </div>
    </div>
  );
}

function GhostBrowserPanel({ isMobile }: { isMobile: boolean }) {
  if (isMobile) {
    return (
      <FloatLayer
        delay={0.24}
        duration={24}
        floatX={8}
        floatY={-10}
        floatRotate={0.8}
        opacity={0.42}
        rotate={-4}
        depthTransform="perspective(1000px) rotateX(4deg) rotateY(-12deg)"
        style={{
          right: '-54vw',
          bottom: '9vh',
          width: '92vw',
          height: '260px',
          zIndex: 3,
        }}
      >
        <BrowserPanelFrame isMobile />
      </FloatLayer>
    );
  }

  return (
    <FloatLayer
      delay={0.24}
      duration={24}
      floatX={18}
      floatY={-22}
      floatRotate={1.2}
      opacity={1}
      rotate={-4.1}
      depthTransform="perspective(1200px) rotateX(3deg) rotateY(-10deg) translateZ(38px)"
      style={{
        left: '52.2vw',
        top: '48.4vh',
        width: 'min(780px, 47vw)',
        height: 'min(438px, 40vh)',
        zIndex: 4,
      }}
    >
      <BrowserPanelFrame />
    </FloatLayer>
  );
}

function BrowserPanelFrame({ isMobile = false }: { isMobile?: boolean }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        borderRadius: 14,
        border: '1px solid rgba(138, 132, 255, 0.5)',
        background:
          'linear-gradient(145deg, rgba(17, 24, 42, 0.5), rgba(8, 11, 20, 0.15) 58%, rgba(7, 10, 18, 0.065))',
        boxShadow:
          'inset 0 1px 0 rgba(255,255,255,0.07), inset -1px -1px 0 rgba(78,107,255,0.075), 0 0 56px rgba(78,107,255,0.135), 0 32px 82px rgba(0,0,0,0.28)',
        overflow: 'visible',
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        style={{
          height: isMobile ? 34 : 44,
          borderBottom: '1px solid rgba(138, 132, 255, 0.3)',
          padding: isMobile ? '13px 18px' : '17px 24px',
          transform: 'translateZ(18px)',
        }}
      >
        <BrowserDots />
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '42% 1fr' : '39% 1fr',
          gap: isMobile ? '6%' : '7%',
          padding: isMobile ? '24px 28px 22px' : '34px 44px 28px',
          transform: 'translateZ(28px)',
        }}
      >
        <div>
          <ImagePlaceholder />
          <div
            style={{
              width: '100%',
              height: isMobile ? 18 : 22,
              marginTop: isMobile ? 23 : 34,
              borderRadius: 999,
              border: '1px solid rgba(138, 132, 255, 0.32)',
              background: 'rgba(51, 92, 255, 0.035)',
            }}
          />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '24px 1fr' : '34px 1fr',
              gap: isMobile ? 12 : 17,
              marginTop: isMobile ? 16 : 22,
            }}
          >
            <span
              style={{
                width: isMobile ? 23 : 31,
                height: isMobile ? 23 : 31,
                borderRadius: 999,
                border: '1px solid rgba(138, 132, 255, 0.33)',
                boxShadow: '0 0 14px rgba(78,107,255,0.08)',
              }}
            />
            <div style={{ paddingTop: isMobile ? 2 : 4 }}>
              <SkeletonLine width="82%" opacity={0.5} />
              <SkeletonLine width="62%" marginTop={isMobile ? 10 : 14} opacity={0.44} />
            </div>
          </div>
        </div>
        <div style={{ paddingTop: isMobile ? 0 : 4 }}>
          <SkeletonLine width="78%" opacity={0.82} />
          <SkeletonLine width="67%" marginTop={isMobile ? 16 : 23} opacity={0.72} />
          <SkeletonLine width="76%" marginTop={isMobile ? 14 : 19} opacity={0.64} />
          <SkeletonLine width="60%" marginTop={isMobile ? 14 : 19} opacity={0.56} />
          <div
            style={{
              width: isMobile ? 74 : 102,
              height: isMobile ? 24 : 30,
              marginTop: isMobile ? 25 : 35,
              borderRadius: 999,
              border: '1px solid rgba(138, 132, 255, 0.36)',
              background: 'rgba(51, 92, 255, 0.035)',
            }}
          />
        </div>
      </div>
      <GhostMobilePanel isMobile={isMobile} />
    </div>
  );
}

function GhostMiniPanel({ isMobile }: { isMobile: boolean }) {
  if (isMobile) {
    return null;
  }

  return (
    <FloatLayer
      delay={0.34}
      duration={22}
      floatX={-12}
      floatY={14}
      floatRotate={-1}
      opacity={0.74}
      rotate={-1.8}
      depthTransform="perspective(1050px) rotateX(4deg) rotateY(-9deg) translateZ(12px)"
      style={{
        right: '15vw',
        top: '16.4vh',
        width: 292,
        height: 174,
        zIndex: 3,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 9,
          border: '1px solid rgba(128, 123, 255, 0.32)',
          background: 'linear-gradient(145deg, rgba(17,24,42,0.34), rgba(7,10,18,0.075))',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.055), 0 16px 38px rgba(0,0,0,0.16), 0 0 30px rgba(78,107,255,0.07)',
          padding: 24,
          display: 'grid',
          gridTemplateColumns: '56px 1fr',
          gap: 26,
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          style={{
            width: 56,
            height: 66,
            borderRadius: 6,
            border: '1px solid rgba(128, 123, 255, 0.28)',
            background: 'rgba(51,92,255,0.045)',
            transform: 'translateZ(18px)',
          }}
        />
        <div style={{ transform: 'translateZ(24px)' }}>
          <SkeletonLine width="86%" opacity={0.68} />
          <SkeletonLine width="73%" marginTop={15} opacity={0.58} />
          <SkeletonLine width="80%" marginTop={15} opacity={0.5} />
          <SkeletonLine width="61%" marginTop={15} opacity={0.44} />
          <div
            style={{
              width: 54,
              height: 18,
              marginTop: 18,
              borderRadius: 999,
              border: '1px solid rgba(128, 123, 255, 0.25)',
              background: 'rgba(51,92,255,0.026)',
            }}
          />
        </div>
      </div>
    </FloatLayer>
  );
}

function BackgroundOrb({
  isMobile,
  size,
  style,
  delay,
  opacity,
  variant = 'small',
}: {
  isMobile: boolean;
  size: number | string;
  style: CSSProperties;
  delay: number;
  opacity: number;
  variant?: 'large' | 'small';
}) {
  const shouldReduceMotion = useReducedMotion();
  const isLarge = variant === 'large';

  return (
    <FloatLayer
      delay={delay}
      duration={isMobile ? 24 : 28}
      floatX={isMobile ? 5 : 10}
      floatY={isMobile ? -8 : -14}
      floatRotate={0}
      opacity={opacity}
      style={{ width: size, height: size, zIndex: isLarge ? 1 : 3, ...style }}
    >
      <motion.div
        animate={
          shouldReduceMotion
            ? undefined
            : {
                scale: [1, isMobile ? 1.03 : 1.04, 1],
                opacity: [0.82, 1, 0.82],
              }
        }
        transition={{ ...calmFloat, duration: isMobile ? 24 : 23 }}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 999,
          border: `1px solid ${isLarge ? 'rgba(138, 132, 255, 0.34)' : 'rgba(128, 123, 255, 0.22)'}`,
          background: isLarge
            ? 'radial-gradient(circle at 35% 34%, rgba(78, 107, 255, 0.07), transparent 34%), linear-gradient(145deg, rgba(78,107,255,0.052), transparent 70%)'
            : 'radial-gradient(circle at 34% 32%, rgba(78, 107, 255, 0.045), transparent 34%), linear-gradient(145deg, rgba(128,123,255,0.035), transparent 68%)',
          boxShadow: isLarge
            ? 'inset 0 0 58px rgba(78, 107, 255, 0.075), 0 0 48px rgba(78,107,255,0.055)'
            : 'inset 0 0 32px rgba(78,107,255,0.04), 0 0 18px rgba(128,123,255,0.04)',
        }}
      />
    </FloatLayer>
  );
}

function LightLine({
  isMobile,
  style,
  delay,
  rotate,
  width,
  opacity = 0.46,
}: {
  isMobile: boolean;
  style: CSSProperties;
  delay: number;
  rotate: number;
  width: string | number;
  opacity?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (isMobile) {
    return null;
  }

  return (
    <FloatLayer
      delay={delay}
      duration={18}
      floatX={14}
      floatY={-5}
      floatRotate={0.2}
      opacity={opacity}
      rotate={rotate}
      style={{ width, height: 1, zIndex: 2, transformOrigin: 'center', ...style }}
    >
      <motion.div
        animate={shouldReduceMotion ? undefined : { opacity: [0.42, 0.82, 0.42] }}
        transition={{ ...calmFloat, duration: 17 }}
        style={{
          width: '100%',
          height: 1,
          background:
            'linear-gradient(90deg, transparent, rgba(78,107,255,0.28) 35%, rgba(165,107,255,0.22) 48%, rgba(78,107,255,0.08) 68%, transparent)',
          boxShadow: '0 0 12px rgba(78,107,255,0.1)',
        }}
      />
    </FloatLayer>
  );
}

function LeftDiagonalShape({ isMobile }: { isMobile: boolean }) {
  return (
    <FloatLayer
      delay={0.16}
      duration={24}
      floatX={isMobile ? 5 : 8}
      floatY={isMobile ? 4 : 7}
      floatRotate={0.35}
      opacity={isMobile ? 0.38 : 0.68}
      rotate={isMobile ? 12 : 12.5}
      depthTransform="perspective(900px) rotateX(2deg) rotateY(8deg) translateZ(-18px)"
      style={{
        left: isMobile ? -200 : '-15vw',
        top: isMobile ? '17vh' : '18.5vh',
        width: isMobile ? 350 : 'min(680px, 40vw)',
        height: isMobile ? 62 : 116,
        zIndex: 3,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 999,
          border: '1px solid rgba(165, 107, 255, 0.42)',
          background:
            'linear-gradient(100deg, rgba(122, 92, 255, 0.28), rgba(78, 107, 255, 0.14) 47%, rgba(8, 11, 20, 0.025) 100%)',
          boxShadow:
            'inset 0 1px 0 rgba(255,255,255,0.075), 0 0 46px rgba(122, 92, 255, 0.18), 0 24px 60px rgba(0,0,0,0.22)',
        }}
      />
    </FloatLayer>
  );
}

function AccentDots({ isMobile }: { isMobile: boolean }) {
  return (
    <FloatLayer
      delay={0.58}
      duration={20}
      floatX={isMobile ? 4 : 6}
      floatY={isMobile ? -4 : -8}
      floatRotate={0}
      opacity={isMobile ? 0.16 : 0.34}
      style={{
        left: isMobile ? 20 : '3.7vw',
        top: isMobile ? '39vh' : '41.5vh',
        width: isMobile ? 96 : 142,
        height: isMobile ? 122 : 174,
        zIndex: 3,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundImage: 'radial-gradient(circle, rgba(106, 141, 255, 0.7) 1.1px, transparent 1.25px)',
          backgroundSize: '23px 23px',
          maskImage: 'radial-gradient(ellipse 78% 70% at 45% 52%, black 18%, transparent 74%)',
          WebkitMaskImage: 'radial-gradient(ellipse 78% 70% at 45% 52%, black 18%, transparent 74%)',
        }}
      />
    </FloatLayer>
  );
}

function BottomRightPill({ isMobile }: { isMobile: boolean }) {
  if (isMobile) {
    return null;
  }

  return (
    <FloatLayer
      delay={0.54}
      duration={20}
      floatX={18}
      floatY={-14}
      floatRotate={0.8}
      opacity={0.74}
      rotate={-12}
      depthTransform="perspective(1100px) rotateX(4deg) rotateY(-7deg) translateZ(96px)"
      style={{
        right: '3.2vw',
        bottom: '5.2vh',
        width: 470,
        height: 92,
        zIndex: 6,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 999,
        border: '1px solid rgba(255, 107, 181, 0.4)',
        background:
            'linear-gradient(90deg, rgba(255,107,181,0.28), rgba(193,91,255,0.17) 42%, rgba(78,107,255,0.07) 74%, rgba(8,11,20,0.02))',
          boxShadow:
            'inset 0 1px 0 rgba(255,255,255,0.07), 0 0 44px rgba(255,107,181,0.17), 0 26px 54px rgba(0,0,0,0.22)',
        }}
      />
    </FloatLayer>
  );
}

export function Background() {
  const isMobile = useIsMobileBackground();

  return (
    <div
      className="site-background"
      aria-hidden="true"
      style={{
        pointerEvents: 'none',
        zIndex: 0,
        background:
          'radial-gradient(ellipse 56% 38% at 70% 53%, rgba(17,24,42,0.82), transparent 72%), radial-gradient(ellipse 36% 24% at -8% 22%, rgba(122,92,255,0.16), transparent 72%), radial-gradient(ellipse 30% 24% at 78% 82%, rgba(193,91,255,0.14), transparent 70%), linear-gradient(135deg, #080B14 0%, #070A12 42%, #0E1424 100%)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          perspective: 1200,
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          background:
              'radial-gradient(ellipse 40% 33% at 76% 64%, rgba(51,92,255,0.2), transparent 72%), radial-gradient(ellipse 30% 22% at 61% 52%, rgba(78,107,255,0.13), transparent 74%), radial-gradient(ellipse 30% 18% at 12% 31%, rgba(165,107,255,0.11), transparent 74%)',
          }}
        />

        <BackgroundOrb
          isMobile={isMobile}
          size={isMobile ? 210 : 'min(540px, 37vw)'}
          delay={0.18}
          opacity={isMobile ? 0.18 : 0.72}
          variant="large"
          style={isMobile ? { right: -138, top: '20vh' } : { right: '-10vw', top: '23.5vh' }}
        />
        <BackgroundOrb
          isMobile={isMobile}
          size={isMobile ? 72 : 128}
          delay={0.46}
          opacity={isMobile ? 0.18 : 0.44}
          style={isMobile ? { left: -32, bottom: '20vh' } : { left: '3.5vw', bottom: '11.5vh' }}
        />

        <LightLine isMobile={isMobile} delay={0.26} width="50vw" rotate={-25} style={{ right: '-1vw', top: '10.8vh' }} />
        <LightLine
          isMobile={isMobile}
          delay={0.44}
          width="44vw"
          rotate={-15}
          opacity={0.34}
          style={{ right: '23vw', bottom: '12.6vh' }}
        />

        <LeftDiagonalShape isMobile={isMobile} />
        <AccentDots isMobile={isMobile} />

        <GhostMiniPanel isMobile={isMobile} />
        <GhostBrowserPanel isMobile={isMobile} />
        <BottomRightPill isMobile={isMobile} />
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'linear-gradient(90deg, rgba(7,10,18,0.42) 0%, rgba(7,10,18,0.27) 31%, transparent 58%), radial-gradient(ellipse 43% 46% at 31% 43%, rgba(7,10,18,0.42), transparent 73%), linear-gradient(to bottom, rgba(7,10,18,0.03), transparent 34%, rgba(7,10,18,0.38) 100%)',
          zIndex: 9,
        }}
      />
    </div>
  );
}
