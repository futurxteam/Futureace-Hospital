import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import "./Header.css";

const NAV_ITEMS = ["Home", "About Us", "Specialities", "Doctors", "Contact Us"];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      {/* ================= FLOATING HEADER ================= */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="site-header"
      >
        <div className="header-bar">

          {/* Logo */}
        
<Link to="/" className="header-logo">
  <img src="/FGHRC.png" alt="Futureace Hospital" className="logo-img" />
</Link>

          {/* Desktop Navigation */}
          <nav className="header-nav">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
<Link to="/contact-us" className="header-cta">
            Book Appointment
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
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <div className="mobile-drawer-header">
                <button onClick={() => setIsOpen(false)}>
                  <X size={32} />
                </button>
              </div>

              <div className="mobile-nav">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item}
                    to={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
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
