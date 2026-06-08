// import AuthButtons from "../UI/AuthButtons";
// import UserMenu from "../UI/UserMenu";
import { Link } from "react-router-dom";
import { NAV_LINKS } from "./navbar.config";

type Role = keyof typeof NAV_LINKS;
function Navbar({ role = "guest" }: { role?: Role }) {
  const links = NAV_LINKS[role];

  return (
    <nav className="h-16 flex items-center px-12 justify-between">
      <span>⚡ Speakify</span>

      <div className="flex gap-6 text-sm text-gray-600">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="text-sm text-gray-600"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/*{role === "guest" ? <AuthButtons /> : <UserMenu />} */}
    </nav>
  );
}
export default Navbar;
