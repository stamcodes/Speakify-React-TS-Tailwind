import { Link } from "react-router-dom";
import { NAV_LINKS } from "./navbar.config";

// 1. Ensures role strictly matches the keys defined in your config file
type Role = keyof typeof NAV_LINKS;

interface NavbarProps {
  role?: Role;
}

function Navbar({ role = "guest" }: NavbarProps) {
  const links = NAV_LINKS[role] || NAV_LINKS["guest"];

  return (
    <nav className="h-16 flex items-center px-12 justify-between border-b border-gray-100">
      {/* 1. Left Corner Item */}
      <Link to="/" className="font-bold text-lg flex items-center gap-1">
        <span>⚡</span> Speakify
      </Link>

      {/* 2. Right Corner Item (No trailing items after this) */}
      <div className="flex gap-6 text-sm font-medium text-gray-600">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="hover:text-black transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
