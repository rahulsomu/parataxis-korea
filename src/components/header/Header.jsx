import React, { useState, useEffect, useCallback } from "react";
import "./Header.css";
import logo from "../../assets/images/korean-logo.webp";
import LanguageToggle from "./LanguageToggle";
import { useTranslation } from "../../context/TranslationContext";
import { Link } from "react-router-dom";
import { sheetUrl } from "../../constants";
import { htmlDecoder } from "../../utils/helpers";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, changeLanguage, translate } = useTranslation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBannerText = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Fetch the raw CSV data
      const response = await fetch(sheetUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch: HTTP status ${response.status}`);
      }

      const csvText = await response.text();

      // 2. Simple manual CSV parsing
      // This assumes your data does NOT contain commas or newlines within cell values.
      const rows = csvText.trim().split("\n");
      if (rows.length < 1) {
        setData([]);
        setLoading(false);
        return;
      }

      const headers = rows[0].split(",").map((h) => h.trim());

      const parsedData = rows.slice(1).map((row) => {
        const values = row.split(",");
        let item = {};
        // Map values to headers
        headers.forEach((header, index) => {
          item[header] = values[index] ? htmlDecoder(values[index].trim()) : "";
        });
        return item;
      });

      setData(...parsedData);
    } catch (err) {
      console.error("Read-only Fetch Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 0;
      setIsScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    fetchBannerText();
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
  function sanitizeSheetHTML(html) {
    return html
      ?.replace(/\"\"/g, '"') // fix double quotes
      .replace(/^"|"$/g, ""); // remove wrapping quotes
  }

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
      {!loading && !error && data && (
        <div
          className="promotion-text"
          dangerouslySetInnerHTML={{
            __html:
              language == "kr"
                ? sanitizeSheetHTML(data.koreanBannerText)
                : sanitizeSheetHTML(data.bannerText),
          }}
        />
      )}
      {/* <p>
          {translate("promotionText.main")}{" "}
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSf_g2MoKOjYAA4jWBosxfaZYrODaJrtFmPNvUlz54cccUxuUw/viewform"
            target="_blank"
          >
            {translate("promotionText.link")}
          </a>
          {translate("promotionText.end")}
        </p> */}
    </header>
  );
};

export default Header;
