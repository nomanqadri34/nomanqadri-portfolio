import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import "./Navbar.css"; // Import the CSS file

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to open WhatsApp chat
  const handleWhatsAppClick = () => {
    const phoneNumber = "+918957582590"; // Replace with your actual WhatsApp number
    const message = encodeURIComponent("Hello! I'm interested in your services.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <nav className={`navbar ${sticky ? "sticky" : ""}`}>
      <div className="container">
        {/* Logo */}
        <div className="logo">
          <img src="lo1.png" alt="Logo" className="logo-img" />
        </div>

        {/* Desktop Menu */}
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          {["Home", "About", "Services", "Work-Experience", "Contact", "Team-Member"].map((item) => (
            <li key={item}>
              <Link to={`/${item.toLowerCase()}`} className="nav-item" onClick={() => setMenuOpen(false)}>
                {item}
              </Link>
            </li>
          ))}
        </ul>

        {/* WhatsApp CTA Button - Desktop */}
        <button className="cta-button" onClick={handleWhatsAppClick}>
          Let's Talk
        </button>

        {/* Mobile Menu Toggle */}
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <ul className="mobile-nav">
            {["Home", "About", "Services", "Work-Experience", "Contact", "Team-Member"].map((item) => (
              <li key={item}>
                <Link to={`/${item.toLowerCase()}`} className="nav-item" onClick={() => setMenuOpen(false)}>
                  {item}
                </Link>
              </li>
            ))}
          </ul>

          {/* WhatsApp CTA Button - Mobile */}
          <button className="cta-button" onClick={handleWhatsAppClick}>
            Let's Talk
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
