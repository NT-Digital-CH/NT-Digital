import { useEffect, useState } from 'react';
import { Button } from './Button';
import { Logo } from './Logo';

const links = [
  { href: '/about', label: 'Über uns', page: 'about' },
  { href: '/skills', label: 'Was wir können', page: 'skills' },
  { href: '/projekte', label: 'Projekte', page: 'projekte' },
  { href: '/kontakt', label: 'Kontakt', page: 'kontakt' },
];

type NavbarProps = {
  currentPage: string;
  isScrolled: boolean;
};

export function Navbar({ currentPage, isScrolled }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav className={`nav ${isScrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Hauptnavigation">
        <div className="nav-inner">
          <a
            href="/"
            className="nav-logo"
            aria-label="NT Digital - Startseite"
            style={{ opacity: isOpen ? 0 : 1 }}
            onClick={closeMenu}
          >
            <Logo />
          </a>

          <ul className="nav-links" role="list">
            {links.map((link) => (
              <li key={link.page}>
                <a href={link.href} data-nav={link.page} className={currentPage === link.page ? 'active' : undefined}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <Button href="/kontakt" className="nav-cta">
            Projekt anfragen
          </Button>

          <button
            className={`hamburger ${isOpen ? 'open' : ''}`}
            aria-label={isOpen ? 'Menü schließen' : 'Menü öffnen'}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={`nav-mobile ${isOpen ? 'open' : ''}`} role="dialog" aria-label="Mobile Navigation">
        {links.map((link) => (
          <a
            key={link.page}
            href={link.href}
            data-nav={link.page}
            className={currentPage === link.page ? 'active' : undefined}
            onClick={closeMenu}
          >
            {link.label}
          </a>
        ))}
        <Button href="/kontakt" className="mobile-cta" onClick={closeMenu}>
          Projekt anfragen
        </Button>
      </div>
    </>
  );
}
