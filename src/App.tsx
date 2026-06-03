import { lazy, Suspense, useEffect, useMemo, useState, type ComponentType } from 'react';
import { Background } from './components/Background';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { ScrollProgress } from './components/ScrollProgress';
import {
  getPageSeo,
  getStructuredData,
  pageFromPath,
  pathForPage,
  siteConfig,
  type PageKey,
} from './config/seo';
import { Home } from './sections/Home';

const About = lazy(() => import('./sections/About').then(({ About }) => ({ default: About })));
const Contact = lazy(() => import('./sections/Contact').then(({ Contact }) => ({ default: Contact })));
const Datenschutz = lazy(() => import('./sections/Datenschutz').then(({ Datenschutz }) => ({ default: Datenschutz })));
const Impressum = lazy(() => import('./sections/Impressum').then(({ Impressum }) => ({ default: Impressum })));
const Prices = lazy(() => import('./sections/Prices').then(({ Prices }) => ({ default: Prices })));
const Projects = lazy(() => import('./sections/Projects').then(({ Projects }) => ({ default: Projects })));
const Skills = lazy(() => import('./sections/Skills').then(({ Skills }) => ({ default: Skills })));

function setMeta(selector: string, attribute: 'name' | 'property', key: string, content: string) {
  let element = document.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.content = content;
}

function setCanonical(href: string) {
  let element = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!element) {
    element = document.createElement('link');
    element.rel = 'canonical';
    document.head.appendChild(element);
  }

  element.href = href;
}

function setStructuredData(page: PageKey) {
  let element = document.querySelector<HTMLScriptElement>('script[data-schema="nt-digital"]');

  if (!element) {
    element = document.createElement('script');
    element.type = 'application/ld+json';
    element.dataset.schema = 'nt-digital';
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(getStructuredData(page));
}

function applySeo(page: PageKey) {
  const seo = getPageSeo(page);

  document.documentElement.lang = siteConfig.language;
  document.title = seo.title;

  setMeta('meta[name="description"]', 'name', 'description', seo.description);
  setCanonical(seo.canonical);

  setMeta('meta[property="og:title"]', 'property', 'og:title', seo.title);
  setMeta('meta[property="og:description"]', 'property', 'og:description', seo.description);
  setMeta('meta[property="og:type"]', 'property', 'og:type', 'website');
  setMeta('meta[property="og:url"]', 'property', 'og:url', seo.canonical);
  setMeta('meta[property="og:image"]', 'property', 'og:image', seo.image);
  setMeta('meta[property="og:site_name"]', 'property', 'og:site_name', siteConfig.siteName);
  setMeta('meta[property="og:locale"]', 'property', 'og:locale', siteConfig.locale);

  setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
  setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', seo.title);
  setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', seo.description);
  setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', seo.image);

  setStructuredData(page);
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

function useSeoEffects(page: PageKey) {
  useEffect(() => {
    document.body.dataset.page = page;
    applySeo(page);
  }, [page]);
}

function useRevealEffects(page: PageKey) {
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

type PageContentProps = {
  page: PageKey;
  Page: ComponentType;
};

function PageContent({ page, Page }: PageContentProps) {
  useRevealEffects(page);

  return (
    <>
      <Page />
      <Footer />
    </>
  );
}

export function App() {
  const page = useRoute();
  const { progress, isScrolled } = useScrollUi();
  useSeoEffects(page);

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
    <div className="app-shell">
      <Background />
      <ScrollProgress progress={progress} />
      <Navbar currentPage={page} isScrolled={isScrolled} />
      <div className="app-content">
        <Suspense fallback={null}>
          <PageContent page={page} Page={Page} />
        </Suspense>
      </div>
    </div>
  );
}
