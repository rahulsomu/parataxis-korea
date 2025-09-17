import React from "react";
import RevealAnimation from "../../components/RevealAnimation";
import { useTranslation } from "../../context/TranslationContext";

const About = () => {
  const { translate } = useTranslation();
  return (
    <section id="about" className="content-section about-section">
      <div className="about-container">
        <div className="about-text">
          <RevealAnimation>
            <div className="section-header">
              <span className="section-number">01</span>
              <h2>{translate("about.title")}</h2>
            </div>
          </RevealAnimation>
          <div className="about-paragraphs">
            <RevealAnimation delay={0.2}>
              <p className="about-description">
                {translate("about.paragraph1")}
              </p>
            </RevealAnimation>
            <RevealAnimation delay={0.3}>
              <p className="about-description">
                {translate("about.paragraph2")}
              </p>
            </RevealAnimation>
            <RevealAnimation delay={0.4}>
              <p className="about-description">
                {translate("about.paragraph3")}
              </p>
            </RevealAnimation>
            {/* <RevealAnimation delay={0.5}>
              <p className="about-description">
                {translate("about.paragraph4")}
              </p>
            </RevealAnimation> */}
          </div>
        </div>
        <RevealAnimation direction="left">
          <div className="about-image">
            <img src={'https://parataxis.sfo2.digitaloceanspaces.com/Photos/beautiful-panoramic-view-of-the-high-green-mountai-2024-12-06-00-28-39-utc_1.jpg'} alt="About Parataxis" />
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
};

export default About;
