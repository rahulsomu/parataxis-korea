import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { useTranslation } from "../../context/TranslationContext";
import axios from 'axios';
import { webcastsApiUrl } from '../../constants';
import Loader from "../../components/loader/Loader";
import { MdError } from "react-icons/md";
import Dropdown from "../../components/dropdown/Dropdown";
import './webcasts.css'
import MediaItem from '../../components/mediaItem/MediaItem';

const Webcasts = ({heading}) => {
    const { translate } = useTranslation();
    const [list, setList] = useState({
        fetching: false,
        success: false,
        data: [],
        error: null,
      });
      const location = useLocation();
      const { pageNo = 1 } = location.state || {};
      const [pageNumber, setPageNumber] = useState(pageNo);
      const order = sessionStorage.getItem('sort')
      const [sortOrder, setSortOrder] = useState(order || "Newest");

      const fetchData = async () => {
        setList({ ...list, fetching: true, success: false, data: [], error: null });
        try {
          let params = {
            limit: 10,
            page: pageNumber,
            sort: sortOrder === "Newest" ? 1 : 0,
          };
          const url = webcastsApiUrl(params);
          const response = await axios.get(url);
          if (response.status === 200) {
            setList({ ...list, fetching: false, success: true, error: null });
            if (response.data && response.data.data) {
              setList({ ...list, success: true, data: response.data });
            }
          }
        } catch (error) {
            console.error(error, "error");
            setList({ ...list, fetching: false, data: [], error: true });
        }
      };
      const handleDropdown = (value) => {
        sessionStorage.setItem('sort',value)
        setSortOrder(value);
      };
    useEffect(() => {
        window.scrollTo(0, 0);
        fetchData();
      }, [pageNumber, sortOrder]);


  return (
    <section className="press-page">
    <Link to="/" className="view-all">
      <FaArrowLeft />
      {`${translate("buttons.backToHome")}`}
    </Link>
    <div className="heading">
      <h1>{`${translate('webcasts.title')}`}</h1>
    </div>
    <div className="content">
        {list.fetching ? (
          <div className="loader">
            <Loader />
          </div>
        ) : list.success ? (
          <div className="list-container">
            {list?.data?.data && list?.data?.data?.length > 0 ? (
              <>
                <Dropdown value={sortOrder} onChange={handleDropdown}/>
                <div className="webcasts-grid">
                  {list.data?.data?.map((item) => (
                    <MediaItem
                      key={item.id}
                      item={item}
                      pageNumber={pageNumber}
                    />
                  ))}
                </div>
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
  )
}

export default Webcasts
