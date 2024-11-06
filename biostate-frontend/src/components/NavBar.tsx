import { House, Moon, Network, Sun, User, WholeWord } from "lucide-react";
import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";

const navLinks = [
  { path: "/", label: "Home", icon: <House size={16} /> },
  {
    path: "/binarytree",
    label: "Binary Tree Page",
    icon: <Network size={16} />,
  },
  {
    path: "/substring",
    label: "Substring Page",
    icon: <WholeWord size={16} />,
  },
  {
    path: "/dashboard",
    label: "User Dashboard",
    icon: <User size={16} />,
  },
];

interface NavBarProps {
  toggleTheme: () => void;
  theme: string;
}

const NavBar: React.FC<NavBarProps> = ({ toggleTheme, theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <nav className="bg-blue-600 text-white fixed w-full top-0 z-10 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          to="/home"
          className="text-2xl font-bold"
          onClick={() => setIsOpen(false)}
        >
          Biostate.AI
        </Link>
        <div className="flex flex-row justify-center items-center gap-4">
          <div
            className="flex flex-row justify-center items-center gap-2 cursor-pointer"
            onClick={toggleTheme}
          >
            <button
              className={
                "flex items-center justify-center w-8 h-8 bg-gray-700 dark:bg-white dark:text-yellow-500 rounded-full text-white md:ml-4"
              }
              aria-label="Toggle Theme"
            >
              {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
            </button>
            <p className="hidden md:block font-semibold">Toggle Theme</p>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
              className="focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <DesktopLinks isOpen={isOpen} closeMenu={() => setIsOpen(false)} />
      </div>

      {isOpen && <MobileLinks closeMenu={toggleMenu} />}
    </nav>
  );
};

const DesktopLinks: React.FC<{ isOpen: boolean; closeMenu: () => void }> = ({
  isOpen,
  closeMenu,
}) => (
  <div className={`md:flex md:items-center space-x-6 ${"hidden"}`}>
    {navLinks.map((link) => (
      <Link
        key={link.path}
        to={link.path}
        onClick={closeMenu}
        className="hover:text-gray-200 flex flex-row gap-2 items-center"
      >
        {link.icon}
        {link.label}
      </Link>
    ))}
  </div>
);

const MobileLinks: React.FC<{ closeMenu: () => void }> = ({ closeMenu }) => (
  <div className="md:hidden bg-blue-700 text-white">
    {navLinks.map((link) => (
      <Link
        key={link.path}
        to={link.path}
        onClick={closeMenu}
        className="px-4 py-2 hover:bg-blue-600 flex flex-row gap-2 items-center"
      >
        {link.icon}
        {link.label}
      </Link>
    ))}
  </div>
);

export default NavBar;
