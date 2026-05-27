import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrambleTitle } from '../components/ScrambleTitle';

gsap.registerPlugin(ScrollTrigger);

function RippleButton() {
  const [ripples, setRipples] = useState<Array<{ id: number; size: number; x: number; y: number }>>(
    [],
  );
  const nextId = useRef(0);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;
    const onEnter = () =>
      gsap.to(btn, {
        scale: 1.06,
        boxShadow: '0 0 30px oklch(55% 0.27 268 / 0.5)',
        duration: 0.3,
        ease: 'back.out(2)',
      });
    const onLeave = () =>
      gsap.to(btn, {
        scale: 1,
        boxShadow: '0 0 0px oklch(55% 0.27 268 / 0)',
        duration: 0.4,
        ease: 'power2.out',
      });
    const onDown = () => gsap.to(btn, { scale: 0.95, duration: 0.1, ease: 'power3.in' });
    const onUp = () => gsap.to(btn, { scale: 1.06, duration: 0.2, ease: 'back.out(3)' });

    btn.addEventListener('mouseenter', onEnter);
    btn.addEventListener('mouseleave', onLeave);
    btn.addEventListener('mousedown', onDown);
    btn.addEventListener('mouseup', onUp);
    return () => {
      btn.removeEventListener('mouseenter', onEnter);
      btn.removeEventListener('mouseleave', onLeave);
      btn.removeEventListener('mousedown', onDown);
      btn.removeEventListener('mouseup', onUp);
    };
  }, []);

  return (
    <button
      ref={btnRef}
      className="micro-btn"
      aria-label="Micro-Interaction Demo"
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const id = nextId.current++;
        setRipples((r) => [...r, { id, size, x: e.clientX - rect.left - size / 2, y: e.clientY - rect.top - size / 2 }]);
      }}
    >
      Klick mich
      {ripples.map((r) => (
        <span
          key={r.id}
          className="ripple-ring"
          style={{ width: r.size, height: r.size, left: r.x, top: r.y }}
          onAnimationEnd={() => setRipples((current) => current.filter((item) => item.id !== r.id))}
        />
      ))}
    </button>
  );
}

function ResponsiveDemo() {
  const [cols, setCols] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);

  function handleCols(value: number) {
    const items = gridRef.current?.querySelectorAll<HTMLElement>('.resp-mini-cell');
    if (items && items.length) {
      gsap.to(items, {
        opacity: 0,
        scale: 0.8,
        duration: 0.18,
        stagger: 0.03,
        onComplete: () => {
          setCols(value);
          gsap.to(items, { opacity: 1, scale: 1, duration: 0.28, stagger: 0.04, ease: 'back.out(1.4)' });
        },
      });
    } else {
      setCols(value);
    }
  }

  return (
    <div
      className="demo-stage"
      style={{
        flexDirection: 'column',
        gap: '8px',
        height: '140px',
        paddingBlock: '12px',
        overflow: 'hidden',
      }}
    >
      <div className="resp-toggle" role="group" aria-label="Spalten wählen">
        {[1, 2, 3].map((v) => (
          <button
            key={v}
            className={`resp-btn${cols === v ? ' active' : ''}`}
            type="button"
            aria-pressed={cols === v}
            onClick={() => handleCols(v)}
          >
            {v} Col
          </button>
        ))}
      </div>
      <div
        ref={gridRef}
        className="resp-mini-grid"
        data-cols={cols}
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
        aria-live="polite"
      >
        <div className="resp-mini-cell" />
        <div className="resp-mini-cell" />
        <div className="resp-mini-cell" />
        <div className="resp-mini-cell" />
        <div className="resp-mini-cell" />
        <div className="resp-mini-cell" />
      </div>
    </div>
  );
}

