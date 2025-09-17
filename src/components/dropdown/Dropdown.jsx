import React, { useState } from 'react';
import { FaAngleUp } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import './dropdown.css';

const Dropdown = ({value,onChange}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(value);

  const options = ['Newest', 'Oldest'];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    onChange(option)
  };

  return (
    <div className="custom-dropdown">
      <div className="selected" onClick={toggleDropdown}>
        {selected}
        <span className="arrow">{isOpen ? <FaAngleUp/> : <FaAngleDown/>}</span>
      </div>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((opt) => (
            <li
              key={opt}
              className={opt === selected ? 'active' : ''}
              onClick={() => handleSelect(opt)}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;