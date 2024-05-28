import React, { useState, useEffect, useRef } from "react";

const MilestoneDropDown = ({ initialValue, options, onChange }) => {
  const [selectedValue, setSelectedValue] = useState(initialValue);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setSelectedValue(initialValue);
  }, [initialValue]);

  const handleChange = (event) => {
    const selectedId = event.target.value;
    const newSelectedValue = options.find(option => option.id === selectedId);
    setSelectedValue(newSelectedValue);
    setIsOpen(false); // Close the dropdown after selection
    if (onChange) {
      onChange(newSelectedValue);
    }
  };

  const handleDivClick = () => {
    setIsOpen(!isOpen); // Toggle the dropdown when the div is clicked
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false); // Close the dropdown if clicked outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef}>
      {isOpen ? (
        <select
          id="milestone-dropdown"
          value={selectedValue?.id || ""}
          onChange={handleChange}
        >
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.milestone_name}
            </option>
          ))}
        </select>
      ) : (
        <div onClick={handleDivClick}>
          {selectedValue?.milestone_name || "Select a milestone"}
        </div>
      )}
    </div>
  );
};

export default MilestoneDropDown;
