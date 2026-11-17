import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import "./Header.css";

const NAV_ITEMS = ["Home", "About Us", "Specialities", "Doctors", "Varicose Vein", "Health Calculator", "Consultation", "Contact Us"];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const locationKey = location.key;
  useEffect(() => {
    const id = setTimeout(() => setIsOpen(false), 0);
    return () => clearTimeout(id);
  }, [locationKey]);
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
    };


    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const isHome = location.pathname === '/';
  const isAbout = location.pathname === '/about-us';
  const isSpecialities = location.pathname === '/specialities';
  const isDoctors = location.pathname === '/doctors';
  const isContact = location.pathname === '/contact-us';
  const isConsultation = location.pathname === '/book-consultation' || location.pathname === '/consultation';
  const isHealthCalculator = location.pathname === '/health-calculator' || location.pathname === '/dietician-plan';

  const shouldBeTransparent = (isHome || isAbout || isSpecialities || isDoctors || isContact || isConsultation) && !scrolled;

  const getItemPath = (item) => {
    if (item === 'Home') return '/';
    if (item === 'Consultation') return '/book-consultation';
    if (item === 'Health Calculator') return '/health-calculator';
    if (item === 'Varicose Vein') return '/varicose-veins-treatment';
    return `/${item.toLowerCase().replace(/ /g, '-')}`;
  };

  return (
    <>
      {/* ================= FLOATING HEADER ================= */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`site-header ${shouldBeTransparent ? "transparent" : "scrolled"}`}
      >
        <div className="header-bar">

          {/* Logo */}

          <Link to="/" className="header-logo">
            <img src="/FH.png" alt="Futureace Hospital" className="logo-img" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="header-nav">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item}
                to={getItemPath(item)}
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Language Selector */}
          {isHealthCalculator && (
            <div className="header-lang-wrapper" style={{ display: 'flex', alignItems: 'center' }}>
              <LanguageSelector variant="header" />
            </div>
          )}

          {/* Desktop CTA */}
          <Link to="/book-consultation" className="cta-eldiora">
            <span className="cta-label">Book Now</span>
            <span className="cta-dot">
              <span className="cta-arrow">↗</span>
            </span>
          </Link>

          {/* Mobile Toggle */}
          <button
            className="header-menu-btn"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

        </div>
      </motion.header>

      {/* ================= MOBILE DRAWER ================= */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="mobile-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280, mass: 0.8 }}
            >
              <div className="mobile-drawer-header" style={{ display: 'flex', alignItems: 'center', justifyContent: isHealthCalculator ? 'space-between' : 'flex-end', padding: '0 20px' }}>
                {isHealthCalculator && <LanguageSelector variant="bar" />}
                <button onClick={() => setIsOpen(false)}>
                  <X size={32} />
                </button>
              </div>

              <div className="mobile-nav">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item}
                    to={getItemPath(item)}
                    onClick={() => setIsOpen(false)}
                  >
                    {item}
                  </Link>
                ))}

                <Link
                  to="/contact-us"
                  className="mobile-cta"
                  onClick={() => setIsOpen(false)}
                >
                  Book Appointment
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
