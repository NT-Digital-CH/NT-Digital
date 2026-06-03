export type PageKey =
  | 'home'
  | 'about'
  | 'skills'
  | 'projekte'
  | 'preise'
  | 'kontakt'
  | 'impressum'
  | 'datenschutz';

export type PageSeo = {
  path: string;
  label: string;
  title: string;
  description: string;
  image?: string;
};

const rawSiteUrl = import.meta.env.VITE_SITE_URL || 'https://nt-digital-ch.vercel.app';

export const siteConfig = {
  siteUrl: rawSiteUrl.replace(/\/+$/, ''),
  siteName: 'NT Digital',
  businessName: 'NT Digital',
  alternateName: 'Nikolic & Thala Digital',
  description: 'Moderne Websites und digitale Lösungen für lokale Unternehmen in der Schweiz.',
  email: 'nt-digital@mail.ch',
  locale: 'de_CH',
  language: 'de-CH',
  defaultImage: '/background-reference.png',
  githubUrl: 'https://github.com/NT-Digital-CH',
};

export const pageSeo: Record<PageKey, PageSeo> = {
  home: {
    path: '/',
    label: 'Startseite',
    title: 'NT Digital - Moderne Websites für lokale Unternehmen',
    description:
      'NT Digital erstellt moderne, schnelle und professionelle Websites für lokale Unternehmen in der Schweiz - klar, hochwertig und auf Anfragen optimiert.',
  },
  about: {
    path: '/about',
    label: 'Über uns',
    title: 'Über uns - Nikolic & Thala Digital',
    description:
      'Lerne Jones Thala und Ilija Nikolic kennen: zwei ICT-Lernende aus der Schweiz, die saubere, moderne Websites für KMUs entwickeln.',
  },
  skills: {
    path: '/skills',
    label: 'Was wir können',
    title: 'Webdesign & Frontend-Kompetenzen - NT Digital',
    description:
      'Frontend-Handwerk von NT Digital: responsive Layouts, Animationen, Micro-Interactions und saubere Umsetzung für moderne Firmenwebsites.',
  },
  projekte: {
    path: '/projekte',
    label: 'Projekte',
    title: 'Webdesign Projekte - NT Digital Schweiz',
    description:
      'Ausgewählte Websites und digitale Projekte von NT Digital - von Band-Websites bis Portfolios, mobilfreundlich und klar strukturiert.',
  },
  preise: {
    path: '/preise',
    label: 'Preise',
    title: 'Preise für Websites - NT Digital',
    description:
      'Richtpreise für Onepager, Landingpages und mehrseitige Websites. Stelle dein Projekt zusammen und frage deine Website direkt an.',
  },
  kontakt: {
    path: '/kontakt',
    label: 'Kontakt',
    title: 'Kontakt - Website erstellen lassen - NT Digital',
    description:
      'Kontaktiere NT Digital für eine moderne Website, ein Redesign oder eine Landingpage für dein lokales Unternehmen in der Schweiz.',
  },
  impressum: {
    path: '/impressum',
    label: 'Impressum',
    title: 'Impressum - NT Digital',
    description: 'Impressum von NT Digital mit Betreiberangaben, Kontaktadresse und E-Mail-Adresse.',
  },
  datenschutz: {
    path: '/datenschutz',
    label: 'Datenschutz',
    title: 'Datenschutz - NT Digital',
    description:
      'Datenschutzerklärung von NT Digital zur Bearbeitung von Personendaten, Hosting, Kontaktformular und eingesetzten Diensten.',
  },
};

export const indexedPages = Object.values(pageSeo);

export function pageFromPath(pathname: string): PageKey {
  const normalized = pathname.replace(/\/$/, '');

  if (normalized === '' || normalized === '/index.html') return 'home';
  if (normalized === '/about' || normalized === '/about.html') return 'about';
  if (normalized === '/skills' || normalized === '/skills.html') return 'skills';
  if (normalized === '/projekte' || normalized === '/projekte.html') return 'projekte';
  if (normalized === '/preise' || normalized === '/preise.html') return 'preise';
  if (normalized === '/kontakt' || normalized === '/kontakt.html') return 'kontakt';
  if (normalized === '/impressum' || normalized === '/impressum.html') return 'impressum';
  if (normalized === '/datenschutz' || normalized === '/datenschutz.html') return 'datenschutz';

  return 'home';
}

export function pathForPage(page: PageKey) {
  return pageSeo[page].path;
}

export function absoluteUrl(path: string) {
  return `${siteConfig.siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

export function imageUrl(path = siteConfig.defaultImage) {
  return absoluteUrl(path);
}

export function getPageSeo(page: PageKey) {
  const seo = pageSeo[page];
  return {
    ...seo,
    canonical: absoluteUrl(seo.path),
    image: imageUrl(seo.image),
  };
}

export function getStructuredData(page: PageKey) {
  const seo = getPageSeo(page);
  const organizationId = `${siteConfig.siteUrl}/#organization`;
  const websiteId = `${siteConfig.siteUrl}/#website`;
  const breadcrumbId = `${seo.canonical}#breadcrumb`;

  const breadcrumbItems = [
    {
      '@type': 'ListItem',
      position: 1,
      name: pageSeo.home.label,
      item: absoluteUrl(pageSeo.home.path),
    },
  ];

  if (page !== 'home') {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: seo.label,
      item: seo.canonical,
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': organizationId,
        name: siteConfig.businessName,
        alternateName: siteConfig.alternateName,
        description: siteConfig.description,
        url: siteConfig.siteUrl,
        logo: absoluteUrl('/favicon.svg'),
        email: siteConfig.email,
        areaServed: {
          '@type': 'Country',
          name: 'Schweiz',
        },
        serviceType: [
          'Webdesign',
          'Website Redesign',
          'Landingpages',
          'Firmenwebsites',
          'Digitale Lösungen',
        ],
        sameAs: [siteConfig.githubUrl],
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        name: siteConfig.siteName,
        alternateName: siteConfig.alternateName,
        url: siteConfig.siteUrl,
        inLanguage: siteConfig.language,
        publisher: {
          '@id': organizationId,
        },
      },
      {
        '@type': page === 'kontakt' ? 'ContactPage' : page === 'about' ? 'AboutPage' : 'WebPage',
        '@id': `${seo.canonical}#webpage`,
        url: seo.canonical,
        name: seo.title,
        description: seo.description,
        inLanguage: siteConfig.language,
        isPartOf: {
          '@id': websiteId,
        },
        about: {
          '@id': organizationId,
        },
        breadcrumb: {
          '@id': breadcrumbId,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': breadcrumbId,
        itemListElement: breadcrumbItems,
      },
    ],
  };
}
