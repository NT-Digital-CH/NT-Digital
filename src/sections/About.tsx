import { ScrambleTitle } from '../components/ScrambleTitle';

const teamMembers = [
  {
    name: 'Jones Thala',
    img: '/jonesthala.png',

    bio: 'ICT-Fachmann im 2. Lehrjahr. Fokus auf sauberen Code, modernes Web-Design und Systeme die funktionieren. Code ist für mich kein Job - es ist Handwerk.',
    github: 'https://github.com/jonesthala',
    githubLabel: 'github.com/jonesthala ↗',
    linkedin: 'https://www.linkedin.com/in/jones-thala-0372a9335',
  },
  {
    name: 'Ilija Nikolic',
    img: '/ilijanikolic.jpg',
  
    bio: 'ICT-Fachmann im 2. Lehrjahr. Gleiche Leidenschaft, gleiche Ziele - zusammen bauen wir Websites die überzeugen. Qualität ist kein Zufall, sondern Entscheidung.',
    github: 'https://github.com/nexpriv',
    githubLabel: 'github.com/nexpriv ↗',
    linkedin: 'https://www.linkedin.com/in/ilija-nikolic-418a6437a/',
  },
];

const values = [
  {
    num: '01',
    title: 'Qualität vor Quantität',
    text: 'Wir nehmen uns Zeit für jedes Projekt. Lieber wenige Websites, dafür jede richtig.',
  },
  {
    num: '02',
    title: 'Ehrliche Kommunikation',
    text: 'Kein Fachchinesisch. Wir erklären was wir tun - verständlich, direkt, ohne Umwege.',
  },
  {
    num: '03',
    title: 'Faire Preise',
    text: 'Als Lernende bieten wir Top-Qualität zu fairen Konditionen. Gute Websites sind kein Luxus.',
  },
];

const skillGroups = [
  ['Web', ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Mobile-First', 'Git', 'GitHub Pages']],
  ['Systeme & Tools', ['Linux', 'Windows Server', 'PowerShell', 'Bash', 'Docker', 'Virtualization']],
  ['Networking', ['TCP/IP', 'DNS', 'DHCP', 'VLANs', 'Subnetting', 'Cisco', 'Firewalls']],
  ['Dev-Tools', ['VS Code', 'Chrome DevTools', 'Claude Code', 'Google Fonts', 'Wireshark']],
] as const;

function GithubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function About() {
  return (
    <main>
      <section className="hero hero-inner">
        <div className="container">
          <div className="hero-body">
            <p className="hero-eyebrow reveal">Das Team</p>
            <ScrambleTitle
              prefix="Nikolic & Thala –"
              words={['wir tippen. du wächst.', 'zwei. ein ziel.', 'lernende. hungrig.', 'handwerk. ehrlich.']}
              className="hero-title"
              delay={0.4}
            />
            <p className="lead reveal reveal-delay-2">
              Zwei Lernende ICT-Fachmänner aus der Schweiz. NT Digital ist unser gemeinsames Vorhaben: professionelle
              Web-Lösungen für KMUs, die sonst keine grosse Agentur bezahlen könnten.
            </p>
          </div>
        </div>
      </section>

      <section className="flush-top">
        <div className="container">
          <div className="team-list">
            {teamMembers.map((member, index) => (
              <article className={`team-member reveal ${index === 1 ? 'reveal-delay-1' : ''}`} key={member.name}>
                <div className="team-member-img-wrap">
                  <img src={member.img} alt={member.name} className="team-member-img" width={200} height={200} />
                </div>
                <div className="team-member-content">
                  <div className="team-member-head">
                    <span className="team-name">{member.name}</span>
                    <span className="team-role">{member.role}</span>
                  </div>
                  <p className="team-bio">{member.bio}</p>
                  <p className="team-skills-inline" aria-label="Technologien">
                    HTML · CSS · JavaScript · Responsive Design · Git · Linux · Networking · PowerShell · Bash · Docker ·
                    VS Code
                  </p>
                  <div className="team-links">
                    <a href={member.github} className="team-link" target="_blank" rel="noopener">
                      <GithubIcon />
                      {member.githubLabel}
                    </a>
                    <a href={member.linkedin} className="team-link" target="_blank" rel="noopener">
                      <LinkedInIcon />
                      LinkedIn ↗
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-intro reveal">
            <p className="section-eyebrow">Unsere Werte</p>
            <h2>Was uns antreibt.</h2>
          </div>

          <div className="values-list">
            {values.map((value, index) => (
              <div
                className={`value-item reveal ${index === 1 ? 'reveal-delay-1' : index === 2 ? 'reveal-delay-2' : ''}`}
                key={value.num}
              >
                <span className="value-num">{value.num}</span>
                <div>
                  <p className="value-title">{value.title}</p>
                  <p className="value-text">{value.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-intro reveal">
            <p className="section-eyebrow">Technologien</p>
            <h2>Womit wir arbeiten.</h2>
            <p>Nicht nur Web - wir kennen uns in der ganzen ICT-Welt aus.</p>
          </div>

          <div className="skills-grid reveal">
            {skillGroups.map(([label, skills]) => (
              <div key={label}>
                <p className="skill-cat-label">{label}</p>
                <div className="skill-items">
                  {skills.map((skill) => (
                    <span className="skill-item" key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tight">
        <div className="container">
          <div className="cta-strip reveal">
            <h2>Lass uns zusammenarbeiten.</h2>
            <a href="/kontakt" className="btn btn-primary">
              Kontakt aufnehmen →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
