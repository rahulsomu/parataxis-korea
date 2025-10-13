import React from "react";
import "./dashboard.css";
import { Link } from "react-router-dom";
import { useTranslation } from "../../context/TranslationContext";

const dashboardItems = [
  {
    id: 1,
    label: "Press",
    route: "/dashboard/press",
    translationKey: "pressDetails",
  },
  {
    id: 2,
    label: "Public FSC Disclosures",
    route: "/dashboard/public-disclosures",
    translationKey: "publicDisclosures",
  },
  {
    id: 3,
    label: "Electronic Disclosures",
    route: "/dashboard/electronic-disclosures",
    translationKey: "electronicDisclosures",
  },
  { id: 4, label: "Media", route: "/dashboard/media", translationKey: "media" },
  {
    id: 5,
    label: "Webcasts and Presentations",
    route: "/dashboard/webcasts",
    translationKey: "webcasts",
  },
];

const Dashboard = () => {
  const { translate } = useTranslation();
  const token = sessionStorage.getItem("token");
  if (!token) {
    window.location.href = "/admin";
  }
  return (
    <div className="dashboard">
      <h1>{translate("buttons.dashboard")}</h1>
      <div className="dashboard-grid">
        {dashboardItems.map((item) => (
          <Link to={item.route} key={item.id}>
            <div key={item.id} className="dashboard-item">
              <p>{translate(`${item.translationKey}.title`)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
