import { useEffect, useRef, useState, type ReactNode } from 'react';

type DemoCardProps = {
  delay?: 'reveal-delay-1' | 'reveal-delay-2';
  label: string;
  tags: string;
  desc: string;
  children: ReactNode;
};

const tagRows = [
  ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Mobile-First', 'Git', 'GitHub Pages', 'Vercel'],
  ['Flexbox', 'CSS Grid', 'Custom Properties', 'Animations', 'Glassmorphism', 'Dark Mode', 'clamp()', 'backdrop-filter'],
  ['DOM Manipulation', 'Intersection Observer', 'Event Listeners', 'Fetch API', 'LocalStorage', 'Form Validation'],
  ['Linux', 'PowerShell', 'Bash', 'Docker', 'Networking', 'VS Code', 'Claude Code', 'Chrome DevTools'],
];

const processSteps = [
  {
    num: '01',
    title: 'Gespräch',
    sub: 'Wir hören zu.',
    desc: 'Kein Tech-Jargon. Kein Sales-Pitch. Wir wollen verstehen was du brauchst - und was du dir wünschst.',
  },
  {
    num: '02',
    title: 'Umsetzung',
    sub: 'Wir bauen.',
    desc: 'Sauber, schnell, mobile-first. Kein Template, kein Page-Builder - Handarbeit die sich im Code zeigt.',
  },
  {
    num: '03',
    title: 'Übergabe',
    sub: 'Du bekommst alles.',
    desc: 'Code, Domain-Setup, Erklärung inklusive. Du bist nie abhängig von uns - das ist Absicht.',
  },
];

function DemoCard({ delay, label, tags, desc, children }: DemoCardProps) {
  return (
    <div className={`demo-card reveal ${delay ?? ''}`.trim()}>
      {children}
      <div className="demo-meta">
        <p className="demo-label">{label}</p>
        <p className="demo-tags">{tags}</p>
        <p className="demo-desc">{desc}</p>
      </div>
    </div>
  );
}

function RippleButton() {
  const [ripples, setRipples] = useState<Array<{ id: number; size: number; x: number; y: number }>>([]);
  const nextId = useRef(0);

  return (
    <button
      className="micro-btn"
      aria-label="Micro-Interaction Demo"
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const id = nextId.current;
        nextId.current += 1;
        setRipples((current) => [
          ...current,
          {
            id,
            size,
            x: event.clientX - rect.left - size / 2,
            y: event.clientY - rect.top - size / 2,
          },
        ]);
      }}
    >
      Klick mich
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="ripple-ring"
          style={{
            width: ripple.size,
            height: ripple.size,
            left: ripple.x,
            top: ripple.y,
          }}
          onAnimationEnd={() => setRipples((current) => current.filter((item) => item.id !== ripple.id))}
        />
      ))}
    </button>
  );
}

function ResponsiveDemo() {
  const [cols, setCols] = useState(1);

  return (
    <div className="demo-stage skills-responsive-stage">
      <div className="resp-toggle" role="group" aria-label="Spalten wählen">
        {[1, 2, 3].map((value) => (
          <button
            key={value}
            className={`resp-btn ${cols === value ? 'active' : ''}`}
            type="button"
            aria-pressed={cols === value}
            onClick={() => setCols(value)}
          >
            {value} Col
          </button>
        ))}
      </div>
      <div className="resp-mini-grid" data-cols={cols} aria-live="polite">
        <div className="resp-mini-cell" />
        <div className="resp-mini-cell" />
        <div className="resp-mini-cell" />
      </div>
    </div>
  );
}

function CounterDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    let started = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || started) return;
        started = true;

        const target = 2847;
        const duration = 1800;
        let startTime: number | null = null;

        const tick = (timestamp: number) => {
          startTime ??= timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(Math.round(eased * target));
          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.4 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="demo-stage skills-typography-stage">
      <div>
        <div className="typo-counter" ref={ref} aria-live="polite">
          {value.toLocaleString('de-CH')}
        </div>
        <div className="typo-counter-sub">Zeilen Code · und zählend</div>
      </div>
      <div className="typo-split-word" role="img" aria-label="Hover-Effekt Demo">
        {'DESIGN'.split('').map((letter) => (
          <span key={letter}>{letter}</span>
        ))}
      </div>
    </div>
  );
}

