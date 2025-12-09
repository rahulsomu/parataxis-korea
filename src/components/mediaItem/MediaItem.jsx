import React from "react";
import Card from "../card/Card";
import moment from "moment";
import { useTranslation } from "../../context/TranslationContext";
import { DATE_FORMAT } from "../../constants";

const MediaItem = ({ item, pageNumber }) => {
  const { date, koreanTitle, thumbnail, title, id, mediaUrl } = item;

  const { language } = useTranslation();

  if (!mediaUrl) {
    return null;
  }

  return (
    <Card
      thumbnail={thumbnail}
      title={language === "en" ? title : koreanTitle || title}
      subtitle={moment(date).format(DATE_FORMAT)}
      link={`/media-details?id=${id}&pageNo=${pageNumber}`}
      linkState={{ ...item, pageNo: pageNumber }}
    />
  );
};

export default MediaItem;
