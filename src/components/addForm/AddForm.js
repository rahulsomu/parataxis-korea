import React, { useEffect, useState } from "react";
import Modal from "../modal/Modal";
import {
  pressDataApiUrl,
  publicDisclosuresDataApiUrl,
  electronicNoticesDataApiUrl,
  webcastsDataApiUrl,
  mediaDataApiUrl,
  mediaInitialState,
  pressInitialState,
} from "../../constants";
import "./addform.css";
import axios from "axios";

export default function AddForm({
  setAddFormVisible,
  isPressPage,
  isElectronicDisclosurePage,
  isWebcastsPage,
  isPublicDisclosurePage,
  isMediaPage,
  fetchData,
  isEditMode = false,
  existingData = null,
}) {
  const getInitalState = () => {
    if (
      isPressPage ||
      isElectronicDisclosurePage ||
      isPublicDisclosurePage ||
      isWebcastsPage
    ) {
      return pressInitialState;
    }
    return mediaInitialState;
  };
  const [initialFormState, setInitialFormState] = useState(
    existingData ? existingData : getInitalState()
  );
  const [formError, setFormError] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "downloadLink1filename") {
      setInitialFormState({
        ...initialFormState,
        downloadLink1: { ...initialFormState.downloadLink1, fileName: value },
      });
    } else if (id === "downloadLink1Url") {
      setInitialFormState({
        ...initialFormState,
        downloadLink1: {
          ...initialFormState.downloadLink1,
          downloadUrl: value,
        },
      });
    } else if (id === "downloadLink2filename") {
      setInitialFormState({
        ...initialFormState,
        downloadLink2: { ...initialFormState.downloadLink2, fileName: value },
      });
    } else if (id === "downloadLink2Url") {
      setInitialFormState({
        ...initialFormState,
        downloadLink2: {
          ...initialFormState.downloadLink2,
          downloadUrl: value,
        },
      });
    } else if (id === "downloadLink3filename") {
      setInitialFormState({
        ...initialFormState,
        downloadLink3: { ...initialFormState.downloadLink3, fileName: value },
      });
    } else if (id === "downloadLink3Url") {
      setInitialFormState({
        ...initialFormState,
        downloadLink3: {
          ...initialFormState.downloadLink3,
          downloadUrl: value,
        },
      });
    } else {
      setInitialFormState({ ...initialFormState, [id]: value });
    }
  };

  const handleSubmit = () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      window.location.href = "/admin";
    }
    const requiredFieldsEmpty =
      !initialFormState.heading || !initialFormState.fullDescription;
    if (requiredFieldsEmpty) {
      setFormError("Please fill all the required fields");
      return;
    }
    const formattedPayload = {
      ...initialFormState,
      downloadLinks: [
        { ...initialFormState.downloadLink1 },
        { ...initialFormState.downloadLink2 },
        { ...initialFormState.downloadLink3 },
      ],
    };

    const payload = isEditMode
      ? {
          id: existingData.ID,
          data: JSON.stringify(formattedPayload),
        }
      : {
          data: JSON.stringify(formattedPayload),
        };
    const url = isPressPage
      ? pressDataApiUrl
      : isElectronicDisclosurePage
      ? electronicNoticesDataApiUrl
      : isWebcastsPage
      ? webcastsDataApiUrl
      : isPublicDisclosurePage
      ? publicDisclosuresDataApiUrl
      : isMediaPage
      ? mediaDataApiUrl
      : null;
    const method = isEditMode ? "put" : "post";
    if (!url) {
      setFormError("Something went wrong. Please try again.");
      return;
    }
    try {
      axios[method](url, payload, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((response) => {
        if ([200, 201].includes(response.status)) {
          console.log("Record added successfully");
          setAddFormVisible(false);
          fetchData();
        }
      });
    } catch (error) {
      console.log(error, "error");
      setFormError("Something went wrong. Please try again.");
      return;
    }
  };
  return (
    <Modal onClose={() => setAddFormVisible(false)}>
      <div className="add-form">
        <FormFields
          isPressPage={isPressPage}
          isElectronicDisclosurePage={isElectronicDisclosurePage}
          isWebcastsPage={isWebcastsPage}
          isPublicDisclosurePage={isPublicDisclosurePage}
          isMediaPage={isMediaPage}
          initialFormState={initialFormState}
          setInitialFormState={setInitialFormState}
          handleChange={handleChange}
          isEditMode={isEditMode}
        />
        {formError ? <span className="error-msg">{formError}</span> : null}
        <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </Modal>
  );
}

const FormFields = ({
  isPressPage,
  isElectronicDisclosurePage,
  isWebcastsPage,
  isPublicDisclosurePage,
  isMediaPage,
  initialFormState,
  setInitialFormState,
  handleChange,
  isEditMode,
}) => {
  return (
    <div>
      <h2 className="form-heading">{`${
        isEditMode ? "Edit" : "Add New"
      } Record`}</h2>
      {isPressPage ||
      isElectronicDisclosurePage ||
      isWebcastsPage ||
      isPublicDisclosurePage ? (
        <PressForm
          initialFormState={initialFormState}
          setInitialFormState={setInitialFormState}
          handleChange={handleChange}
        />
      ) : isMediaPage ? (
        <MediaForm
          initialFormState={initialFormState}
          setInitialFormState={setInitialFormState}
          handleChange={handleChange}
        />
      ) : (
        <div>No Form Available</div>
      )}
    </div>
  );
};

