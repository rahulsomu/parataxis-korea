import React, { useEffect } from "react";
import Hero from "../../sections/hero/Hero";
import About from "../../sections/about/About";
import OurDifference from "../../sections/our-difference/OurDifference";
import Team from "../../sections/team/Team";
import InvestorRelations from "../../sections/investor-relations/InvestorRelations";
import Contact from "../../sections/contact/Contact";
import InvestmentPhilosphy from "../../sections/investment-philosphy/InvestmentPhilosphy";
import { useLocation } from "react-router-dom";
import Modal from "../../components/modal/Modal";
import EmailPopup from "../../components/emailPopup/EmailPopup";

const HomePage = () => {
  const location = useLocation();
  const [showEmailPopup, setShowEmailPopup] = React.useState(false);

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  useEffect(() => {
    const isSubscribed = sessionStorage.getItem("subscribed");
    if (isSubscribed === "true") return;
    const timer = setTimeout(() => {
      setShowEmailPopup(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {showEmailPopup ? (
        <Modal onClose={() => setShowEmailPopup(false)} maxWidth="600px">
          <EmailPopup setShowEmailPopup={setShowEmailPopup} />
        </Modal>
      ) : null}
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
