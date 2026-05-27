export function Impressum() {
  return (
    <main>
      <section className="hero hero-inner legal-hero">
        <div className="container">
          <div className="hero-body">
            <p className="hero-eyebrow reveal">Rechtliches</p>
            <h1 className="hero-title reveal reveal-delay-1">Impressum</h1>
            <p className="lead reveal reveal-delay-2">
              Angaben zum Betreiber dieser Website und direkte Kontaktmöglichkeiten.
            </p>
          </div>
        </div>
      </section>

      <section className="flush-top">
        <div className="container">
          <div className="legal-content reveal">
            <article className="legal-block">
              <h2>Betreiber</h2>
              <p>
                NT Digital ist ein Projekt von zwei Privatpersonen. Verantwortlich für den Inhalt dieser Website sind
                Jones Thala und Ilija Nikolic.
              </p>
            </article>

            <article className="legal-block">
              <h2>Kontaktadresse</h2>
              <address>
                Jones Thala und Ilija Nikolic
                <br />
                NT Digital
                <br />
                Am Eulachpark 2
                <br />
                8404 Winterthur
                <br />
                Schweiz
              </address>
              <p>
                E-Mail:{' '}
                <a href="mailto:nt-digital@mail.ch" className="legal-link">
                  nt-digital@mail.ch
                </a>
              </p>
            </article>

            <article className="legal-block">
              <h2>Haftung für Inhalte</h2>
              <p>
                Wir bemühen uns, die Inhalte dieser Website aktuell und korrekt zu halten. Trotzdem übernehmen wir
                keine Gewähr für Vollständigkeit, Aktualität oder Richtigkeit der bereitgestellten Informationen.
              </p>
            </article>

            <article className="legal-block">
              <h2>Externe Links</h2>
              <p>
                Diese Website kann Links zu externen Websites enthalten. Für deren Inhalte und Datenschutzpraktiken sind
                ausschliesslich die jeweiligen Betreiber verantwortlich.
              </p>
            </article>

            <article className="legal-block">
              <h2>Urheberrechte</h2>
              <p>
                Texte, Gestaltung und sonstige Inhalte dieser Website dürfen ohne Zustimmung nicht weiterverwendet oder
                vervielfältigt werden, sofern keine gesetzliche Ausnahme gilt.
              </p>
            </article>

            <p className="legal-updated">Stand: Mai 2026</p>
          </div>
        </div>
      </section>
    </main>
  );
}
