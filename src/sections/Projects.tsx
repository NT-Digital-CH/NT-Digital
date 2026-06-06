import { useState } from 'react';
import { ScrambleTitle } from '../components/ScrambleTitle';

type ProjectCategory = 'kundenprojekte' | 'portfolio' | 'konzepte';
type ProjectFilter = 'all' | ProjectCategory;

type Project = {
  title: string;
  type: string;
  category: ProjectCategory;
  year: string;
  image: string;
  imageAlt: string;
  url?: string;
  description: string;
  tags: string[];
  highlights: string[];
  badge: 'green' | 'rose' | 'violet';
  featured?: boolean;
};

const filterLabels: Record<ProjectFilter, string> = {
  all: 'Alle Projekte',
  kundenprojekte: 'Kundenprojekte',
  portfolio: 'Portfolio',
  konzepte: 'Konzepte',
};

const projects: Project[] = [
  {
    title: 'Hua Foo',
    type: 'Band Website',
    category: 'kundenprojekte',
    year: '2026',
    image: '/huafoo_ref.png',
    imageAlt: 'Hua Foo Website Preview',
    url: 'https://huafoo.ch/',
    description:
      'Website für die Coverband Hua Foo mit Bandvorstellung, Gigs, Musikbereich und direkter Buchungsanfrage.',
    tags: ['Band Website', 'Booking', 'Event / Musik', 'Responsive'],
    highlights: ['Gigs und Musik klar sichtbar', 'Buchungsweg direkt erreichbar'],
    badge: 'green',
    featured: true,
  },
  {
    title: 'Alexia Hairstylist',
    type: 'Hairstylist Portfolio',
    category: 'kundenprojekte',
    year: '2026',
    image: '/alexia_ref.png',
    imageAlt: 'Alexia Hairstylist Website Preview',
    url: 'https://alexia-hairstylist.vercel.app/',
    description:
      'Moderne Portfolio-Website mit Galerie, Behandlungsübersicht und klarer Instagram-DM-Anfrage.',
    tags: ['Portfolio', 'Hairstyling', 'Galerie', 'Instagram Anfrage'],
    highlights: ['Hair-Resultate hochwertig präsentiert', 'Mobile Anfrage über Instagram DM'],
    badge: 'green',
    featured: true,
  },
  {
    title: 'ACFinds',
    type: 'Product Discovery Platform',
    category: 'kundenprojekte',
    year: '2026',
    image: '/acfinds_ref.png',
    imageAlt: 'ACFinds Website Preview',
    url: 'https://www.acfinds.store/',
    description:
      'Curated Product-Discovery-Plattform für Fashion, Tech, Outfits, Brands und Seller.',
    tags: ['Product Discovery', 'Fashion & Tech', 'Curated Finds', 'E-Commerce UI'],
    highlights: ['Produkte und Kategorien schnell scanbar', 'Direkte Weiterleitung zu Shops'],
    badge: 'green',
  },
  {
    title: 'Jones Thala',
    type: 'Personal Portfolio',
    category: 'portfolio',
    year: '2026',
    image: '/jonesthala_ref.png',
    imageAlt: 'Jones Thala Website Preview',
    url: 'https://www.jonesthala.ch',
    description:
      'Persönliches Portfolio mit Terminal-inspiriertem Look, Skills, Projekten und Kontaktbereich.',
    tags: ['Portfolio Website', 'Terminal UI', 'Personal Brand', 'Responsive'],
    highlights: ['Markanter Terminal-Look', 'Skills und Projekte übersichtlich'],
    badge: 'green',
  },
  {
    title: 'Ilija Nikolic',
    type: 'Personal Portfolio',
    category: 'portfolio',
    year: '2026',
    image: '/ilija_ref.png',
    imageAlt: 'Ilija Nikolic Website Preview',
    url: 'https://portfolio-ilija.vercel.app/',
    description:
      'Cleanes persönliches Portfolio mit moderner Struktur, Skills, Projekten und klarer Kontaktführung.',
    tags: ['Portfolio Website', 'Personal Brand', 'Responsive', 'Vercel'],
    highlights: ['Ruhige visuelle Hierarchie', 'Kontaktbereich klar erreichbar'],
    badge: 'green',
  },
  {
    title: 'BMW Test Website',
    type: 'Fun Project',
    category: 'konzepte',
    year: '2026',
    image: '/bmw_ref.png',
    imageAlt: 'BMW Test Website Preview',
    url: 'https://bmw-test-website.vercel.app/',
    description:
      'Automotive-inspiriertes Konzept als Spielwiese für Premium-Layouts, visuelle Hierarchie und Web-Techniken.',
    tags: ['Test Website', 'Automotive', 'Premium UI', 'Vercel'],
    highlights: ['Premium-Branding als Experiment', 'Responsive Konzeptumsetzung'],
    badge: 'green',
  },
  {
    title: 'Drift',
    type: 'Fun Project',
    category: 'konzepte',
    year: '2026',
    image: '/drift_ref.png',
    imageAlt: 'Drift Website Preview',
    url: 'https://drift-ten-chi.vercel.app',
    description:
      'Dynamisches Web-Konzept mit starkem visuellem Auftritt, flüssigen Übergängen und modernem Layout.',
    tags: ['Konzept', 'Motion', 'Premium UI', 'Vercel'],
    highlights: ['Flüssige Animationen und Übergänge', 'Starkes visuelles Branding'],
    badge: 'green',
  },
];

