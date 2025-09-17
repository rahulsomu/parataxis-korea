import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import './accordion.css';

const AccordionItem = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  return (
    <div className="accordion-item">
      <button className="accordion-header" onClick={toggle}>
        {title}
        <FiChevronDown className={`arrow-icon ${open ? 'open' : ''}`} />
      </button>
      {open && <div className="accordion-content">{children}</div>}
    </div>
  );
};

export default AccordionItem;