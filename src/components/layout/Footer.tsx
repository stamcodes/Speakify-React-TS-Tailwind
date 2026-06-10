// components/Layout/Footer.tsx
interface FooterLink {
  label: string;
  href: string;
}

interface FooterProps {
  navLinks: FooterLink[];
  legalLinks: FooterLink[];
  tagline: string;
}

function Footer({ navLinks, legalLinks, tagline }: FooterProps) {
  return (
    // components/Layout/Footer.tsx — update just the style prop
    <footer
      style={{
        background: `linear-gradient(to bottom, #d5d1e2 0%, #ccc8dc 100%)`,
      }}
    >
      {/* Main footer row */}
      <div className="flex justify-between items-start px-16 py-16">
        {/* Left — logo + tagline */}
        <div className="flex flex-col gap-3 max-w-xs">
          <div className="flex items-center gap-2">
            <img src="" alt="Speakify logo" className="w-5 h-5" />
            <span className="text-heading font-bold text-lg">Speakify</span>
          </div>
          <p className="text-grey text-sm leading-relaxed">{tagline}</p>
        </div>

        {/* Right — nav links */}
        <div className="flex items-center gap-8 pt-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-heading text-sm hover:opacity-70 transition-opacity"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-grey/20 mx-16" />

      {/* Bottom row */}
      <div className="flex justify-between items-center px-16 py-6">
        {/* Copyright */}
        <span className="text-grey text-sm">
          © 2026 Speakify. All rights reserved.
        </span>

        {/* Legal links */}
        <div className="flex items-center gap-6">
          {legalLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-grey text-sm hover:opacity-70 transition-opacity"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-4">
          <a href="#" className="text-grey hover:opacity-70 transition-opacity">
            <img src="" alt="Instagram" className="w-5 h-5" />
          </a>
          <a href="#" className="text-grey hover:opacity-70 transition-opacity">
            <img src="" alt="LinkedIn" className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
