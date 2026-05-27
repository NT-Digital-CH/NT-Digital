import { useState } from 'react';

const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;
const endpoint = ['https://api.web3forms.com', 'submit'].join('/');

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
  {
    label: 'LinkedIn',
    value: (
      <a href="https://www.linkedin.com/in/ilija-nikolic-418a6437a/" target="_blank" rel="noopener">
        Ilija Nikolic ↗
      </a>
    ),
  },
];

const nextSteps = [
  {
    num: '01',
    title: 'Nachricht',
    text: 'Du erzählst uns kurz von deiner Idee oder Frage.',
  },
  {
    num: '02',
    title: 'Rückmeldung',
    text: 'Wir melden uns persönlich, meistens innerhalb von 24 Stunden.',
  },
  {
    num: '03',
    title: 'Nächster Schritt',
    text: 'Wenn es passt, besprechen wir Umfang, Zeitplan und einen fairen Preis.',
  },
];

export function Contact() {
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (!accessKey) {
      setErrorMessage('Das Kontaktformular ist noch nicht fertig konfiguriert.');
      return;
    }

    const payload = new FormData(form);
    payload.append('access_key', accessKey);
    payload.append('subject', 'Neue Anfrage über NT Digital');
    payload.append('from_name', 'NT Digital Kontaktformular');

    setErrorMessage('');
    setShowSuccess(false);
    setIsSending(true);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: payload,
      });
      const result = (await response.json()) as { success?: boolean; message?: string };

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Die Nachricht konnte nicht gesendet werden.');
      }

      form.reset();
      setShowSuccess(true);
      window.setTimeout(() => setShowSuccess(false), 5000);
    } catch {
      setErrorMessage('Die Nachricht konnte nicht gesendet werden. Bitte versuch es später erneut.');
    } finally {
      setIsSending(false);
    }
  }

  return (
    <main>
      <section className="contact-hero-section">
        <div className="container">
          <div className="contact-layout contact-layout-hero">
            <div className="contact-left">
              <div className="hero-body">
                <p className="hero-eyebrow reveal">Kontakt</p>
                <h1 className="hero-title reveal reveal-delay-1">
                  Lass uns
                  <br />
                  <em>reden.</em>
                </h1>
                <p className="lead reveal reveal-delay-2">
                  Kein langes Hin und Her.
                  <br />
                  Schreib uns direkt - wir melden uns schnell.
                </p>
              </div>

              <div className="contact-info-stack">
                {contactRows.map((row, index) => (
                  <div className="contact-row" key={`${row.label}-${index}`}>
                    <span className="contact-label">{row.label}</span>
                    <span className="contact-value">{row.value}</span>
                  </div>
                ))}
              </div>

            </div>

            <div className="contact-form-block reveal reveal-delay-1">
              <h3>Nachricht schreiben</h3>

              <form onSubmit={handleSubmit} noValidate>
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
                  <span>
                    Ich bin einverstanden, dass meine Daten zur Kontaktaufnahme verwendet werden. Details stehen in der{' '}
                    <a href="/datenschutz">Datenschutzerklärung</a>.
                  </span>
                </label>

                <button type="submit" className="btn btn-primary contact-submit" disabled={isSending}>
                  {isSending ? 'Wird gesendet...' : 'Nachricht senden →'}
                </button>

                <div className={`form-success ${showSuccess ? 'show' : ''}`} role="alert">
                  Danke für deine Nachricht. Wir melden uns innerhalb von 24h.
                </div>
                {errorMessage ? (
                  <div className="form-error" role="alert">
                    {errorMessage}
                  </div>
                ) : null}
              </form>
            </div>
          </div>

          <div className="contact-next-steps reveal reveal-delay-2">
            <div className="contact-next-head">
              <p className="section-eyebrow">Ablauf</p>
              <h2>Was passiert danach?</h2>
              <p>
                Du bekommst keinen automatischen Standard-Funnel. Wir prüfen deine Anfrage kurz, melden uns persönlich
                und klären gemeinsam, was wirklich Sinn macht.
              </p>
            </div>

            <div className="contact-next-list">
              {nextSteps.map((step) => (
                <div className="contact-next-row" key={step.num}>
                  <span className="contact-next-num">{step.num}</span>
                  <div>
                    <p className="contact-next-name">{step.title}</p>
                    <p className="contact-next-text">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
