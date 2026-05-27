import { useEffect, useMemo, useState } from 'react';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { ScrollProgress } from './components/ScrollProgress';
import { About } from './sections/About';
import { Contact } from './sections/Contact';
import { Datenschutz } from './sections/Datenschutz';
import { Home } from './sections/Home';
import { Impressum } from './sections/Impressum';
import { Prices } from './sections/Prices';
import { Projects } from './sections/Projects';
import { Skills } from './sections/Skills';

type PageKey = 'home' | 'about' | 'skills' | 'projekte' | 'preise' | 'kontakt' | 'impressum' | 'datenschutz';

const pageMeta: Record<PageKey, { title: string; description: string }> = {
  home: {
    title: 'NT Digital - Wir bauen Websites die auffallen',
    description:
      'NT Digital - Moderne Websites von zwei ICT-Lernenden aus der Schweiz. Sauber gebaut, mobilfreundlich, auf den Punkt.',
  },
  about: {
    title: 'Über uns - NT Digital',
    description:
      'NT Digital - Zwei ICT-Lernende aus der Schweiz. Jones Thala & Nikolic bauen Websites mit Leidenschaft.',
  },
  skills: {
    title: 'Was wir können - NT Digital',
    description:
      'NT Digital - Was wir können. Frontend-Handwerk live demonstriert: CSS Animationen, Micro-Interactions, Glassmorphism, Responsive Design, Scroll-Animationen und Typografie.',
  },
  projekte: {
    title: 'Projekte - NT Digital',
    description:
      'NT Digital Projekte - MMAC Center Kampfschule Bachenbülach und weitere Webprojekte von Jones Thala & Nikolic.',
  },
  preise: {
    title: 'Preise - NT Digital',
    description: 'NT Digital Preise - Grobe Projektpreise für kleine Websites mit interaktivem Preis-Konfigurator.',
  },
  kontakt: {
    title: 'Kontakt - NT Digital',
    description: 'NT Digital - Kontakt. Schreib uns direkt, wir melden uns schnell.',
  },
  impressum: {
    title: 'Impressum - NT Digital',
    description: 'Impressum von NT Digital mit Betreiberangaben und Kontaktadresse.',
  },
  datenschutz: {
    title: 'Datenschutz - NT Digital',
    description: 'Datenschutzerklärung von NT Digital zur Bearbeitung von Personendaten.',
  },
};

function pageFromPath(pathname: string): PageKey {
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

function pathForPage(page: PageKey) {
  return page === 'home' ? '/' : `/${page}`;
}

function useRoute() {
  const [page, setPage] = useState<PageKey>(() => pageFromPath(window.location.pathname));

  useEffect(() => {
    const onPopState = () => setPage(pageFromPath(window.location.pathname));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const anchor = target?.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      const targetAttr = anchor.getAttribute('target');
      if (!href || targetAttr || href.startsWith('mailto:') || href.startsWith('http')) return;

      const nextUrl = new URL(href, window.location.origin);
      const nextPage = pageFromPath(nextUrl.pathname);
      event.preventDefault();
      window.history.pushState({}, '', `${pathForPage(nextPage)}${nextUrl.search}${nextUrl.hash}`);
      setPage(nextPage);
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return page;
}

function useScrollUi() {
  const [progress, setProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0);
      setIsScrolled(window.scrollY > 20);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
    };
  }, []);

  return { progress, isScrolled };
}

function usePageEffects(page: PageKey) {
  useEffect(() => {
    document.body.dataset.page = page;
    document.title = pageMeta[page].title;

    let description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!description) {
      description = document.createElement('meta');
      description.name = 'description';
      document.head.appendChild(description);
    }
    description.content = pageMeta[page].description;
  }, [page]);

  useEffect(() => {
    const revealTargets = document.querySelectorAll('.reveal');
    const observers: IntersectionObserver[] = [];

    if (revealTargets.length) {
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
      );

      revealTargets.forEach((element) => revealObserver.observe(element));
      observers.push(revealObserver);
    }

    const processSteps = document.querySelectorAll('.process-step');
    if (processSteps.length) {
      const stepObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              stepObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 },
      );

      processSteps.forEach((step) => stepObserver.observe(step));
      observers.push(stepObserver);
    }

    const tagCloud = document.getElementById('tag-cloud');
    if (tagCloud) {
      const tags = tagCloud.querySelectorAll('.skill-tag');
      const tagObserver = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            tags.forEach((tag, index) => {
              window.setTimeout(() => tag.classList.add('visible'), index * 30);
            });
            tagObserver.disconnect();
          }
        },
        { threshold: 0.1 },
      );

      tagObserver.observe(tagCloud);
      observers.push(tagObserver);
    }

    return () => observers.forEach((observer) => observer.disconnect());
  }, [page]);

}

export function App() {
  const page = useRoute();
  const { progress, isScrolled } = useScrollUi();
  usePageEffects(page);

  const Page = useMemo(() => {
    switch (page) {
      case 'about':
        return About;
      case 'skills':
        return Skills;
      case 'projekte':
        return Projects;
      case 'preise':
        return Prices;
      case 'kontakt':
        return Contact;
      case 'impressum':
        return Impressum;
      case 'datenschutz':
        return Datenschutz;
      case 'home':
      default:
        return Home;
    }
  }, [page]);

  return (
    <>
      <ScrollProgress progress={progress} />
      <Navbar currentPage={page} isScrolled={isScrolled} />
      <Page />
      <Footer />
    </>
  );
}
