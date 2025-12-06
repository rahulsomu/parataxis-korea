import React from "react";
import { useTranslation } from "../../context/TranslationContext";

const Contact = () => {
  const { translate } = useTranslation();

  return (
    <section id="contact" className="contact-section">
      <div className="video-background">
        <video
          autoPlay
          muted
          loop
          playsInline
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
        <div className="gradient-overlay"></div>
      </div>
      <div className="contact-content">
        <div className="contact-strip">
          <div className="contact-title">
            <h2>{translate("contact.title")}</h2>
          </div>
          <div className="contact-group">
            <h3>{translate("contact.generalInquiries.title")}</h3>
            <a href="mailto:info@parataxis.io">info@parataxis.co.kr</a>
          </div>
          <div className="contact-divider"></div>
          <div className="contact-group">
            <h3>{translate("contact.investorRelations.title")}</h3>
            <a href="mailto:investor@parataxis.co.kr">
              investor@parataxis.co.kr
            </a>
            <p>031 8092 3285</p>
          </div>
          <div className="contact-divider"></div>
          <div className="contact-group">
            <h3>{translate("contact.address.title")}</h3>
            <p>{translate("contact.address.street")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
