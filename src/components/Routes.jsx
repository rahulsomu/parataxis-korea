import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Press from "../pages/press/Press";
import Layout from "./Layout";
import HomePage from "../pages/homepage/HomePage";
import PressDetails from "../pages/pressDetails/PressDetails";
import Media from "../pages/media/Media";
import MediaDetails from "../pages/mediaDetails/MediaDetails";
import Webcasts from "../pages/webcasts/Webcasts";
import WebcastsDetails from "../pages/webcastsDetails/WebcastsDetails";
import Admin from "../pages/admin/Admin";
import PageNotFound from "./pageNotFound/PageNotFound";
import Dashboard from "../pages/dashboard/Dashboard";
import DashboardList from "../pages/dashboard/DashboardList";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/press" element={<Press heading={"News"} />} />
          <Route
            path="/press-details"
            element={<PressDetails title={"News"} />}
          />
          <Route
            path="/public-disclosures"
            element={<Press heading={"Public FSC Disclosures"} />}
          />
          <Route
            path="/public-disclosures-details"
            element={<PressDetails title={"Public FSC Disclosures"} />}
          />
          <Route
            path="/electronic-disclosures"
            element={<Press heading={"Electronic Disclosures"} />}
          />
          <Route
            path="/electronic-disclosures-details"
            element={<PressDetails title={"Electronic Disclosures"} />}
          />
          <Route
            path="/media"
            element={<Media heading={"Electronic Disclosures"} />}
          />
          <Route
            path="/media-details"
            element={<MediaDetails title={"Electronic Disclosures"} />}
          />
          <Route
            path="/webcasts"
            element={<Press heading={"Webcasts and Presentations"} />}
          />
          <Route
            path="/webcasts-details"
            element={<PressDetails title={"Webcasts and Presentations"} />}
          />
          <Route path="/admin" element={<Admin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/dashboard/press"
            element={<DashboardList heading={"News"} />}
          />
          <Route
            path="/dashboard/public-disclosures"
            element={<DashboardList heading={"Public FSC Disclosures"} />}
          />
          <Route
            path="/dashboard/electronic-disclosures"
            element={<DashboardList heading={"Electronic Disclosures"} />}
          />
          <Route
            path="/dashboard/webcasts"
            element={<DashboardList heading={"Webcasts and Presentations"} />}
          />
          <Route
            path="/dashboard/media"
            element={<DashboardList heading={"Media"} />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
