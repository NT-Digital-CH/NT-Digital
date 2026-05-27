import { ScrambleTitle } from '../components/ScrambleTitle';

const processItems = [
  {
    num: '01',
    title: 'Gespräch',
    desc: 'Wir hören zu. Was brauchst du? Was soll die Website leisten? Kein Template - wir verstehen dein Business zuerst.',
  },
  {
    num: '02',
    title: 'Entwicklung',
    desc: 'Wir schreiben sauberen Code. HTML, CSS, JavaScript - kein Page-Builder, alles per Hand. Du siehst den Fortschritt.',
  },
  {
    num: '03',
    title: 'Launch',
    desc: 'Testen, Feintuning, Go-Live. Wir begleiten dich bis die Website online ist und du zufrieden bist.',
  },
];

export function Projects() {
  return (
    <main>
      <section className="hero hero-inner">
        <div className="container">
          <div className="hero-body">
            <p className="hero-eyebrow reveal">Portfolio</p>
            <ScrambleTitle
              prefix="Unsere"
              words={['Projekte.', 'Arbeit.', 'Projekte.']}
              className="hero-title"
            />
            <p className="lead reveal reveal-delay-2">
              Jede Website ist ein Handwerk.
              <br />
              Hier siehst du, wie wir arbeiten.
            </p>
          </div>
        </div>
      </section>

      <section className="flush-top">
        <div className="container">
          <div className="projects-list">
            <article className="project-item reveal">
              <p className="project-item-eyebrow">01 / Webentwicklung · 2026</p>

              <div className="project-item-thumb" aria-hidden="true">
                <div className="project-thumb-mmac">
                  <span>MMAC Center</span>
                </div>
              </div>

              <div>
                <p className="project-item-title">MMAC Center - Kampfschule Bachenbülach</p>
                <p className="project-item-desc">
                  Komplette Neugestaltung der Website für eine Kampfschule in Bachenbülach. One-Page Design mit
                  Stundenplan, Preisliste, Team-Vorstellung, Google Maps und Kontaktformular. Vollständig responsiv, von
                  Grund auf entwickelt.
                </p>
                <div className="project-item-footer">
                  <span className="project-badge amber">In Verhandlung</span>
                  <div className="project-stack">
                    <span className="stack-tag">HTML</span>
                    <span className="stack-tag">CSS</span>
                    <span className="stack-tag">JavaScript</span>
                    <span className="stack-tag">Mobile-First</span>
                  </div>
                  <a
                    href="https://www.jonesthala.ch/mmac.github.io/"
                    className="project-link"
                    target="_blank"
                    rel="noopener"
                  >
                    Demo ansehen ↗
                  </a>
                </div>
              </div>
            </article>

            <div className="project-next reveal">
              <p className="project-next-label">Nächstes Projekt</p>
              <p className="project-next-text">
                Du könntest hier stehen.
                <br />
                Wir freuen uns auf neue Anfragen.
              </p>
              <a href="/kontakt" className="btn btn-ghost">
                Projekt anfragen →
              </a>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-intro reveal">
            <p className="section-eyebrow">Wie wir arbeiten</p>
            <h2>Unser Prozess.</h2>
            <p>Transparent, direkt, ohne unnötigen Overhead.</p>
          </div>

          <div className="process-list">
            {processItems.map((item, index) => (
              <div
                className={`process-item reveal ${index === 1 ? 'reveal-delay-1' : index === 2 ? 'reveal-delay-2' : ''}`}
                key={item.num}
              >
                <span className="process-num">{item.num}</span>
                <div>
                  <p className="process-title">{item.title}</p>
                  <p className="process-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tight">
        <div className="container">
          <div className="cta-strip reveal">
            <h2>Ein Projekt im Kopf?</h2>
            <a href="/kontakt" className="btn btn-primary">
              Jetzt anfragen →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