function DemoGrid() {
  return (
    <section>
      <div className="container">
        <div className="section-intro reveal">
          <p className="section-eyebrow">Frontend-Handwerk</p>
          <h2>
            Techniken die wir
            <br />
            täglich einsetzen.
          </h2>
          <p>Jede Karte unten demonstriert die Technik live - nicht beschrieben, sondern sichtbar.</p>
        </div>

        <div className="demo-grid">
          <DemoCard
            label="CSS Animationen"
            tags="@keyframes · transform · cubic-bezier"
            desc="Flüssige Bewegungen ohne JavaScript. Performant, präzise, kontrolliert."
          >
            <div className="demo-stage">
              <div className="anim-rhombus" aria-hidden="true" />
            </div>
          </DemoCard>

          <DemoCard
            delay="reveal-delay-1"
            label="Micro-Interactions"
            tags="transition · :hover · :active"
            desc="Kleine Details die grosse Wirkung haben. Jede Interaktion fühlt sich bewusst an."
          >
            <div className="demo-stage">
              <RippleButton />
            </div>
          </DemoCard>

          <DemoCard
            delay="reveal-delay-2"
            label="Glassmorphism"
            tags="backdrop-filter · rgba · blur"
            desc="Tiefe und Atmosphäre durch Transparenz. Modern ohne übertrieben zu wirken."
          >
            <div className="demo-stage">
              <div className="glass-bg" aria-hidden="true" />
              <div className="glass-card" role="img" aria-label="Glassmorphism Demo-Karte">
                <p className="glass-card-title">Glassmorphism</p>
                <p className="glass-card-sub">backdrop-filter · blur(14px)</p>
                <div className="glass-card-bar" aria-hidden="true">
                  <div className="glass-card-bar-fill" />
                </div>
              </div>
            </div>
          </DemoCard>

          <DemoCard
            label="Responsive Design"
            tags="CSS Grid · Flexbox · clamp()"
            desc="Mobile-First von Anfang an. Jedes Layout funktioniert auf jedem Gerät."
          >
            <ResponsiveDemo />
          </DemoCard>

          <DemoCard
            delay="reveal-delay-1"
            label="Scroll Animationen"
            tags="IntersectionObserver · translateX · stagger"
            desc="Inhalte erscheinen wenn sie relevant werden. Nie störend, immer purposeful."
          >
            <div className="demo-stage">
              <div className="scroll-bars-wrap" aria-label="Scroll-Animations Demo">
                {[
                  ['CSS', '92%'],
                  ['JS', '78%'],
                  ['HTML', '95%'],
                  ['UX', '85%'],
                ].map(([label, width]) => (
                  <div className="scroll-bar-row" key={label}>
                    <span className="scroll-bar-label">{label}</span>
                    <div className="scroll-bar-track">
                      <div className="scroll-bar-fill" style={{ width }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </DemoCard>

          <DemoCard
            delay="reveal-delay-2"
            label="Typografie & Text"
            tags="Bricolage · clamp() · letter-spacing"
            desc="Schrift die kommuniziert. Grösse, Gewicht und Abstand als Design-Werkzeug."
          >
            <CounterDemo />
          </DemoCard>
        </div>
      </div>
    </section>
  );
}

function TagCloud() {
  return (
    <section>
      <div className="container">
        <div className="section-intro reveal">
          <p className="section-eyebrow">Das komplette Toolkit</p>
          <h2>Und noch mehr.</h2>
          <p>Alles was wir täglich einsetzen, um Websites zu bauen die funktionieren.</p>
        </div>

        <div className="tag-cloud-section" id="tag-cloud">
          {tagRows.map((row) => (
            <div className="tag-row" key={row.join('-')}>
              {row.map((tag) => (
                <span className="skill-tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessTimeline() {
  return (
    <section>
      <div className="container">
        <div className="section-intro reveal">
          <p className="section-eyebrow">Wie wir arbeiten</p>
          <h2>
            Von der Idee zur
            <br />
            fertigen Website.
          </h2>
        </div>

        <div className="process-timeline">
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
  );
}

export function Skills() {
  return (
    <main>
      <section className="hero skills-hero">
        <div className="skills-hero-bg" aria-hidden="true" />
        <div className="container skills-hero-content">
          <div className="hero-body">
            <div className="expertise-badge reveal">EXPERTISE</div>
            <h1 className="hero-title reveal reveal-delay-1">
              Was wir
              <br />
              können.
            </h1>
            <div className="reveal reveal-delay-2">
              <hr className="hero-rule skills-hero-rule" />
              <p className="hero-subtitle">
                <strong>Nicht reden. Zeigen.</strong>
                <br />
                Jede Technik auf dieser Seite ist live demonstriert -
                <br />
                kein Screenshot, kein Mockup.
              </p>
            </div>
          </div>
        </div>
      </section>

      <DemoGrid />
      <TagCloud />
      <ProcessTimeline />

      <section className="tight">
        <div className="container">
          <div className="cta-strip reveal">
            <div>
              <h2>Überzeugt?</h2>
              <p className="skills-cta-copy">Dann lass uns über dein Projekt reden.</p>
            </div>
            <a href="/kontakt" className="btn btn-primary">
              Projekt anfragen →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