const PressForm = ({ initialFormState, handleChange }) => {
  return (
    <div className="add-form-fields">
      {/* <div className="input-field">
        <label htmlFor="ID">Id :*</label>
        <input
          type="text"
          id="ID"
          value={initialFormState.ID}
          onChange={handleChange}
        />
      </div> */}
      <div className="input-field">
        <label htmlFor="date">Date :</label>
        <input
          type="text"
          id="date"
          value={initialFormState.date}
          onChange={handleChange}
        />
      </div>
      <div className="input-field">
        <label htmlFor="imgUrl">Image Url :</label>
        <input
          type="text"
          id="imgUrl"
          value={initialFormState.imgUrl}
          onChange={handleChange}
        />
      </div>
      <div className="input-field">
        <label htmlFor="heading">Heading :*</label>
        <input
          type="text"
          id="heading"
          value={initialFormState.heading}
          onChange={handleChange}
        />
      </div>
      <div className="input-field">
        <label htmlFor="koreanHeading">Korean Heading :</label>
        <input
          type="text"
          id="koreanHeading"
          value={initialFormState.koreanHeading}
          onChange={handleChange}
        />
      </div>
      <div className="input-field">
        <label htmlFor="fullDescription">Description :*</label>
        <input
          type="text"
          id="fullDescription"
          value={initialFormState.fullDescription}
          onChange={handleChange}
        />
      </div>
      <div className="input-field">
        <label htmlFor="koreanDescription">Korean Description :</label>
        <input
          type="text"
          id="koreanDescription"
          value={initialFormState.koreanDescription}
          onChange={handleChange}
        />
      </div>

      <div className="input-field">
        <label htmlFor="downloadLink1filename">Download Link 1 File Name</label>
        <input
          type="text"
          id="downloadLink1filename"
          value={initialFormState.downloadLink1.fileName}
          onChange={handleChange}
        />
      </div>
      <div className="input-field">
        <label htmlFor="downloadLink1Url">Download Link 1 Download Url</label>
        <input
          type="text"
          id="downloadLink1Url"
          value={initialFormState.downloadLink1.downloadUrl}
          onChange={handleChange}
        />
      </div>
      <div className="input-field">
        <label htmlFor="downloadLink2filename">Download Link 2 File Name</label>
        <input
          type="text"
          id="downloadLink2filename"
          value={initialFormState.downloadLink2.fileName}
          onChange={handleChange}
        />
      </div>
      <div className="input-field">
        <label htmlFor="downloadLink2Url">Download Link 2 Download Url</label>
        <input
          type="text"
          id="downloadLink2Url"
          value={initialFormState.downloadLink2.downloadUrl}
          onChange={handleChange}
        />
      </div>
      <div className="input-field">
        <label htmlFor="downloadLink3filename">Download Link 3 File Name</label>
        <input
          type="text"
          id="downloadLink3filename"
          value={initialFormState.downloadLink3.fileName}
          onChange={handleChange}
        />
      </div>
      <div className="input-field">
        <label htmlFor="downloadLink3Url">Download Link 3 Download Url</label>
        <input
          type="text"
          id="downloadLink3Url"
          value={initialFormState.downloadLink3.downloadUrl}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

const MediaForm = ({ initialFormState, handleChange }) => {
  return (
    <div className="add-form-fields">
      {/* <div className="input-field">
        <label htmlFor="ID">Id :*</label>
        <input
          type="text"
          id="ID"
          value={initialFormState.ID}
          onChange={handleChange}
        />
      </div> */}
      <div className="input-field">
        <label htmlFor="date">Date :</label>
        <input
          type="text"
          id="date"
          value={initialFormState.date}
          onChange={handleChange}
        />
      </div>
      <div className="input-field">
        <label htmlFor="thumbnail">Thumbnail :</label>
        <input
          type="text"
          id="thumbnail"
          value={initialFormState.thumbnail}
          onChange={handleChange}
        />
      </div>
      <div className="input-field">
        <label htmlFor="heading">Heading :*</label>
        <input
          type="text"
          id="heading"
          value={initialFormState.heading}
          onChange={handleChange}
        />
      </div>
      <div className="input-field">
        <label htmlFor="koreanHeading">Korean Heading :</label>
        <input
          type="text"
          id="koreanHeading"
          value={initialFormState.koreanHeading}
          onChange={handleChange}
        />
      </div>
      <div className="input-field">
        <label htmlFor="fullDescription">Description :*</label>
        <input
          type="text"
          id="fullDescription"
          value={initialFormState.fullDescription}
          onChange={handleChange}
        />
      </div>
      <div className="input-field">
        <label htmlFor="koreanDescription">Korean Description :</label>
        <input
          type="text"
          id="koreanDescription"
          value={initialFormState.koreanDescription}
          onChange={handleChange}
        />
      </div>
      <div className="input-field">
        <label htmlFor="mediaUrl">Media Url :</label>
        <input
          type="text"
          id="mediaUrl"
          value={initialFormState.mediaUrl}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
