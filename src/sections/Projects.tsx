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
              words={['Projekte.', 'Leistung.', 'Resultate.', 'Arbeit.']}
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
            <article className="project-item project-item-featured reveal">
              <p className="project-item-eyebrow">01 / Band Website · 2026</p>

              <div className="project-item-thumb" aria-hidden="true">
                <div className="project-thumb-huafoo">
                  <img src="/huafoo_ref.png" alt="" className="project-thumb-huafoo-img" loading="lazy" />
                </div>
              </div>

              <div>
                <p className="project-item-title">Hua Foo</p>
                <p className="project-item-desc">
                  Moderne Website für die Coverband Hua Foo mit Bandvorstellung, Gigs, Musikbereich und direkter
                  Buchungsanfrage. Energiegeladen, klar strukturiert und optimiert für Besucher, Veranstalter und Fans.
                </p>

                <ul className="project-highlights" aria-label="Projekt-Highlights">
                  <li>Band & Musik sauber präsentiert</li>
                  <li>Kommende Gigs sichtbar</li>
                  <li>Kontakt und Buchung klar erreichbar</li>
                  <li>Responsive Aufbau für Mobile und Desktop</li>
                </ul>

                <div className="project-item-footer">
                  <span className="project-badge violet">Live</span>
                  <div className="project-stack">
                    <span className="stack-tag">Band Website</span>
                    <span className="stack-tag">Booking</span>
                    <span className="stack-tag">Event / Musik</span>
                    <span className="stack-tag">Responsive</span>
                  </div>
                  <a href="https://huafoo.ch/" className="project-link" target="_blank" rel="noopener">
                    Live ansehen ↗
                  </a>
                </div>
              </div>
            </article>

            <article className="project-item reveal">
              <p className="project-item-eyebrow">02 / Personal Portfolio · 2026</p>

              <div className="project-item-thumb project-item-thumb-premium" aria-hidden="true">
                <div className="project-thumb-jonesthala">
                  <img src="/jonesthala_ref.png" alt="" className="project-thumb-jonesthala-img" loading="lazy" />
                </div>
              </div>

              <div>
                <p className="project-item-title">Jones Thala</p>
                <p className="project-item-desc">
                  Persönliche Portfolio-Website für Jones Thala, ICT-Lernender im 2. Lehrjahr. Die Website kombiniert
                  einen Terminal-inspirierten Look mit klarer Struktur, Skills, Projekten, Kontaktbereich und
                  interaktiven Details wie Command Palette und Easter Egg.
                </p>

                <ul className="project-highlights" aria-label="Projekt-Highlights">
                  <li>Terminal-inspirierter Hero-Bereich</li>
                  <li>Skills & Projekte übersichtlich dargestellt</li>
                  <li>Kontaktbereich mit Social Links</li>
                  <li>Interaktive Features wie Command Palette und Secret Code</li>
                  <li>Mobile-optimierter Aufbau</li>
                </ul>

                <div className="project-item-footer">
                  <span className="project-badge green">Live</span>
                  <div className="project-stack">
                    <span className="stack-tag">Portfolio Website</span>
                    <span className="stack-tag">Terminal UI</span>
                    <span className="stack-tag">Personal Brand</span>
                    <span className="stack-tag">Responsive</span>
                    <span className="stack-tag">Vercel</span>
                  </div>
                  <a href="https://www.jonesthala.ch" className="project-link" target="_blank" rel="noopener">
                    Live ansehen ↗
                  </a>
                </div>
              </div>
            </article>

            <article className="project-item reveal">
              <p className="project-item-eyebrow">03 / Product Discovery Platform · 2026</p>

              <div className="project-item-thumb project-item-thumb-premium project-item-thumb-marketplace" aria-hidden="true">
                <div className="project-thumb-acfinds">
                  <img src="/acfinds_ref.png" alt="" className="project-thumb-acfinds-img" loading="lazy" />
                </div>
              </div>

              <div>
                <p className="project-item-title">ACFinds</p>
                <p className="project-item-desc">
                  Curated Product-Discovery-Plattform für Fashion, Tech und Outfits. ACFinds bündelt Produkte, Brands,
                  Seller und Outfit-Ideen in einer cleanen Oberfläche, damit Besucher schneller gute Finds entdecken und
                  direkt zu passenden Quellen weitergeleitet werden.
                </p>

                <ul className="project-highlights" aria-label="Projekt-Highlights">
                  <li>Übersichtliche Produkt- und Kategorie-Struktur</li>
                  <li>Bereiche für Products, Brands, Favorites, Outfits und Sellers</li>
                  <li>Direkte Weiterleitung zu Shops/Sellern</li>
                  <li>Cleaner Aufbau mit Fokus auf schnelles Entdecken</li>
                  <li>Mobile-optimierte Produktdarstellung</li>
                </ul>

                <div className="project-item-footer">
                  <span className="project-badge rose">Live</span>
                  <div className="project-stack">
                    <span className="stack-tag">Product Discovery</span>
                    <span className="stack-tag">Fashion & Tech</span>
                    <span className="stack-tag">Curated Finds</span>
                    <span className="stack-tag">Responsive</span>
                    <span className="stack-tag">E-Commerce UI</span>
                  </div>
                  <a href="https://www.acfinds.store/" className="project-link" target="_blank" rel="noopener">
                    Live ansehen ↗
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
