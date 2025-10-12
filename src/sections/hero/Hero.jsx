import React from "react";
import RevealAnimation from "../../components/RevealAnimation";
import { useTranslation } from "../../context/TranslationContext";
import AnimatedText from "../../components/AnimatedText";

const Hero = () => {
  const { translate } = useTranslation();
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section className="hero-section">
      <video
        fetchPriority="high"
        autoPlay
        muted
        loop
        playsInline
        className="hero-video"
        poster={
          "https://parataxis.sfo2.digitaloceanspaces.com/Photos/poster.jpeg"
        }
      >
        <source
          src={
            "https://parataxis.sfo2.digitaloceanspaces.com/Photos/red-maples-at-the-mouth-of-a-stream-in-seoroksan-n-1080p-2025-06-09-05-41-27-utc.mov"
          }
          type="video/mp4"
        />
      </video>
      <div className="overlay"></div>
      <div className="hero-content">
        <RevealAnimation delay={0.5}>
          <AnimatedText />
        </RevealAnimation>
      </div>
      <button
        onClick={() => scrollToSection("about")}
        className="scroll-button"
        aria-label={translate("hero.scrollButton")}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 10L12 15L17 10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </section>
  );
};

export default Hero;
