import React from 'react';
import './accordion.css';

const Accordion = ({ children }) => {
  return <div className="accordion">{children}</div>;
};

export default Accordion;