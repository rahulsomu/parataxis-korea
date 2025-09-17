import React from "react";
import RevealAnimation from "../../components/RevealAnimation";
import { useTranslation } from "../../context/TranslationContext";
import footerLogo from "../../assets/images/footer-logo.png";
import { Link } from "react-router-dom";
import { RiInstagramFill } from "react-icons/ri";
import { BsTwitterX } from "react-icons/bs";
import { RiLinkedinBoxFill } from "react-icons/ri";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  const { translate } = useTranslation();
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <RevealAnimation>
            <div className="footer-definition">
              <h4>{translate("footer.definition.title")}</h4>
              <p>{translate("footer.definition.text")}</p>
            </div>
          </RevealAnimation>
        </div>
        <div className="footer-links">
          <div className="social-section">
            <a  href="https://www.instagram.com/parataxiskorea/" target="_blank" rel="noopener noreferrer"><RiInstagramFill/></a>
            <a style={{fontSize:'27px'}} href="https://x.com/parataxiskorea" target="_blank" rel="noopener noreferrer"><BsTwitterX/></a>
            <a style={{fontSize:'33px'}} href="https://www.linkedin.com/company/parataxiskorea/" target="_blank" rel="noopener noreferrer"><RiLinkedinBoxFill/></a>
            <a style={{fontSize:'33px'}} href="https://www.youtube.com/@parataxiskorea" target="_blank" rel="noopener noreferrer"><FaYoutube/></a>
          </div>
          <div className="footer-nav">
            <Link to='/#about'>{translate('navigation.about')}</Link>
            <Link to='/#culture-philosophy'>{translate('navigation.investmentPhilosophy')}</Link>
            <Link to='/#our-difference'>{translate('navigation.ourDifference')}</Link>
            <Link to='/#leadership'>{translate('navigation.team')}</Link>
            <Link to='/#investor-relations'>{translate('navigation.investorRelations')}</Link>
            <Link to='/#contact'>{translate('navigation.contact')}</Link>
          </div>
          <div className="footer-nav">
         
            {/* <a
              href="https://www.linkedin.com/company/parataxiscap/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {translate("footer.links.linkedin")}
            </a> */}
            {/* <a href="#disclosures">{translate("footer.links.disclosures")}</a> */}
          </div>
        </div>
      </div>
      <RevealAnimation direction="up">
        <div className="footer-logo">
          <img src={footerLogo} alt="Parataxis Logo" />
        </div>
      </RevealAnimation>

      <div className="footer-copyright">
        <p>© 2025 Parataxis Korea, Inc.</p>
        <p>All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
