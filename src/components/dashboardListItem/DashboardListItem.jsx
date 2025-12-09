import React from "react";
import "./dashboardListItem.css";
// import { BsFileEarmarkPdf } from "react-icons/bs";
import { FaFileDownload } from "react-icons/fa";
import moment from "moment";
import { Link } from "react-router-dom";
import RevealAnimation from "../RevealAnimation";
import { useTranslation } from "../../context/TranslationContext";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import {
  DATE_FORMAT,
  electronicNoticesDataApiUrl,
  mediaDataApiUrl,
  pressDataApiUrl,
  publicDisclosuresDataApiUrl,
  webcastsDataApiUrl,
} from "../../constants";
import axios from "axios";
import Modal from "../modal/Modal";
import AddForm from "../addForm/AddForm";

const DashboardListItem = ({
  item,
  isPressPage,
  pageNumber,
  isElectronicDisclosurePage,
  isPublicDisclosurePage,
  isMediaPage,
  isWebcastsPage,
  fetchData,
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
  const token = sessionStorage.getItem("token");
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleDelete = () => {
    if (!ID) return;
    const payload = {
      id: ID,
    };
    const url = isPressPage
      ? pressDataApiUrl
      : isElectronicDisclosurePage
      ? electronicNoticesDataApiUrl
      : isPublicDisclosurePage
      ? publicDisclosuresDataApiUrl
      : isMediaPage
      ? mediaDataApiUrl
      : isWebcastsPage
      ? webcastsDataApiUrl
      : "";
    try {
      axios
        .delete(url, {
          headers: { Authorization: `Bearer ${token}` },
          data: payload,
        })
        .then((response) => {
          if (response.status === 200) {
            console.log("Record deleted successfully");
            closeDeleteModal();
            fetchData();
          }
        });
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <RevealAnimation>
      <div className="list-item">
        {showEditModal ? (
          <AddForm
            setAddFormVisible={setShowEditModal}
            isPressPage={isPressPage}
            isMediaPage={isMediaPage}
            isPublicDisclosurePage={isPublicDisclosurePage}
            isElectronicDisclosurePage={isElectronicDisclosurePage}
            isWebcastsPage={isWebcastsPage}
            fetchData={fetchData}
            isEditMode={true}
            existingData={item}
          />
        ) : null}
        {showDeleteModal ? (
          <Modal onClose={closeDeleteModal}>
            <div className="delete-modal">
              <p>Do you want to delete this Record?</p>
              <div className="delete-buttons">
                <button className="add-record-btn" onClick={closeDeleteModal}>
                  Cancel
                </button>
                <button
                  className="add-record-btn delete"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </Modal>
        ) : null}

        <span>{moment(date, "MM-DD-YYYY").format(DATE_FORMAT)}</span>

        <Link
          to={
            isPressPage
              ? `/press-details?id=${ID}&pageNo=${pageNumber}`
              : isElectronicDisclosurePage
              ? `/electronic-disclosures-details?id=${ID}&pageNo=${pageNumber}`
              : isWebcastsPage
              ? `/webcasts-details?id=${ID}&pageNo=${pageNumber}`
              : isPublicDisclosurePage
              ? `/public-disclosures-details?id=${ID}&pageNo=${pageNumber}`
              : `/media-details?id=${ID}&pageNo=${pageNumber}`
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
                : isMediaPage
                ? `/media-details?id=${ID}&pageNo=${pageNumber}`
                : `/public-disclosures-details?id=${ID}&pageNo=${pageNumber}`
            }
            state={{ ...item, pageNo: pageNumber }}
          >
            <span>{translate("buttons.readMore")}</span>
          </Link>
          {downloadLinks
            ?.filter((item) => item.fileName && item.downloadUrl)
            .map((item) => {
              return (
                <a key={item.index} href={item.downloadUrl} download>
                  <FaFileDownload />
                  {item.fileName}
                </a>
              );
            })}
          {/* {downloadLink ? (
            <a href={downloadLink} download>
              <BsFileEarmarkPdf />
              {translate("buttons.download")}
            </a>
          ) : null} */}
        </div>
        <div className="buttons">
          <button
            className="add-record-btn"
            onClick={() => setShowEditModal(true)}
          >
            <span>Edit</span>
            <MdEdit />
          </button>
          <button
            className="add-record-btn delete"
            onClick={() => setShowDeleteModal(true)}
          >
            <span>Delete</span>
            <MdDelete />
          </button>
        </div>
      </div>
    </RevealAnimation>
  );
};

export default DashboardListItem;
