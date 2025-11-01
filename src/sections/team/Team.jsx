import React, { useEffect, useState } from "react";
import RevealAnimation from "../../components/RevealAnimation";
import { useTranslation } from "../../context/TranslationContext";
import "./teams.css";
import Modal from "../../components/modal/Modal";

const Team = () => {
  const { translate } = useTranslation();
  const [selectedMember, setSelectedMember] = useState(null);
  const teamMembers = [
    {
      id: "edwardChin",
      image:
        "https://parataxis.sfo2.digitaloceanspaces.com/Photos/ed.e965575d2ba060295ffe.webp",
    },
    {
      id: "andrewKim",
      image: "https://parataxis.sfo2.digitaloceanspaces.com/Photos/andrew2.jpg",
    },
    {
      id: "jamesLee",
      image:
        "https://parataxis.sfo2.digitaloceanspaces.com/Photos/james.42dee4f7382d9663d70c.webp",
    },
    {
      id: "joonKeeHong",
      image:
        "https://parataxis.sfo2.digitaloceanspaces.com/Photos/joonkee.5869a05f4ec239a605c9.webp",
    },
    {
      id: "anthonyChoi",
      image:
        "https://parataxis.sfo2.digitaloceanspaces.com/Photos/anthony.7034bf6c6dbdce431edc.webp",
    },
    {
      id: "hyunIlHwang",
      image:
        "https://parataxis.sfo2.digitaloceanspaces.com/Photos/hyunil.75d850fd5952e74eba2a.webp",
    },
  ];
  useEffect(() => {
    if (selectedMember) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedMember]);
  return (
    <section id="leadership" className="about-section">
      <div className="scrolling-content">
        <div className="content-section">
          <div className="about-container full-width">
            <div className="about-text">
              <RevealAnimation>
                <div className="section-header">
                  <span className="section-number">04</span>
                  <h2>{translate("team.title")}</h2>
                </div>
              </RevealAnimation>
            </div>
            <RevealAnimation delay={0.2}>
              <div className="teams-container">
                <div className="teams-grid">
                  {teamMembers.map((member) => (
                    <RevealAnimation>
                      <div
                        key={member.id}
                        className="team-card"
                        onClick={() => setSelectedMember(member)}
                      >
                        <div className="image-wrapper">
                          <img
                            src={member.image}
                            alt={translate(`team.${member.id}.name`)}
                            className="team-image"
                          />
                        </div>
                        <h3 className="team-name">
                          {translate(`team.${member.id}.name`)}
                        </h3>
                        <p className="team-designation">
                          {translate(`team.${member.id}.designation`)}
                        </p>
                        <button
                          className="read-more-btn"
                          onClick={() => setSelectedMember(member)}
                        >
                          {translate("buttons.readBio")}
                        </button>
                      </div>
                    </RevealAnimation>
                  ))}
                </div>

                {selectedMember && (
                  <Modal onClose={() => setSelectedMember(null)}>
                    <div className="modal-top-section">
                      <img
                        src={selectedMember.image}
                        alt={translate(`team.${selectedMember.id}.name`)}
                        className="modal-image"
                      />
                      <div className="top-info">
                        <h3 className="modal-name">
                          {translate(`team.${selectedMember.id}.name`)}
                        </h3>
                        <p className="modal-designation">
                          {translate(`team.${selectedMember.id}.designation`)}
                        </p>
                      </div>
                    </div>

                    <div className="info">
                      <h3 className="modal-name">
                        {translate(`team.${selectedMember.id}.name`)}
                      </h3>
                      <p className="modal-designation">
                        {translate(`team.${selectedMember.id}.designation`)}
                      </p>
                      <p className="modal-bio">
                        {translate(`team.${selectedMember.id}.bio`)}
                      </p>
                    </div>
                  </Modal>
                )}
              </div>
            </RevealAnimation>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
