import { ScrambleTitle } from '../components/ScrambleTitle';

const services = [
  {
    num: '01',
    name: 'Website-Entwicklung',
    desc: 'Moderne, schnelle Websites von Grund auf. HTML, CSS, JavaScript - kein Page-Builder, echte Handarbeit die sich im Code zeigt.',
  },
  {
    num: '02',
    name: 'Responsive Design',
    desc: 'Jede Website sieht auf dem Handy genauso gut aus wie am Desktop. Mobile-First ist für uns Standard, nicht Option.',
  },
  {
    num: '03',
    name: 'Individuelle Lösungen',
    desc: 'Kein Template. Jede Website wird speziell für den Kunden entwickelt - Design, Inhalt, Struktur. Alles nach Mass.',
  },
];

export function Home() {
  return (
    <main>
      <section className="hero">
        <div className="container">
          <div className="hero-body">
            <p className="hero-eyebrow reveal">Lernende ICT-Fachmänner · Schweiz</p>
            <ScrambleTitle
              prefix="Wir bauen Websites."
              words={['Die auffallen.', 'Die performen.', 'Die überzeugen.', 'Die bleiben.']}
              className="hero-title"
            />

            <div className="reveal reveal-delay-2">
              <hr className="hero-rule home-hero-rule" />
              <div className="home-hero-copy">
                <p className="home-hero-text">
                  Zwei Lernende. Eine Leidenschaft. NT Digital entwickelt moderne Webauftritte für KMUs - sauber gebaut,
                  mobilfreundlich, auf den Punkt.
                </p>
                <div className="hero-actions">
                  <a href="/projekte" className="btn btn-primary">
                    Projekte ansehen
                  </a>
                  <a href="/kontakt" className="btn btn-ghost">
                    Kontakt aufnehmen
                  </a>
                </div>
                <div className="hero-meta">
                  <span>Schweiz</span>
                  <span>Mobile-First</span>
                  <span>100% Handarbeit</span>
                  <span>2 Entwickler</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-intro reveal">
            <p className="section-eyebrow">Was wir machen</p>
            <h2>
              Handwerk,
              <br />
              das sich sehen lässt.
            </h2>
            <p>Kein Page-Builder. Kein Template. Echte Handarbeit - von Grund auf.</p>
          </div>

          <div className="service-list">
            {services.map((service, index) => (
              <div
                className={`service-item reveal ${index === 1 ? 'reveal-delay-1' : index === 2 ? 'reveal-delay-2' : ''}`}
                key={service.num}
              >
                <span className="service-num">{service.num}</span>
                <div className="service-body">
                  <p className="service-name">{service.name}</p>
                  <p className="service-desc">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-intro reveal">
            <p className="section-eyebrow">Portfolio</p>
            <h2>
                Unsere
                <br />
                Arbeit.
              </h2>
          </div>

          <div className="project-feature reveal">
            <p className="project-feature-index">01 / Band Website · 2026</p>
            <h3 className="project-feature-title">Hua Foo</h3>
            <p className="project-feature-desc">
              Moderne Website für die Coverband Hua Foo mit Bandvorstellung, Gigs, Musikbereich und direkter
              Buchungsanfrage. Energiegeladen, klar strukturiert und optimiert für Besucher, Veranstalter und Fans.
            </p>
            <div className="project-feature-meta">
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

          <div className="home-project-link reveal">
            <a href="/projekte" className="btn btn-ghost">
              Alle Projekte →
            </a>
          </div>
        </div>
      </section>

      <section className="tight">
        <div className="container">
          <div className="cta-strip reveal">
            <h2>
                Bereit für deine
                <br />
                neue Website?
              </h2>
            <a href="/kontakt" className="btn btn-primary">
              Jetzt anfragen →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
