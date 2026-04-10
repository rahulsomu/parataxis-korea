import React from "react";
import Card from "../card/Card";
import moment from "moment";
import { useTranslation } from "../../context/TranslationContext";
import { DATE_FORMAT } from "../../constants";

const MediaItem = ({ item, pageNumber }) => {
  const { date, koreanTitle, thumbnail, title, id, mediaUrl, publishDate } =
    item;

  const { language } = useTranslation();
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (language === "en") {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } else {
      return date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
  };

  if (!mediaUrl) {
    return null;
  }

  return (
    <Card
      thumbnail={thumbnail}
      title={language === "en" ? title : koreanTitle || title}
      subtitle={formatDate(publishDate || date)}
      link={`/media-details?id=${id}&pageNo=${pageNumber}`}
      linkState={{ ...item, pageNo: pageNumber }}
    />
  );
};

export default MediaItem;
