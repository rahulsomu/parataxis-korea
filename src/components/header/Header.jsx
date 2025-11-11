import React, { useState, useEffect } from "react";
import "./Header.css";
import logo from "../../assets/images/korean-logo.webp";
import LanguageToggle from "./LanguageToggle";
import { useTranslation } from "../../context/TranslationContext";
import { Link } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, changeLanguage, translate } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 0;
      setIsScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "unset";
    };
  }, []);

  const scrollToSection = (sectionId) => {
    setIsMenuOpen(false);
    document.body.style.overflow = "unset";
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? "hidden" : "unset";
  };

  const handleLanguageToggle = (newLanguage) => {
    changeLanguage(newLanguage);
  };

  const NavLinks = () => (
    <ul className="nav-links">
      <li>
        <Link to="/#about" onClick={scrollToSection}>
          {translate("navigation.about")}
        </Link>
      </li>
      <li>
        <Link to="/#culture-philosophy" onClick={scrollToSection}>
          {translate("navigation.investmentPhilosophy")}
        </Link>
      </li>
      <li>
        <Link to="/#our-difference" onClick={scrollToSection}>
          {translate("navigation.ourDifference")}
        </Link>
      </li>
      <li>
        <Link to="/#leadership" onClick={scrollToSection}>
          {translate("navigation.team")}
        </Link>
      </li>
      <li>
        <Link to="/#investor-relations" onClick={scrollToSection}>
          {translate("navigation.investorRelations")}
        </Link>
      </li>
      <li>
        <Link to="/#contact" onClick={scrollToSection}>
          {translate("navigation.contact")}
        </Link>
      </li>
    </ul>
  );

  return (
    <header
      className={`header ${isScrolled ? "scrolled" : ""} ${
        isMenuOpen ? "menu-open" : ""
      }`}
    >
      <nav>
        <div className="logo">
          <a href="/">
            <img src={logo} alt="Parataxis Logo" />
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="header-right">
          <div className="desktop-nav">
            <NavLinks />
          </div>
          <LanguageToggle language={language} onToggle={handleLanguageToggle} />
          <button
            className={`hamburger ${isMenuOpen ? "active" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile Navigation Overlay */}
        <div className={`mobile-nav-overlay ${isMenuOpen ? "active" : ""}`}>
          <NavLinks />
        </div>
      </nav>
      <div className="promotion-text">
        <p>
          {translate("promotionText.main")}{" "}
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSf_g2MoKOjYAA4jWBosxfaZYrODaJrtFmPNvUlz54cccUxuUw/viewform"
            target="_blank"
          >
            {translate("promotionText.link")}
          </a>
          {translate("promotionText.end")}
        </p>
      </div>
    </header>
  );
};

export default Header;