const filterItems: { label: string; value: ProjectFilter }[] = [
  { label: 'Alle', value: 'all' },
  { label: 'Kundenprojekte', value: 'kundenprojekte' },
  { label: 'Portfolio', value: 'portfolio' },
  { label: 'Konzepte', value: 'konzepte' },
];

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

function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const visibleTags = project.tags.slice(0, featured ? 3 : 2);

  return (
    <article className={`project-card ${featured ? 'project-card-featured' : 'project-card-compact'} reveal visible`}>
      {project.url ? (
        <a
          href={project.url}
          className="project-card-thumb"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} live ansehen`}
        >
          <img src={project.image} alt={project.imageAlt} loading="lazy" />
        </a>
      ) : (
        <div className="project-card-thumb" aria-hidden="true">
          <img src={project.image} alt="" loading="lazy" />
        </div>
      )}

      <div className="project-card-body">
        <div className="project-card-meta">
          <span>{project.type}</span>
          <span>{project.year}</span>
        </div>

        <div>
          <h3 className="project-card-title">{project.title}</h3>
          <p className="project-card-desc">{project.description}</p>
        </div>

        {featured && (
          <ul className="project-card-highlights" aria-label={`${project.title} Highlights`}>
            {project.highlights.slice(0, 2).map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        )}

        <div className="project-card-footer">
          <span className={`project-badge ${project.badge}`}>{project.url ? 'Live' : 'Konzept'}</span>
          <div className="project-stack" aria-label={`${project.title} Tags`}>
            {visibleTags.map((tag) => (
              <span className="stack-tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
          {project.url && (
            <a href={project.url} className="project-link" target="_blank" rel="noopener noreferrer">
              Live ansehen ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('all');
  const featuredProjects = projects.filter((project) => project.featured);
  const visibleProjects =
    activeFilter === 'all'
      ? projects.filter((project) => !project.featured)
      : projects.filter((project) => project.category === activeFilter);
  const showFeatured = activeFilter === 'all';

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
              Jede Website ist ein Handwerk - von der ersten Struktur bis zum Launch.
              <br />
              Hier siehst du digitale Lösungen, sortiert nach echten Cases, Portfolios und Konzepten.
            </p>
          </div>
        </div>
      </section>

      <section className="flush-top">
        <div className="container">
          <div className="projects-showcase">
            {showFeatured && (
              <div className="projects-featured-block">
                <div className="projects-section-head reveal">
                  <p className="section-eyebrow">Featured Projects</p>
                  <div>
                    <h2>Ausgewählte Cases.</h2>
                    <p>Projekte mit starkem visuellen Auftritt, klarer Struktur und direktem Nutzen für Besucher.</p>
                  </div>
                </div>

                <div className="featured-project-grid">
                  {featuredProjects.map((project) => (
                    <ProjectCard project={project} featured key={project.title} />
                  ))}
                </div>
              </div>
            )}

            <div className="project-overview" id="alle-projekte">
              <div className="project-overview-head reveal">
                <div>
                  <p className="section-eyebrow">Projektfilter</p>
                  <h2>{activeFilter === 'all' ? 'Weitere Projekte.' : filterLabels[activeFilter]}</h2>
                </div>
                <nav className="project-tabs" aria-label="Projekt-Kategorien">
                  {filterItems.map((item) => (
                    <button
                      type="button"
                      className={`project-tab ${activeFilter === item.value ? 'active' : ''}`}
                      aria-pressed={activeFilter === item.value}
                      onClick={() => setActiveFilter(item.value)}
                      key={item.value}
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="project-filter-summary reveal visible" aria-live="polite">
                <span>{visibleProjects.length} Projekte</span>
                
              </div>

              <div className="project-category-grid project-filter-grid" key={activeFilter}>
                {visibleProjects.map((project) => (
                  <ProjectCard project={project} key={`${activeFilter}-${project.title}`} />
                ))}
              </div>
            </div>

            <div className="project-next reveal">
              <p className="project-next-label">Nächstes Projekt</p>
              <p className="project-next-title">Dein Projekt als nächstes?</p>
              <p className="project-next-text">
                Wir erstellen moderne Websites für lokale Unternehmen, Selbstständige und kreative Projekte.
              </p>
              <a href="/kontakt" className="btn btn-primary">
                Projekt anfragen
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
            <p>Transparent, direkt und passend für kleine Unternehmen, die ihre Website erstellen lassen möchten.</p>
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
    </main>
  );
}
