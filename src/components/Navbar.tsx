import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollSpy } from "../hooks/useScrollSpy";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "About", href: "#about", id: "about" },
  { label: "Arsenal", href: "#arsenal", id: "arsenal" },
  { label: "Education", href: "#education", id: "education" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Achievements", href: "#achievements", id: "achievements" },
  { label: "Certifications", href: "#certifications", id: "certifications" },
  { label: "Contact", href: "#contact", id: "contact" },
];

const sectionIds = navLinks.map((l) => l.id);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useScrollSpy(sectionIds, 160);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Focus trap for mobile menu
  useEffect(() => {
    if (!mobileOpen) return;

    const menu = menuRef.current;
    if (!menu) return;

    // Focus the first link on open
    const firstLink = menu.querySelector("a") as HTMLElement | null;
    firstLink?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMobile();
        hamburgerRef.current?.focus();
        return;
      }

      if (e.key !== "Tab") return;

      const links = Array.from(menu.querySelectorAll("a")) as HTMLElement[];
      if (links.length === 0) return;

      const first = links[0];
      const last = links[links.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen, closeMobile]);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className={`transition-all duration-500 ease-out ${
          scrolled
            ? "bg-bg-card/85 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-border/50"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#"
            className="text-xl font-bold text-primary hover:text-primary-light transition-colors"
          >
            &lt;Ankit /&gt;
          </a>



          {/* Desktop links */}
          <ul className="hidden md:flex gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "text-primary bg-primary/10"
                        : "text-text-muted hover:text-primary hover:bg-primary/5"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                        layoutId="nav-indicator"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Resume link + Theme toggle + Mobile hamburger */}
          <div className="flex items-center gap-2">
            <a
              href="/Ankit_Kumar_Singh_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-primary bg-primary/10 hover:bg-primary hover:text-white rounded-lg border border-primary/20 transition-all duration-200"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              CV
            </a>

            <ThemeToggle />

            {/* Mobile hamburger */}
            <button
              ref={hamburgerRef}
              className="md:hidden p-2 rounded-lg hover:bg-primary/10 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <svg
                className="w-6 h-6 text-text"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden bg-bg-card/95 backdrop-blur-xl border-t border-border shadow-xl shadow-black/30"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <ul ref={menuRef} id="mobile-menu" className="flex flex-col p-4 gap-1" role="menu">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.id;
                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        closeMobile();
                        // Small delay so menu exit animation doesn't block scroll
                        setTimeout(() => {
                          const target = document.getElementById(link.id);
                          if (target) {
                            target.scrollIntoView({ behavior: "smooth", block: "start" });
                          }
                        }, 50);
                      }}
                      className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? "text-primary bg-primary/10"
                          : "text-text-muted hover:text-primary hover:bg-primary/5"
                      }`}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                );
              })}
              <motion.li
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.04, duration: 0.3 }}
              >
                <a
                  href="/Ankit_Kumar_Singh_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobile}
                  className="flex items-center justify-between px-4 py-3 rounded-lg text-sm font-semibold text-primary bg-primary/10 hover:bg-primary hover:text-white transition-all"
                >
                  <span>📄 View / Download CV</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
