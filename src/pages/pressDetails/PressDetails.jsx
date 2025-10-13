import React, { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./pressDetails.css";
import moment from "moment";
import RevealAnimation from "../../components/RevealAnimation";
import { htmlDecoder, isEmpty } from "../../utils/helpers";
import { useTranslation } from "../../context/TranslationContext";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { FaFileDownload } from "react-icons/fa";
import {
  dashboardPressGetAllApiUrl,
  ElectronicDisclosuresApiUrl,
  dashboardElectronicDisclosuresGetAllApiUrl,
  dashboardPublicDisclosuresGetAllApiUrl,
  dashboardWebcastsGetAllApiUrl,
  pressApiUrl,
  publicDisclosuresApiUrl,
  webcastsApiUrl,
} from "../../constants";
import axios from "axios";
import Loader from "../../components/loader/Loader";
import { MdError } from "react-icons/md";

const PressDetails = ({ title }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const idFromUrl = searchParams.get("id");
  const pageNoFromUrl = searchParams.get("pageNo") || 1;
  const [list, setList] = useState({
    fetching: false,
    success: false,
    data: [],
    error: null,
  });
  const [filteredData, setFilteredData] = useState({});

  const isPressPage = title === "News";
  const isElectronicDisclosurePage = title === "Electronic Disclosures";
  const isWebcastsPage = title === "Webcasts and Presentations";
  const location = useLocation();
  const { pageNo = 1 } = location?.state || {};
  const { language, translate } = useTranslation();
  function isValidJSON(str) {
    try {
      JSON.parse(str);
      return true;
    } catch {
      return false;
    }
  }
  const fetchData = async () => {
    setList({ ...list, fetching: true, success: false, data: [], error: null });
    try {
      let params = {
        limit: 10,
        page: pageNoFromUrl,
        // sort: sortOrder === "Newest" ? 1 : 0,
      };
      const url = isPressPage
        ? dashboardPressGetAllApiUrl(params)
        : isElectronicDisclosurePage
        ? dashboardElectronicDisclosuresGetAllApiUrl(params)
        : isWebcastsPage
        ? dashboardWebcastsGetAllApiUrl(params)
        : dashboardPublicDisclosuresGetAllApiUrl(params);
      const response = await axios.get(url);
      if (response.status === 200) {
        if (response.data) {
          const newData = response.data
            ?.filter((item) => isValidJSON(item.data))
            .map((item) => ({
              ...JSON.parse(item.data),
              ID: item.id,
            }));
          setList({
            fetching: false,
            success: true,
            data: newData,
            error: null,
          });
          console.log(newData);

          // Find and set the filtered data based on title
          const found = newData.find((item) => item.ID == idFromUrl);
          if (found) {
            setFilteredData(found);
          }
        }
      }
    } catch (error) {
      console.error(error, "error");
      setList({ ...list, fetching: false, data: [], error: true });
    }
  };

  const {
    date = "",
    heading = "",
    downloadLink = "",
    downloadLinks = [],
    fullDescription = "",
    imgUrl = null,
    koreanHeading = "",
    koreanDescription = "",
  } = !isEmpty(filteredData) ? filteredData : location.state || {};

  const getDescription = () => {
    const desc =
      language === "en"
        ? fullDescription
        : koreanDescription
        ? koreanDescription
        : fullDescription;
    return desc;
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    if (idFromUrl) {
      fetchData();
    } else if (!location.state) {
      navigate(
        isPressPage
          ? "/press"
          : isElectronicDisclosurePage
          ? "/electronic-disclosures"
          : isWebcastsPage
          ? "/webcasts"
          : "/public-disclosures"
      );
    }
  }, [idFromUrl]);
  return (
    <div className="press-details">
      <Link
        to={
          isPressPage
            ? "/press"
            : isElectronicDisclosurePage
            ? "/electronic-disclosures"
            : isWebcastsPage
            ? "/webcasts"
            : "/public-disclosures"
        }
        state={{ pageNo: pageNo }}
        className="view-all"
      >
        <FaArrowLeft />
        {`${translate("buttons.viewAll")} ${translate(
          `${
            isPressPage
              ? "pressDetails"
              : isElectronicDisclosurePage
              ? "electronicDisclosures"
              : isWebcastsPage
              ? "webcasts"
              : "publicDisclosures"
          }.title`
        )}`}
      </Link>
      {list.fetching ? (
        <div className="loader">
          <Loader />
        </div>
      ) : list.success ? (
        isEmpty(filteredData) ? (
          <div className="error-screen">
            <MdError />
            <p>Data not found!</p>
          </div>
        ) : (
          <RevealAnimation>
            <div className="details-content">
              <h1>
                {language === "en"
                  ? heading
                  : koreanHeading
                  ? koreanHeading
                  : heading}
              </h1>
              <span>{moment(date).format("MMMM DD,YYYY")}</span>
              {downloadLink ? (
                <a className="download" href={downloadLink} download>
                  <BsFileEarmarkPdf />
                  {translate("buttons.download")}
                </a>
              ) : null}
              {downloadLinks?.length > 0 ? (
                <div className="list-item-detail">
                  {downloadLinks.map((item) => {
                    if (item.fileName && item.downloadUrl) {
                      return (
                        <a key={item.index} href={item.downloadUrl} download>
                          <FaFileDownload />
                          {item.fileName}
                        </a>
                      );
                    }
                  })}
                </div>
              ) : null}
              {imgUrl ? <img src={imgUrl} alt={heading} /> : null}
              {fullDescription ? (
                <div
                  className="html-content"
                  dangerouslySetInnerHTML={{
                    __html: htmlDecoder(getDescription()),
                  }}
                />
              ) : null}
              <Link
                to={
                  isPressPage
                    ? "/press"
                    : isElectronicDisclosurePage
                    ? "/electronic-disclosures"
                    : isWebcastsPage
                    ? "/webcasts"
                    : "/public-disclosures"
                }
                state={{ pageNo: pageNo }}
                className="view-all-bottom"
              >
                <FaArrowLeft />
                {`${translate("buttons.viewAll")} ${translate(
                  `${
                    isPressPage
                      ? "pressDetails"
                      : isElectronicDisclosurePage
                      ? "electronicDisclosures"
                      : isWebcastsPage
                      ? "webcasts"
                      : "publicDisclosures"
                  }.title`
                )}`}
              </Link>
            </div>
          </RevealAnimation>
        )
      ) : (
        <div className="error-screen">
          <MdError />
          <p>Something went wrong!</p>
        </div>
      )}
    </div>
  );
};

export default PressDetails;
