import React, { useEffect, useRef, useState } from "react";
import "./dartEmbed.css";
const DartEmbed = () => {
  const iframeRef = useRef(null);
  const [blocked, setBlocked] = useState(false);
  const targetUrl =
    "https://dart.fss.or.kr/html/search/SearchCompany_M2.html?textCrpNM=288330";

  useEffect(() => {
    const iframe = iframeRef.current;
    let loaded = false;

    const handleLoad = () => {
      loaded = true;
      setBlocked(false);
    };
    const handleError = () => setBlocked(true);

    iframe.addEventListener("load", handleLoad);
    iframe.addEventListener("error", handleError);

    const timeout = setTimeout(() => {
      if (!loaded) setBlocked(true);
    }, 10000);

    return () => {
      clearTimeout(timeout);
      iframe.removeEventListener("load", handleLoad);
      iframe.removeEventListener("error", handleError);
    };
  }, []);

  const handleOpen = () => window.open(targetUrl, "_blank", "noopener");

  const handleReload = () => {
    setBlocked(false);
    iframeRef.current.src =
      targetUrl + (targetUrl.includes("?") ? "&" : "?") + "ts=" + Date.now();
  };

  const toggleFullscreen = async () => {
    const elem = iframeRef.current.parentElement;
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      elem.requestFullscreen?.();
    }
  };

  return (
    <div className="dart-embed-root">
      <div className="controls">
        <button onClick={toggleFullscreen}>⤢ Fullscreen</button>
        <button onClick={handleOpen}>↗ Open</button>
        <button onClick={handleReload}>⟳ Reload</button>
      </div>

      <iframe
        ref={iframeRef}
        src={targetUrl}
        title="DART Embed"
        className="dart-iframe"
        allowFullScreen
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
      ></iframe>

      {blocked && (
        <div className="blocked">
          <h2>Unable to embed the page</h2>
          <p>
            This site blocks embedding (common for government/financial sites).
            You can{" "}
            <a href={targetUrl} target="_blank" rel="noopener noreferrer">
              open it in a new tab
            </a>{" "}
            instead.
          </p>
        </div>
      )}
    </div>
  );
};

export default DartEmbed;