const hScrollCards = [
  { num: '01', icon: '⟶', title: 'ScrollTrigger', desc: 'Scroll-Events mit pixelgenauer Kontrolle. Scrub, Pin, Toggle – alles möglich. Genau das was du gerade erlebst.', tag: 'gsap · ScrollTrigger' },
  { num: '02', icon: '✶', title: 'SplitText', desc: 'Buchstaben, Wörter, Zeilen – einzeln animierbar. Der Hero-Titel oben? SplitText.', tag: 'gsap · SplitText' },
  { num: '03', icon: '⌥', title: 'ScrambleText', desc: 'Text morpht zwischen Zuständen. Wie Terminals, wie Code – lebendig. Siehst du beim Hero-Titel.', tag: 'gsap · ScrambleText' },
  { num: '04', icon: '◈', title: 'Timelines', desc: 'Sequenzen choreografiert. Kein delay-Chaos – alles in einer Timeline. Präzise wie ein Dirigent.', tag: 'gsap · timeline()' },
  { num: '05', icon: '⬡', title: 'quickTo', desc: 'Cursor-Trails, Magnet-Effekte, Physics. Flüssiger als CSS je sein könnte. Sieh dir den Cursor-Bereich an.', tag: 'gsap · quickTo()' },
  { num: '06', icon: '◎', title: '3D Tilt', desc: 'Hover über die Bento-Karten oben. rotateX + rotateY mit transformPerspective – echter Tiefeneindruck.', tag: 'gsap · rotateX/Y' },
  { num: '07', icon: '▣', title: 'Stagger', desc: 'Elemente erscheinen nicht gleichzeitig – sie erzählen eine Geschichte. Zeitversetzt, präzise, bewusst.', tag: 'gsap · stagger' },
  { num: '08', icon: '⏣', title: 'Spring Physics', desc: 'back.out(), elastic.out() – Animationen die sich physikalisch anfühlen. Kein lineares Rein/Raus.', tag: 'gsap · ease' },
];

const marqueeRow1 = ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Mobile-First', 'Git', 'GitHub Pages', 'Vercel', 'Flexbox', 'CSS Grid', 'Custom Properties', 'GSAP'];
const marqueeRow2 = ['DOM Manipulation', 'Intersection Observer', 'Fetch API', 'LocalStorage', 'Linux', 'Docker', 'VS Code', 'Claude Code', 'backdrop-filter', 'ScrollTrigger', 'SplitText', 'Chrome DevTools'];

const processSteps = [
  { num: '01', title: 'Gespräch', sub: 'Wir hören zu.', desc: 'Kein Tech-Jargon. Kein Sales-Pitch. Wir wollen verstehen was du brauchst – und was du dir wünschst.' },
  { num: '02', title: 'Umsetzung', sub: 'Wir bauen.', desc: 'Sauber, schnell, mobile-first. Kein Template, kein Page-Builder – Handarbeit die sich im Code zeigt.' },
  { num: '03', title: 'Übergabe', sub: 'Du bekommst alles.', desc: 'Code, Domain-Setup, Erklärung inklusive. Du bist nie abhängig von uns – das ist Absicht.' },
];

