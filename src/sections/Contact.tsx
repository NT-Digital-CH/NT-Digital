import { useState } from 'react';
import { ScrambleTitle } from '../components/ScrambleTitle';

const contactRows = [
  { label: 'E-Mail', value: <a href="mailto:nt-digital@mail.ch">nt-digital@mail.ch</a> },
  { label: 'Standort', value: 'Schweiz' },
  { label: 'Antwort', value: 'Meist innerhalb 24h' },
  {
    label: 'GitHub',
    value: (
      <a href="https://github.com/NT-Digital-CH" target="_blank" rel="noopener">
        github.com/NT-Digital ↗
      </a>
    ),
  },
  {
    label: 'LinkedIn',
    value: (
      <a href="https://www.linkedin.com/in/jones-thala-0372a9335" target="_blank" rel="noopener">
        Jones Thala ↗
      </a>
    ),
  },
];

export function Contact() {
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <main>
      <section className="hero hero-inner">
        <div className="container">
          <div className="hero-body">
            <p className="hero-eyebrow reveal">Kontakt</p>
            <ScrambleTitle
              prefix="Lass uns"
              words={['reden.', 'anfangen.', 'reden.']}
              className="hero-title"
            />
            <p className="lead reveal reveal-delay-2">
              Kein langes Hin und Her.
              <br />
              Schreib uns direkt - wir melden uns schnell.
            </p>
          </div>
        </div>
      </section>

      <section className="flush-top">
        <div className="container">
          <div className="contact-layout">
            <div className="reveal">
              <div className="contact-info-stack">
                {contactRows.map((row) => (
                  <div className="contact-row" key={row.label}>
                    <span className="contact-label">{row.label}</span>
                    <span className="contact-value">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="contact-form-block reveal reveal-delay-1">
              <h3>Nachricht schreiben</h3>

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  const form = event.currentTarget;
                  if (!form.checkValidity()) {
                    form.reportValidity();
                    return;
                  }

                  setIsSending(true);
                  window.setTimeout(() => {
                    form.reset();
                    setIsSending(false);
                    setShowSuccess(true);
                    window.setTimeout(() => setShowSuccess(false), 5000);
                  }, 1200);
                }}
                noValidate
              >
                <div className="form-field">
                  <label htmlFor="name">
                    Name <span className="required-mark">*</span>
                  </label>
                  <input type="text" id="name" name="name" placeholder="Max Muster" required autoComplete="name" />
                </div>

                <div className="form-field">
                  <label htmlFor="email">
                    E-Mail <span className="required-mark">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="max@beispiel.ch"
                    required
                    autoComplete="email"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="betreff">
                    Betreff <span className="required-mark">*</span>
                  </label>
                  <select id="betreff" name="betreff" required defaultValue="">
                    <option value="" disabled>
                      Bitte wählen...
                    </option>
                    <option value="neue-website">Neue Website</option>
                    <option value="ueberarbeitung">Website-Überarbeitung</option>
                    <option value="frage">Frage</option>
                    <option value="anderes">Anderes</option>
                  </select>
                </div>

                <div className="form-field">
                  <label htmlFor="nachricht">
                    Nachricht <span className="required-mark">*</span>
                  </label>
                  <textarea
                    id="nachricht"
                    name="nachricht"
                    placeholder="Erzähl uns von deinem Projekt oder deiner Frage..."
                    required
                  />
                </div>

                <label className="form-check">
                  <input type="checkbox" name="datenschutz" required />
                  <span>Ich bin einverstanden, dass meine Daten zur Kontaktaufnahme verwendet werden.</span>
                </label>

                <button type="submit" className="btn btn-primary contact-submit" disabled={isSending}>
                  {isSending ? 'Wird gesendet...' : 'Nachricht senden →'}
                </button>

                <div className={`form-success ${showSuccess ? 'show' : ''}`} role="alert">
                  Danke für deine Nachricht. Wir melden uns innerhalb von 24h.
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
