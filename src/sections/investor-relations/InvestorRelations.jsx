import React from "react";
import RevealAnimation from "../../components/RevealAnimation";
import { useTranslation } from "../../context/TranslationContext";
import Accordion from "../../components/accordion/Accordion";
import AccordionItem from "../../components/accordion/AccordionItem";
import { GrFormNextLink } from "react-icons/gr";
import { RiLinkM } from "react-icons/ri";
import "./investorRelations.css";
import { Link } from "react-router-dom";

const InvestorRelations = () => {
  const { translate } = useTranslation();
  return (
    <section id="investor-relations" className="about-section">
      <div className="scrolling-content">
        <div className="content-section">
          <div className="about-container">
            <div className="about-text">
              <RevealAnimation>
                <div className="section-header">
                  <span className="section-number">05</span>
                  <h2>{translate("investorRelations.title")}</h2>
                </div>
              </RevealAnimation>
              <div className="links">
                {/* <Accordion>
                  <AccordionItem title={translate("investorRelations.links.financials")}>
                    <div className="link">
                      <a href="#press">
                        <div className="link-text">
                          <RiLinkM />
                          <span>{translate("investorRelations.links.press")}</span>
                        </div>
                        <div>
                          <GrFormNextLink />
                        </div>
                      </a>
                    </div>
                  </AccordionItem>
                </Accordion> */}
                <div className="link">
                      <Link to="/press">
                        <div className="link-text">
                          <RiLinkM />
                          <span>{translate("investorRelations.links.press")}</span>
                        </div>
                        <div>
                          <GrFormNextLink />
                        </div>
                        </Link>
                    </div>
                <div className="link">
                      <Link to="/public-disclosures">
                        <div className="link-text">
                          <RiLinkM />
                          <span>{translate("investorRelations.links.publicDisclosures")}</span>
                        </div>
                        <div>
                          {" "}
                          <GrFormNextLink />
                        </div>
                      </Link>
                    </div>
                    <div className="link">
                      <Link to="/electronic-disclosures">
                        <div className="link-text">
                          <RiLinkM />
                          <span>{translate("investorRelations.links.electronicDisclosures")}</span>
                        </div>
                        <div>
                          {" "}
                          <GrFormNextLink />
                        </div>
                      </Link>
                    </div>
                    <div className="link">
                      <Link to="/media">
                        <div className="link-text">
                          <RiLinkM />
                          <span>{translate("investorRelations.links.media")}</span>
                        </div>
                        <div>
                          {" "}
                          <GrFormNextLink />
                        </div>
                      </Link>
                    </div>
                    <div className="link">
                      <Link to="/webcasts">
                        <div className="link-text">
                          <RiLinkM />
                          <span>{translate("investorRelations.links.webcasts")}</span>
                        </div>
                        <div>
                          {" "}
                          <GrFormNextLink />
                        </div>
                      </Link>
                    </div>
                    {/* <div className="link">
                      <a href="#press">
                        <div className="link-text">
                          <RiLinkM />
                          <span>{translate("investorRelations.links.stock")}</span>
                        </div>
                        <div>
                          {" "}
                          <GrFormNextLink />
                        </div>
                      </a>
                    </div> */}
                    {/* <div className="link">
                      <a href="#press">
                        <div className="link-text">
                          <RiLinkM />
                          <span>{translate("investorRelations.links.analytics")}</span>
                        </div>
                        <div>
                          {" "}
                          <GrFormNextLink />
                        </div>
                      </a>
                    </div> */}
              </div>
            </div>
            <RevealAnimation direction="left">
              <div className="about-image">
                <img src={'https://parataxis.sfo2.digitaloceanspaces.com/Photos/forest-landscape-with-fir-trees-and-stones-2025-01-16-11-00-23-utc1.jpg'} alt="Investment Philosophy" />
              </div>
            </RevealAnimation>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestorRelations;
