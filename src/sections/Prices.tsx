import { useMemo, useState } from 'react';
import { Button } from '../components/Button';
import { ScrambleTitle } from '../components/ScrambleTitle';

type ProjectType = {
  id: string;
  name: string;
  priceLabel: string;
  basePrice: number | null;
  description: string;
};

type AddOn = {
  id: string;
  name: string;
  price: number;
};

const projectTypes: ProjectType[] = [
  {
    id: 'onepager',
    name: 'Onepager',
    priceLabel: 'ab CHF 290',
    basePrice: 290,
    description: 'Eine kompakte Website für dein Angebot, Portfolio oder kleines Business.',
  },
  {
    id: 'landingpage',
    name: 'Landingpage',
    priceLabel: 'ab CHF 350',
    basePrice: 350,
    description: 'Für eine Kampagne, ein Produkt oder eine einzelne Dienstleistung.',
  },
  {
    id: 'website',
    name: 'Mehrseitige Website',
    priceLabel: 'ab CHF 590',
    basePrice: 590,
    description: 'Mehrere Seiten wie Home, Über uns, Leistungen, Projekte und Kontakt.',
  },
  {
    id: 'individuell',
    name: 'Individuell',
    priceLabel: 'Preis nach Aufwand',
    basePrice: null,
    description: 'Wenn du noch nicht genau weisst, was du brauchst oder spezielle Anforderungen hast.',
  },
];

const addOns: AddOn[] = [
  { id: 'kontaktformular', name: 'Kontaktformular', price: 60 },
  { id: 'maps', name: 'Google Maps Einbindung', price: 40 },
  { id: 'seo', name: 'SEO-Basis', price: 80 },
  { id: 'texte', name: 'Texte optimieren', price: 100 },
  { id: 'bilder', name: 'Bilder optimieren', price: 60 },
  { id: 'mehrsprachigkeit', name: 'Mehrsprachigkeit DE/EN', price: 160 },
  { id: 'rechtliches', name: 'Rechtliche Seiten vorbereiten', price: 50 },
];

const formatPrice = (price: number) => `CHF ${price.toLocaleString('de-CH')}`;
const typeParamById: Record<string, string> = {
  onepager: 'onepager',
  landingpage: 'landingpage',
  website: 'mehrseitig',
  individuell: 'individuell',
};

export function Prices() {
  const [selectedTypeId, setSelectedTypeId] = useState(projectTypes[0].id);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const selectedType = projectTypes.find((type) => type.id === selectedTypeId) ?? projectTypes[0];
  const selectedItems = addOns.filter((addOn) => selectedAddOns.includes(addOn.id));
  const addOnsTotal = selectedItems.reduce((sum, addOn) => sum + addOn.price, 0);
  const total = selectedType.basePrice === null ? null : selectedType.basePrice + addOnsTotal;
  const requestParams = new URLSearchParams({
    typ: typeParamById[selectedType.id] ?? selectedType.id,
  });

  if (selectedAddOns.length) {
    requestParams.set('addons', selectedAddOns.join(','));
  }

  if (total !== null) {
    requestParams.set('preis', total.toString());
  }

  const requestHref = `/kontakt?${requestParams.toString()}`;

  const selectedSummary = useMemo(() => {
    if (!selectedItems.length) return 'Keine Zusatz-Bausteine ausgewählt.';
    return selectedItems.map((item) => item.name).join(', ');
  }, [selectedItems]);

  function toggleAddOn(id: string) {
    setSelectedAddOns((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  return (
    <main>
      <section className="prices-section">
        <div className="container">
          <div className="prices-head reveal">
            <p className="hero-eyebrow">Preise</p>
            <ScrambleTitle prefix="Projektpreis" words={['grob einschätzen.']} className="hero-title" />
            <p className="lead">
              Wähle einen Website-Typ und die Bausteine, die du brauchst. Die Schätzung aktualisiert sich direkt.
            </p>
          </div>

          <div className="prices-config">
            <div className="prices-options">
              <div className="prices-group reveal reveal-delay-1">
                <div className="prices-group-head">
                  <p className="section-eyebrow">Projekt-Typ</p>
                  <h2>Was soll entstehen?</h2>
                </div>

                <div className="project-type-grid" role="radiogroup" aria-label="Projekt-Typ auswählen">
                  {projectTypes.map((type) => (
                    <button
                      type="button"
                      key={type.id}
                      className={`price-type-card ${selectedTypeId === type.id ? 'active' : ''}`}
                      aria-pressed={selectedTypeId === type.id}
                      onClick={() => setSelectedTypeId(type.id)}
                    >
                      <span className="price-type-top">
                        <span className="price-type-name">{type.name}</span>
                        <span className="price-type-price">{type.priceLabel}</span>
                      </span>
                      <span className="price-type-description">{type.description}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="prices-group reveal reveal-delay-2">
                <div className="prices-group-head">
                  <p className="section-eyebrow">Bausteine</p>
                  <h2>Was kommt dazu?</h2>
                </div>

                <div className="addon-grid">
                  {addOns.map((addOn) => (
                    <label className="addon-option" key={addOn.id}>
                      <input
                        type="checkbox"
                        checked={selectedAddOns.includes(addOn.id)}
                        onChange={() => toggleAddOn(addOn.id)}
                      />
                      <span className="addon-copy">
                        <span>{addOn.name}</span>
                        <span>+ {formatPrice(addOn.price)}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <aside className="price-summary reveal reveal-delay-2" aria-live="polite">
              <p className="section-eyebrow">Schätzung</p>
              <div className="price-summary-total">
                {total === null ? 'Preis nach Aufwand' : `ab ${formatPrice(total)}`}
              </div>
              <p>
                {total === null
                  ? 'Für individuelle Projekte klären wir Umfang und Aufwand zuerst gemeinsam.'
                  : 'Einmaliger Richtpreis für dein ausgewähltes Website-Projekt.'}
              </p>

              <div className="price-summary-lines">
                <div>
                  <span>Projekt</span>
                  <strong>{selectedType.name}</strong>
                </div>
                <div>
                  <span>Basis</span>
                  <strong>{selectedType.priceLabel}</strong>
                </div>
                <div>
                  <span>Bausteine</span>
                  <strong>{total === null ? 'nach Absprache' : `+ ${formatPrice(addOnsTotal)}`}</strong>
                </div>
              </div>

              <p className="price-summary-selected">{selectedSummary}</p>

              <div className="price-note">
                Die Preise sind Richtwerte für typische kleine Websites. Der finale Preis hängt vom Umfang, Inhalt und
                gewünschten Funktionen ab.
              </div>

              <Button href={requestHref} className="price-summary-cta">
                Anfrage mit Auswahl senden
              </Button>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
