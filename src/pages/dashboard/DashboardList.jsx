import React, { useEffect, useState } from "react";
import "./dashboardList.css";
import Loader from "../../components/loader/Loader";
import {
  dashboardElectronicDisclosuresGetAllApiUrl,
  dashboardMediaGetAllApiUrl,
  dashboardPressGetAllApiUrl,
  dashboardPublicDisclosuresGetAllApiUrl,
  dashboardWebcastsGetAllApiUrl,
} from "../../constants";
import { MdError } from "react-icons/md";
import axios from "axios";
import { useTranslation } from "../../context/TranslationContext";
import { Link, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Dropdown from "../../components/dropdown/Dropdown";
import { IoMdAdd } from "react-icons/io";
import AddForm from "../../components/addForm/AddForm";
import DashboardListItem from "../../components/dashboardListItem/DashboardListItem";

const DashboardList = ({ heading }) => {
  const { translate } = useTranslation();
  const isPressPage = heading === "News";
  const isElectronicDisclosurePage = heading === "Electronic Disclosures";
  const isWebcastsPage = heading === "Webcasts and Presentations";
  const isPublicDisclosurePage = heading === "Public FSC Disclosures";
  const isMediaPage = heading === "Media";
  const [list, setList] = useState({
    fetching: false,
    success: false,
    data: [],
    error: null,
  });
  const location = useLocation();
  const { pageNo = 1 } = location.state || {};

  const [pageNumber, setPageNumber] = useState(pageNo);
  const order = sessionStorage.getItem("sort");
  const [sortOrder, setSortOrder] = useState(order || "Newest");
  const [addFormVisible, setAddFormVisible] = useState(false);

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
        page: pageNumber,
        sort: sortOrder === "Newest" ? 1 : 0,
      };
      const url = isPressPage
        ? dashboardPressGetAllApiUrl(params)
        : isElectronicDisclosurePage
        ? dashboardElectronicDisclosuresGetAllApiUrl(params)
        : isWebcastsPage
        ? dashboardWebcastsGetAllApiUrl(params)
        : isMediaPage
        ? dashboardMediaGetAllApiUrl(params)
        : dashboardPublicDisclosuresGetAllApiUrl(params);
      const response = await axios.get(url);
      if (response.status === 200) {
        setList({ ...list, fetching: false, success: true, error: null });
        if (response.data) {
          const data = response.data
            ?.filter((item) => isValidJSON(item.data))
            .map((item) => ({
              ...JSON.parse(item.data),
              ID: item.id,
            }));
          setList({ ...list, success: true, data: { data: data } });
        }
      }
    } catch (error) {
      console.error(error, "error");

      setList({ ...list, fetching: false, data: [], error: true });
    }
  };
  const handleDropdown = (value) => {
    sessionStorage.setItem("sort", value);
    setSortOrder(value);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, [pageNumber, sortOrder]);

  return (
    <section className="press-page">
      <Link to="/dashboard" className="view-all">
        <FaArrowLeft />
        {/* {`${translate("buttons.backToHome")}`} */}
        Back to Dashboard
      </Link>
      <div className="heading">
        <h1>{`${translate(
          `${
            isPressPage
              ? "pressDetails"
              : isElectronicDisclosurePage
              ? "electronicDisclosures"
              : isWebcastsPage
              ? "webcasts"
              : isMediaPage
              ? "media"
              : "publicDisclosures"
          }.title`
        )}`}</h1>
      </div>
      <button
        onClick={() => setAddFormVisible(true)}
        className="add-record-btn"
      >
        <IoMdAdd />
        Add Record
      </button>
      <div className="content">
        {addFormVisible ? (
          <AddForm
            setAddFormVisible={setAddFormVisible}
            isPressPage={isPressPage}
            isMediaPage={isMediaPage}
            isPublicDisclosurePage={isPublicDisclosurePage}
            isElectronicDisclosurePage={isElectronicDisclosurePage}
            isWebcastsPage={isWebcastsPage}
            fetchData={fetchData}
          />
        ) : null}
        {list.fetching ? (
          <div className="loader">
            <Loader />
          </div>
        ) : list.success ? (
          <div className="list-container">
            {list?.data?.data && list?.data?.data?.length > 0 ? (
              <>
                <Dropdown value={sortOrder} onChange={handleDropdown} />
                {list.data?.data?.map((item) => {
                  return (
                    <DashboardListItem
                      item={item}
                      isPressPage={isPressPage}
                      isElectronicDisclosurePage={isElectronicDisclosurePage}
                      isPublicDisclosurePage={isPublicDisclosurePage}
                      isMediaPage={isMediaPage}
                      isWebcastsPage={isWebcastsPage}
                      pageNumber={pageNumber}
                      fetchData={fetchData}
                    />
                  );
                })}
                <div className="pagination">
                  {[...Array(list.data.total)].map((_, index) => {
                    const page = index + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => {
                          setPageNumber(page);
                        }}
                        className={`pagination-btn ${
                          pageNumber === page ? "active" : ""
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="error-screen">
                <MdError />
                <p>No records found!</p>
              </div>
            )}
          </div>
        ) : (
          <div className="error-screen">
            <MdError />
            <p>Something went wrong!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default DashboardList;