export function Skills() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.globalTimeline.timeScale(0);
    }
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.from('.hero-eyebrow',       { opacity: 0, y: -16, duration: 0.5, delay: 0.1 });
      gsap.from('.hero-title-divider', { opacity: 0, scaleY: 0, transformOrigin: 'top', duration: 0.5, delay: 1.1 });
      gsap.from('.hero-subtitle',      { opacity: 0, y: 24, duration: 0.6, delay: 1.2 });
      gsap.from('.hero-ctas',          { opacity: 0, y: 20, duration: 0.5, delay: 1.5 });

      // Hero parallax
      gsap.to('.hero-bg-element', {
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.5 },
        y: -120, opacity: 0.3, ease: 'none',
      });

      // Demo cards reveal
      gsap.from('.demo-card', {
        scrollTrigger: { trigger: '.demo-grid', start: 'top 80%', toggleActions: 'play none none reverse' },
        opacity: 0, y: 60, scale: 0.97,
        stagger: { amount: 0.5, from: 'start' },
        duration: 0.65, ease: 'power3.out',
      });

      // Card 1 shape rotation
      gsap.to('.demo-shape-1', { rotation: 360, duration: 8, repeat: -1, ease: 'none' });
      gsap.to('.demo-shape-1', { scale: 1.2, duration: 2, repeat: -1, yoyo: true, ease: 'power1.inOut' });

      // 3D tilt on all demo cards
      document.querySelectorAll<HTMLElement>('.demo-card').forEach((card) => {
        card.addEventListener('mousemove', (e) => {
          const r = card.getBoundingClientRect();
          const x = (e.clientX - r.left - r.width / 2)  / r.width;
          const y = (e.clientY - r.top  - r.height / 2) / r.height;
          gsap.to(card, { rotateX: -y * 3.5, rotateY: x * 3.5, transformPerspective: 900, duration: 0.5, ease: 'power2.out' });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power3.out' });
        });
      });

      // Glass bar loop
      gsap.fromTo(
        '.glass-card-bar-fill',
        { scaleX: 0.47, transformOrigin: 'left center' },
        { scaleX: 1.0, duration: 2.4, repeat: -1, yoyo: true, ease: 'power1.inOut' },
      );

      // Progress bars
      gsap.from('.progress-bar', {
        scrollTrigger: { trigger: '.demo-card-scroll', start: 'top 75%' },
        scaleX: 0, transformOrigin: 'left center',
        stagger: 0.15, duration: 0.8, ease: 'power3.out',
      });

      // Counter
      ScrollTrigger.create({
        trigger: '.demo-card-typo',
        start: 'top 75%',
        onEnter: () => {
          document.querySelectorAll<HTMLElement>('.counter-number').forEach((counter) => {
            const target = parseInt(counter.dataset.target ?? '0');
            const obj = { val: 0 };
            gsap.to(obj, {
              val: target, duration: 1.5, ease: 'power2.out',
              onUpdate() { counter.textContent = Math.round(obj.val).toLocaleString('de-CH'); },
            });
          });
        },
      });

      // Process timeline
      gsap.timeline({ scrollTrigger: { trigger: '.process-section', start: 'top 70%' } })
        .from('.process-line', { scaleX: 0, transformOrigin: 'left', duration: 1, ease: 'power2.inOut' })
        .from('.process-step', { opacity: 0, y: 40, stagger: 0.2, duration: 0.6, ease: 'power3.out' }, '-=0.5');

      // Cursor trail
      const cursorArea = document.querySelector<HTMLElement>('.cursor-demo-area');
      if (cursorArea) {
        const dot    = cursorArea.querySelector<HTMLElement>('.cursor-dot')!;
        const hint   = cursorArea.querySelector<HTMLElement>('.cursor-hint');
        const trails = cursorArea.querySelectorAll<HTMLElement>('.cursor-trail');

        const xTo = gsap.quickTo(dot, 'x', { duration: 0.3, ease: 'power3' });
        const yTo = gsap.quickTo(dot, 'y', { duration: 0.3, ease: 'power3' });

        cursorArea.addEventListener('mouseenter', (e) => {
          const rect = cursorArea.getBoundingClientRect();
          gsap.set([dot, ...trails], { x: e.clientX - rect.left, y: e.clientY - rect.top });
          if (hint) gsap.to(hint, { opacity: 0, duration: 0.2 });
          gsap.to([dot, ...trails], { opacity: 1, duration: 0.3, stagger: 0.04 });
        });
        cursorArea.addEventListener('mouseleave', () => {
          if (hint) gsap.to(hint, { opacity: 1, duration: 0.5, delay: 0.2 });
          gsap.to([dot, ...trails], { opacity: 0, duration: 0.4 });
        });
        cursorArea.addEventListener('mousemove', (e) => {
          const rect = cursorArea.getBoundingClientRect();
          xTo(e.clientX - rect.left);
          yTo(e.clientY - rect.top);
          trails.forEach((trail, i) => {
            gsap.to(trail, {
              x: e.clientX - rect.left, y: e.clientY - rect.top,
              duration: 0.3 + i * 0.08, ease: 'power2.out', overwrite: true,
            });
          });
        });
      }

      // Horizontal scroll pin
      const hTrack = document.querySelector<HTMLElement>('.h-scroll-track');
      if (hTrack) {
        const totalWidth = hTrack.scrollWidth - window.innerWidth;
        gsap.to(hTrack, {
          x: () => -totalWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: '.h-scroll-section',
            start: 'top top',
            end: () => '+=' + (totalWidth + window.innerHeight * 1.5),
            pin: true, scrub: 1.2,
            invalidateOnRefresh: true, anticipatePin: 1,
          },
        });
      }

      ScrollTrigger.refresh();

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} style={{ overflowX: 'hidden' }}>

      {/* Hero – Cinematic Center */}
      <section className="hero skills-hero-cinematic" style={{ position: 'relative' }}>
        <div className="skills-hero-bg hero-bg-element" aria-hidden="true" />
        <div className="hero-cinematic-overlay" aria-hidden="true" />
        <div className="container" style={{ width: '100%' }}>
          <div className="hero-cinematic-inner">
            <p className="hero-eyebrow">Frontend · Entwicklung · Schweiz</p>
            <ScrambleTitle
              prefix="Was wir"
              words={['können.', 'bauen.', 'liefern.', 'zeigen.']}
              className="hero-title"
            />
            <span className="hero-title-divider" aria-hidden="true" />
            <p className="hero-subtitle">
              <strong>Nicht reden. Zeigen.</strong><br />
              Jede Technik auf dieser Seite ist live demonstriert –<br />
              kein Screenshot, kein Mockup.
            </p>
            <div className="hero-ctas">
              <a href="/kontakt" className="btn btn-primary">Projekt anfragen</a>
              <a href="#demo-anchor" className="btn btn-ghost">Demos ansehen ↓</a>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Demo Grid */}
      <section id="demo-anchor">
        <div className="container">
          <div className="section-header-inline reveal">
            <div>
              <p className="section-eyebrow">Frontend-Handwerk</p>
              <h2>Techniken die wir<br />täglich einsetzen.</h2>
            </div>
            <p>Jede Karte demonstriert die Technik live – nicht beschrieben, sondern sichtbar.</p>
          </div>

          <div className="demo-grid">

            {/* Card 1: GSAP Animations – wide */}
            <div className="demo-card">
              <span className="demo-card-num">01</span>
              <div className="demo-stage">
                <div className="anim-rhombus demo-shape-1" aria-hidden="true" />
                <div className="anim-rhombus-label" aria-hidden="true">
                  <span>gsap.to · repeat: -1</span>
                  <strong>Rotation + Scale<br />8s / 2s yoyo</strong>
                </div>
              </div>
              <div className="demo-meta">
                <p className="demo-label">GSAP Animationen</p>
                <p className="demo-tags">gsap.to · repeat · yoyo · ease:none</p>
                <p className="demo-desc">Flüssige, frame-perfect Bewegungen ohne CSS-Keyframes. Präzise kontrolliert.</p>
              </div>
            </div>

            {/* Card 2: Micro-Interactions – tall */}
            <div className="demo-card">
              <span className="demo-card-num">02</span>
              <div className="demo-stage">
                <RippleButton />
                <p className="micro-btn-hint">hover · click · mousedown</p>
              </div>
              <div className="demo-meta">
                <p className="demo-label">Micro-Interactions</p>
                <p className="demo-tags">back.out · mouseenter · quickTo</p>
                <p className="demo-desc">Kleine Details die grosse Wirkung haben. Jede Interaktion fühlt sich bewusst an.</p>
              </div>
            </div>

            {/* Card 3: Glassmorphism */}
            <div className="demo-card">
              <span className="demo-card-num">03</span>
              <div className="demo-stage">
                <div className="glass-bg" aria-hidden="true" />
                <div className="glass-card" role="img" aria-label="Glassmorphism Demo">
                  <p className="glass-card-title">Glassmorphism</p>
                  <p className="glass-card-sub">backdrop-filter · blur(14px)</p>
                  <div className="glass-card-bar" aria-hidden="true">
                    <div className="glass-card-bar-fill" />
                  </div>
                </div>
              </div>
              <div className="demo-meta">
                <p className="demo-label">Glassmorphism</p>
                <p className="demo-tags">backdrop-filter · rgba · blur</p>
                <p className="demo-desc">Tiefe und Atmosphäre durch Transparenz. Modern ohne übertrieben zu wirken.</p>
              </div>
            </div>

            {/* Card 4: Responsive Layout */}
            <div className="demo-card">
              <span className="demo-card-num">04</span>
              <ResponsiveDemo />
              <div className="demo-meta">
                <p className="demo-label">Responsive Design</p>
                <p className="demo-tags">CSS Grid · Flexbox · clamp()</p>
                <p className="demo-desc">Mobile-First von Anfang an. Jedes Layout funktioniert auf jedem Gerät.</p>
              </div>
            </div>

            {/* Card 5: Scroll Animations – wide */}
            <div className="demo-card demo-card-scroll">
              <span className="demo-card-num">05</span>
              <div className="demo-stage">
                <div className="scroll-bars-wrap" aria-label="Progress Bars Demo">
                  {([['CSS', 92], ['JS', 78], ['HTML', 95], ['UX', 85]] as const).map(([label, width]) => (
                    <div className="scroll-bar-row" key={label}>
                      <span className="scroll-bar-label">{label}</span>
                      <div className="scroll-bar-track">
                        <div className="scroll-bar-fill progress-bar" style={{ width: `${width}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="scroll-stage-label" aria-hidden="true">
                  <span>ScrollTrigger</span>
                  <strong>Bars animieren wenn<br />sie sichtbar werden</strong>
                </div>
              </div>
              <div className="demo-meta">
                <p className="demo-label">Scroll Animationen</p>
                <p className="demo-tags">ScrollTrigger · scaleX · stagger</p>
                <p className="demo-desc">Inhalte erscheinen wenn sie relevant werden. Nie störend, immer purposeful.</p>
              </div>
            </div>

            {/* Card 6: Typography */}
            <div className="demo-card demo-card-typo">
              <span className="demo-card-num">06</span>
              <div className="demo-stage" style={{ flexDirection: 'column', gap: 'var(--sp-3)' }}>
                <div>
                  <div className="typo-counter counter-number" data-target="2847" aria-live="polite">0</div>
                  <div className="typo-counter-sub">Zeilen Code · und zählend</div>
                </div>
                <div className="typo-split-word" role="img" aria-label="Hover-Effekt Demo">
                  {'DESIGN'.split('').map((letter, i) => (
                    <span key={i}>{letter}</span>
                  ))}
                </div>
              </div>
              <div className="demo-meta">
                <p className="demo-label">Typografie &amp; Text</p>
                <p className="demo-tags">Bricolage · clamp() · letter-spacing</p>
                <p className="demo-desc">Schrift die kommuniziert. Grösse, Gewicht und Abstand als Design-Werkzeug.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Horizontal Scroll */}
      <section className="h-scroll-section">
        <div className="container">
          <p className="section-eyebrow reveal">Scroll-Magie</p>
          <h2 className="reveal">Horizontal. Smooth.<br />Controlled.</h2>
        </div>
        <div className="h-scroll-track-wrapper">
          <div className="h-scroll-track">
            {hScrollCards.map((card) => (
              <div className="h-scroll-card" key={card.num}>
                <div className="h-scroll-card-num">{card.num}</div>
                <div className="h-scroll-card-icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
                <div className="h-scroll-tag">{card.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cursor Magic */}
      <section className="cursor-magic-section">
        <div className="container">
          <div className="section-intro reveal">
            <p className="section-eyebrow">GSAP quickTo</p>
            <h2>Cursor Magic</h2>
            <p>Bewege die Maus über diesen Bereich</p>
          </div>
          <div className="cursor-demo-area" aria-label="Cursor-Trail Demo" role="img">
            <div className="cursor-hint" aria-hidden="true">
              <span className="cursor-hint-icon">+</span>
              <span className="cursor-hint-text">Maus hier bewegen</span>
            </div>
            <div className="cursor-dot" aria-hidden="true" />
            {[...Array(7)].map((_, i) => (
              <div key={i} className="cursor-trail" aria-hidden="true" />
            ))}
          </div>
        </div>
      </section>

      {/* Infinite Marquee */}
      <section className="marquee-section">
        <div className="container">
          <p className="marquee-eyebrow reveal">Das komplette Toolkit</p>
        </div>
        <div className="marquee-outer">
          <div className="marquee-track" aria-hidden="true">
            {[marqueeRow1, marqueeRow1].map((row, ri) => (
              <div key={ri} style={{ display: 'flex', gap: '12px' }}>
                {row.map((tag) => (
                  <span key={tag + ri} className="marquee-tag">
                    <span className="marquee-tag-dot" />
                    {tag}
                  </span>
                ))}
              </div>
            ))}
          </div>
          <div className="marquee-track marquee-track-rev" aria-hidden="true">
            {[marqueeRow2, marqueeRow2].map((row, ri) => (
              <div key={ri} style={{ display: 'flex', gap: '12px' }}>
                {row.map((tag) => (
                  <span key={tag + ri} className="marquee-tag">
                    <span className="marquee-tag-dot" />
                    {tag}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="process-section">
        <div className="container">
          <div className="section-intro reveal">
            <p className="section-eyebrow">Wie wir arbeiten</p>
            <h2>Von der Idee zur<br />fertigen Website.</h2>
          </div>
          <div className="process-timeline">
            <div className="process-line" aria-hidden="true" />
            {processSteps.map((step) => (
              <div className="process-step" key={step.num}>
                <div className="process-step-num">{step.num}</div>
                <p className="process-step-title">{step.title}</p>
                <p className="process-step-sub">{step.sub}</p>
                <p className="process-step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="tight">
        <div className="container">
          <div className="cta-strip reveal">
            <div>
              <h2>Überzeugt?</h2>
              <p style={{ marginTop: 'var(--sp-3)', fontSize: '0.92rem' }}>
                Dann lass uns über dein Projekt reden.
              </p>
            </div>
            <a href="/kontakt" className="btn btn-primary">Projekt anfragen →</a>
          </div>
        </div>
      </section>

    </main>
  );
}
