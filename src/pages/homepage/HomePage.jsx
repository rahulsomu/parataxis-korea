import React, { useEffect } from "react";
import Hero from "../../sections/hero/Hero";
import About from "../../sections/about/About";
import OurDifference from "../../sections/our-difference/OurDifference";
import Team from "../../sections/team/Team";
import InvestorRelations from "../../sections/investor-relations/InvestorRelations";
import Contact from "../../sections/contact/Contact";
import InvestmentPhilosphy from "../../sections/investment-philosphy/InvestmentPhilosphy"
import { useLocation } from "react-router-dom";

const HomePage = () => {
    const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);
  return (
    <>
      <Hero />
      <div className="scrolling-sections-container">
        <About />
        <InvestmentPhilosphy />
        <OurDifference />
        <Team />
        <InvestorRelations />
        <Contact />
      </div>
    </>
  );
};

export default HomePage;
