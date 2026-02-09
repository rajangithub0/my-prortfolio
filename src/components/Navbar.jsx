import { useEffect, useRef, useState } from "react";
import OverlayMenu from "./OverlayMenu";
import R_Logo from "../assets/R_Logo.png";
import { FiMenu } from "react-icons/fi";

export default function Navbar() {
  // Controls overlay menu open/close
  const [menuOpen, setMenuOpen] = useState(false);

  // Controls navbar visibility (show / hide on scroll)
  const [visible, setVisible] = useState(true);

  // Forces navbar to stay visible when home section is in view
  const [forceVisible, setForceVisible] = useState(false);

  // Stores last scroll position
  const lastScrollY = useRef(0);

  // Timer for auto-hide after scrolling up
  const timerId = useRef(null);

  /* ---------------------------------------------------------
     Observe HOME section to force navbar visibility at top
  ---------------------------------------------------------- */
  useEffect(() => {
    const homeSection = document.querySelector("#home");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setForceVisible(true);
          setVisible(true);
        } else {
          setForceVisible(false);
        }
      },
      { threshold: 0.1 },
    );

    if (homeSection) observer.observe(homeSection);
    return () => homeSection && observer.unobserve(homeSection);
  }, []);

  /* ---------------------------------------------------------
     Handle navbar show/hide based on scroll direction
  ---------------------------------------------------------- */
  useEffect(() => {
    const handleScroll = () => {
      // Keep navbar visible if menu is open or home is visible
      if (forceVisible || menuOpen) {
        setVisible(true);
        return;
      }

      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      // Scroll down → hide navbar
      if (delta > 10) {
        setVisible(false);
      }

      // Scroll up → show navbar, then auto-hide after delay
      if (delta < -10) {
        setVisible(true);

        if (timerId.current) clearTimeout(timerId.current);
        timerId.current = setTimeout(() => {
          setVisible(false);
        }, 3000);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timerId.current) clearTimeout(timerId.current);
    };
  }, [forceVisible, menuOpen]);

  return (
    <>
      {/* Main Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50
        flex items-center justify-between px-6 py-4
        transition-transform duration-300
        ${visible ? "translate-y-0" : "-translate-y-full"}`}
      >
        {/* --------------------------------------------------
            LEFT: Logo + Name
        --------------------------------------------------- */}
        <div className="flex items-center space-x-2">
          <img src={R_Logo} alt="logo" className="w-10 h-10" />
          <span className="text-2xl font-bold text-white hidden sm:block">
            Rajan
          </span>
        </div>

        {/* --------------------------------------------------
            CENTER (lg screens): Hamburger Menu
            RIGHT (small screens): Hamburger Menu
        --------------------------------------------------- */}
        <div className="lg:absolute lg:left-1/2 lg:-translate-x-1/2">
          <button
            onClick={() => setMenuOpen(true)}
            className="text-white text-3xl focus:outline-none"
            aria-label="Open menu"
          >
            <FiMenu />
          </button>
        </div>

        {/* --------------------------------------------------
            RIGHT: Call-to-action button (desktop only)
        --------------------------------------------------- */}
        <div className="hidden lg:block">
          <a
            href="#contact"
            className="bg-linear-to-r from-pink-500 to-blue-500
            text-white px-5 py-2 rounded-full font-medium shadow-lg
            hover:opacity-90 transition-opacity duration-300"
          >
            Reach Out
          </a>
        </div>
      </nav>

      {/* Fullscreen Overlay Menu */}
      <OverlayMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
