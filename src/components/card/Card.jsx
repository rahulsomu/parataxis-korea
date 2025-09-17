import React from 'react';
import { Link } from 'react-router-dom';
import './card.css';
import RevealAnimation from '../RevealAnimation';
import { FaPlay } from 'react-icons/fa';
import { useTranslation } from '../../context/TranslationContext';
import defaultThumbnail from '../../assets/images/default-thumbnail.jpg';

const Card = ({ 
  thumbnail, 
  title, 
  subtitle,
  link,
  linkState,
  onClick,
  showPlayButton = true 
}) => {
  const { translate } = useTranslation();
  return (
    <RevealAnimation>
      <div className="card">
        <div className="card-thumbnail">
          <img src={thumbnail ? thumbnail : defaultThumbnail} alt={title} />
          {showPlayButton && (
            <div className="play-button">
              <Link 
              to={link} 
              state={linkState} 
              className='play-button-link'
              onClick={onClick}
            >
              <FaPlay />
            </Link>
            </div>
          )}
        </div>
        <div className="card-content">
          <h3 className="card-title">{title}</h3>
          {subtitle && <p className="card-subtitle">{subtitle}</p>}
          {link && (
            <Link 
              to={link} 
              state={linkState} 
              className="card-button"
              onClick={onClick}
            >
              {translate("buttons.watchNow")}
            </Link>
          )}
        </div>
      </div>
    </RevealAnimation>
  );
};

export default Card;