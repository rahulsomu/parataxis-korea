import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useTranslation } from '../../context/TranslationContext';
import axios from 'axios';
import { mediaApiUrl } from '../../constants';
import Loader from '../../components/loader/Loader';
import { MdError } from 'react-icons/md';
import VideoPlayer from '../../components/videoPlayer/VideoPlayer';
import Card from '../../components/card/Card';
import './mediaDetails.css';
import moment from 'moment';
import { isEmpty } from '../../utils/helpers';

const MediaDetails = () => {
  const { translate, language } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const idFromUrl = searchParams.get('id');
  const pageNoFromUrl = searchParams.get("pageNo") || 1;

  const [mediaData, setMediaData] = useState({
    fetching: false,
    success: false,
    data: [],
    error: null,
  });

  const [currentVideo, setCurrentVideo] = useState(null);

  const fetchData = async () => {
    setMediaData({ ...mediaData, fetching: true, success: false, data: [], error: null });
    try {
      const params = {
        limit: 10,
        page: pageNoFromUrl,
      };
      const response = await axios.get(mediaApiUrl(params));
      
      if (response.status === 200 && response.data?.data) {
        const allData = response.data.data;
        // Find the current video
        const current = allData.find(item => item.id.toString() === idFromUrl);
        
        setMediaData({
          fetching: false,
          success: true,
          data: allData,
          error: null
        });
        
        if (current) {
          setCurrentVideo(current);
        }
      }
    } catch (error) {
      console.error('Error fetching media data:', error);
      setMediaData({
        fetching: false,
        success: false,
        data: [],
        error: error.message || 'Failed to fetch media data'
      });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (idFromUrl) {
      fetchData();
    }
    else{
      navigate('/media');
    }
  }, [idFromUrl]);

  if (mediaData.fetching) {
    return (
      <div className="media-details">
        <div className="loader">
          <Loader />
        </div>
      </div>
    );
  }

  if (mediaData.error || !currentVideo) {
    return (
      <div className="media-details">
        <div className="error-screen">
          <MdError />
          <p>Failed to load media details. Please try again later.</p>
          <Link to="/media" className="back-button">
            <FaArrowLeft />
            {translate("buttons.backToMedia")}
          </Link>
        </div>
      </div>
    );
  }

  // Get up to 4 related videos, excluding the current video
  const relatedVideos = mediaData.data
    .filter(item => item.id.toString() !== idFromUrl && item.mediaUrl)
    .slice(0, 4);

  return (
    <div className="media-details">
      <Link to="/media" className="back-button">
        <FaArrowLeft />
        {translate("buttons.backToMedia")}
      </Link>

      <div className="video-section">
        <VideoPlayer url={currentVideo.mediaUrl} />
        <div className="video-info">
          <h1>{language === "en" ? currentVideo.title : currentVideo.koreanTitle || currentVideo.title}</h1>
          <span className="date">{moment(currentVideo.date).format("MMMM DD, YYYY")}</span>
          {currentVideo.fullDescription && (
            <div className="video-description">
              <p>{language === "en" ? currentVideo.fullDescription : currentVideo.koreanDescription || currentVideo.fullDescription}</p>
            </div>
          )}
        </div>
      </div>

      {!isEmpty(relatedVideos) && (
        <div className="related-videos">
          <h2>{translate("buttons.moreVideos")}</h2>
          <div className="media-grid">
            {relatedVideos.map(item => (
              <Card
                key={item.id}
                thumbnail={item.thumbnail}
                title={language === "en" ? item.title : item.koreanTitle || item.title}
                subtitle={moment(item.date).format("MMMM DD, YYYY")}
                link={`/media-details?id=${item.id}`}
                linkState={{ ...item }}
              />
                          ))}
            </div>
           { relatedVideos.length >= 4 && <Link to="/media" className="view-all-button">
              {translate("buttons.viewAllMedia")}
            </Link>}
          </div>
        )}
      </div>
    );
  };

export default MediaDetails;