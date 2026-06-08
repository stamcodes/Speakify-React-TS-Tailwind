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
    <nav className="absolute top-0 left-0 w-full h-16 flex items-center px-12 justify-between z-10">
      {/* Logo — always dark */}
      <Link
        to="/"
        className="font-bold text-lg flex items-center gap-1 text-gray-900"
      >
        <img src="/images/SpeakifyLogoDark.png" alt="" />
      </Link>

      {/* Middle links — white if overlapsImage */}
      <div className="flex gap-6 text-sm font-medium text-gray-600">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="hover:opacity-80 transition-opacity"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Right slot */}
      <div className="flex items-center gap-3">{end}</div>
    </nav>
  );
}

export default Navbar;
