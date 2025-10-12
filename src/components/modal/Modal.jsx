import React from "react";
import ReactDOM from "react-dom";
import RevealAnimation from "../RevealAnimation";

const Modal = ({ children, onClose, maxWidth = null }) => {
  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <RevealAnimation>
        <div
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
          style={{ maxWidth: maxWidth ? maxWidth : "1000px" }}
        >
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
          {children}
        </div>
      </RevealAnimation>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
