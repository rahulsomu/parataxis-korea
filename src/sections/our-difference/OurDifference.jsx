import React from "react";
import RevealAnimation from "../../components/RevealAnimation";
import { useTranslation } from "../../context/TranslationContext";

const OurDifference = () => {
  const { translate } = useTranslation();
  return (
    <section id="our-difference" className="about-section">
      <div className="scrolling-content">
        <div className="content-section">
          <div className="about-container">
            <div className="about-text">
              <RevealAnimation>
                <div className="section-header">
                  <span className="section-number">03</span>
                  <h2>{translate("ourDifference.title")}</h2>
                </div>
              </RevealAnimation>
              <div className="about-paragraphs">
                <RevealAnimation delay={0.2}>
                  <p className="about-description">
                    <span>{translate("ourDifference.experience.title")}</span>
                    {translate("ourDifference.experience.description")}
                  </p>
                </RevealAnimation>
                <RevealAnimation delay={0.3}>
                  <p className="about-description">
                    <span>
                      {translate("ourDifference.riskManagement.title")}
                    </span>
                    {translate("ourDifference.riskManagement.description")}
                  </p>
                </RevealAnimation>
                <RevealAnimation delay={0.4}>
                  <p className="about-description">
                    <span>{translate("ourDifference.marketAccess.title")}</span>
                    {translate("ourDifference.marketAccess.description")}
                  </p>
                </RevealAnimation>
              </div>
            </div>
            <RevealAnimation direction="left">
              <div className="about-image">
                <img src={'https://parataxis.sfo2.digitaloceanspaces.com/Photos/tasnei-gorge-romania-2024-09-17-22-21-05-utc_1.jpg'} alt="Our Difference" />
              </div>
            </RevealAnimation>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurDifference;
