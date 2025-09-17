import React from 'react'
import RevealAnimation from '../../components/RevealAnimation'
import { useTranslation } from '../../context/TranslationContext'

const InvestmentPhilosphy = () => {
    const { translate } = useTranslation();
  return (
    <section id="culture-philosophy" className="about-section">
          <div className="scrolling-content">
            <div className="content-section">
              <div className="about-container">
                <div className="about-text">
                  <RevealAnimation>
                    <div className="section-header">
                      <span className="section-number">02</span>
                      <h2>{translate("investmentPhilosophy.title")}</h2>
                    </div>
                  </RevealAnimation>
                  <div className="about-paragraphs">
                    <RevealAnimation delay={0.2}>
                      <p className="about-description">
                        {translate("investmentPhilosophy.paragraph1")}
                      </p>
                    </RevealAnimation>
                    <RevealAnimation delay={0.2}>
                      <p className="about-description">
                        {translate("investmentPhilosophy.paragraph2")}
                      </p>
                      </RevealAnimation>
                    {/* <RevealAnimation delay={0.3}>
                      <p className="about-description">
                        {translate("investmentPhilosophy.paragraph2")}
                      </p>
                    </RevealAnimation>
                    <RevealAnimation delay={0.4}>
                      <p className="about-description">
                        {translate("investmentPhilosophy.paragraph3")}
                      </p>
                    </RevealAnimation>
                    <RevealAnimation delay={0.5}>
                      <p className="about-description">
                        {translate("investmentPhilosophy.paragraph4")}
                      </p>
                    </RevealAnimation> */}
                  </div>
                </div>
                <RevealAnimation direction="left">
                  <div className="about-image">
                    <img src={'https://parataxis.sfo2.digitaloceanspaces.com/Photos/view-from-ulsanbawi-rock-peak-on-sunset-seoraksan-2024-10-18-08-04-49-utc_1.jpg'} alt="Investment Philosophy" />
                  </div>
                </RevealAnimation>
              </div>
            </div>
          </div>
        </section>
  )
}

export default InvestmentPhilosphy
