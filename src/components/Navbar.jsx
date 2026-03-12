import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-scroll";
import { FaBars, FaTimes } from "react-icons/fa";

const navLinks = [
  { label: "Home", to: "home" },
  { label: "Jobs", to: "jobs" },
  { label: "Services", to: "services" },
  { label: "Employers", to: "employers" },
  { label: "About", to: "about" },
  { label: "Contact", to: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-lg border-b border-white/10 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link to="home" smooth duration={600} className="cursor-pointer flex items-center gap-2 select-none">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2EE6D6] to-[#F5B400] flex items-center justify-center font-black text-black text-sm">
            SV
          </div>
          <div className="hidden sm:block">
            <span className="font-bold text-white text-sm leading-none block">Smart Vision</span>
            <span className="text-[10px] text-[#2EE6D6] tracking-widest uppercase">HR Solutions</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                smooth
                duration={600}
                offset={-80}
                className="relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-[#2EE6D6] transition-colors cursor-pointer group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#2EE6D6] group-hover:w-4/5 transition-all duration-300 rounded-full" />
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-3">
          <Link
            to="resume"
            smooth
            duration={600}
            offset={-80}
            className="hidden md:inline-flex items-center px-5 py-2 rounded-full bg-[#2EE6D6] text-black font-semibold text-sm hover:bg-[#1bc9b9] transition-all duration-200 cursor-pointer btn-glow"
          >
            Submit Resume
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white p-2 rounded-md"
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/95 backdrop-blur-lg border-t border-white/10 overflow-hidden"
          >
            <ul className="flex flex-col py-4">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    smooth
                    duration={600}
                    offset={-80}
                    onClick={() => setMenuOpen(false)}
                    className="block px-8 py-3 text-gray-300 hover:text-[#2EE6D6] hover:bg-white/5 transition-colors cursor-pointer font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="px-8 pt-3">
                <Link
                  to="resume"
                  smooth
                  duration={600}
                  offset={-80}
                  onClick={() => setMenuOpen(false)}
                  className="block text-center px-5 py-2.5 rounded-full bg-[#2EE6D6] text-black font-semibold text-sm cursor-pointer"
                >
                  Submit Resume
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
