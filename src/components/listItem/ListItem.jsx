import React from "react";
import "./listItem.css";
// import { BsFileEarmarkPdf } from "react-icons/bs";
import { FaFileDownload } from "react-icons/fa";
import moment from "moment";
import { Link } from "react-router-dom";
import RevealAnimation from "../RevealAnimation";
import { useTranslation } from "../../context/TranslationContext";
import { DATE_FORMAT } from "../../constants";

const ListItem = ({
  item,
  isPressPage,
  pageNumber,
  isElectronicDisclosurePage,
  isWebcastsPage,
}) => {
  const {
    date,
    heading,
    downloadLink,
    koreanHeading,
    downloadLinks = [],
    ID,
  } = item;
  const { language, translate } = useTranslation();
  return (
    <RevealAnimation>
      <div className="list-item">
        <span>{moment(date).format(DATE_FORMAT)}</span>
        <Link
          to={
            isPressPage
              ? `/press-details?id=${ID}&pageNo=${pageNumber}`
              : isElectronicDisclosurePage
              ? `/electronic-disclosures-details?id=${ID}&pageNo=${pageNumber}`
              : isWebcastsPage
              ? `/webcasts-details?id=${ID}&pageNo=${pageNumber}`
              : `/public-disclosures-details?id=${ID}&pageNo=${pageNumber}`
          }
          state={{ ...item, pageNo: pageNumber }}
        >
          <p>
            {language === "en"
              ? heading
              : koreanHeading
              ? koreanHeading
              : heading}
          </p>
        </Link>
        <div className="press-buttons">
          <Link
            to={
              isPressPage
                ? `/press-details?id=${ID}&pageNo=${pageNumber}`
                : isElectronicDisclosurePage
                ? `/electronic-disclosures-details?id=${ID}&pageNo=${pageNumber}`
                : isWebcastsPage
                ? `/webcasts-details?id=${ID}&pageNo=${pageNumber}`
                : `/public-disclosures-details?id=${ID}&pageNo=${pageNumber}`
            }
            state={{ ...item, pageNo: pageNumber }}
          >
            <span>{translate("buttons.readMore")}</span>
          </Link>
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
          {/* {downloadLink ? (
            <a href={downloadLink} download>
              <BsFileEarmarkPdf />
              {translate("buttons.download")}
            </a>
          ) : null} */}
        </div>
      </div>
    </RevealAnimation>
  );
};

export default ListItem;
