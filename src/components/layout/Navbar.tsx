// Navbar.tsx
import { Link } from "react-router-dom";
import { NAV_LINKS } from "./navbar.config";
import type { Role } from "./navbar.config";

interface NavbarProps {
  role?: Role;
  end?: React.ReactNode;
}

function Navbar({ role = "guest", end }: NavbarProps) {
  const links = NAV_LINKS[role];

  return (
    <nav className="absolute top-0 left-0 w-full h-16 flex items-center z-10 px-12 pt-6">
      <Link to="/" className="w-[20%] flex items-center">
        <img src="/images/SpeakifyLogoDark.png" alt="Speakify" />
      </Link>

      <div className="flex gap-6 text-sm font-normal text-grey">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="hover:text-heading transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center ml-auto px-4">{end}</div>
    </nav>
  );
}

export default Navbar;
