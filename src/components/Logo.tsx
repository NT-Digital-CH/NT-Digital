type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <span className={className}>
      <span className="logo-mark">
        <span className="logo-nt">N</span>
        <span className="logo-triangle" aria-hidden="true" />
        <span className="logo-nt">T</span>
      </span>
      <span className="logo-digital">Digital</span>
    </span>
  );
}
