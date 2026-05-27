import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <a href="/" className="footer-logo">
            <Logo />
          </a>
          <div className="footer-copy">
            <span>© 2026 NT Digital</span>
            <span className="footer-sep">·</span>
            <a href="mailto:nt-digital@mail.ch">nt-digital@mail.ch</a>
            <span className="footer-sep">·</span>
            <a href="/impressum">Impressum</a>
            <span className="footer-sep">·</span>
            <a href="/datenschutz">Datenschutz</a>
            <span className="footer-sep">·</span>
            <a href="https://github.com/NT-Digital-CH/NT-Digital" target="_blank" rel="noopener">
              github.com/NT-Digital
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
