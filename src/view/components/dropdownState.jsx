import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

const DropdownButton = ({ type, initState, handleChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(initState);
  const [buttonColor, setButtonColor] = useState(getButtonColor(initState));

  function getButtonColor(option) {
    switch (option) {
      case "On Track":
        return "bg-green-100 border-green-900 text-green-700";
      case "On Hold":
        return "bg-yellow-100 border-yellow-900 text-yellow-700";
      case "Complete":
        return "bg-blue-100 border-blue-900 text-blue-700";
      case "Off Track":
        return "bg-red-100 border-red-900 text-red-700";
      case "Cancelled":
        return "bg-gray-100 border-gray-900 text-gray-700";
      case "To Do":
        return "bg-green-100 border-green-900 text-green-700";
      case "Done":
        return "bg-blue-100 border-blue-900 text-blue-700";
      case "Working":
        return "bg-yellow-100 border-yellow-900 text-yellow-700";
      case "Low":
        return "bg-blue-100 border-blue-900 text-blue-700";
      case "Medium":
        return "bg-green-100 border-green-900 text-green-700";
      case "High":
        return "bg-yellow-100 border-yellow-900 text-yellow-700";
      case "Very High":
        return "bg-red-100 border-red-900 text-red-700";
      default:
        return "bg-gray-100 border-gray-900 text-gray-700";
    }
  }

  const options =
    type === "status"
      ? ["On Track", "On Hold", "Complete", "Off Track", "Cancelled"]
      : type === "category"
      ? ["To Do", "Done", "Working"]
      : ["Low", "Medium", "High", "Very High"];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setButtonColor(getButtonColor(option));
    handleChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className={`inline-flex items-center px-2 py-0.5 text-sm whitespace-nowrap font-medium border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-gray-100 focus:ring-gray-500 transition duration-500 ${buttonColor}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {type !== "category" && <FaCheckCircle className="mr-2" />}
        {selectedOption}
      </button>

      <div
        className={`origin-top-right absolute right-0 mt-2 w-32 rounded-lg shadow-lg bg-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-300 ${
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {isOpen && (
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleOptionClick(option)}
                className={`block w-full px-4 py-2 text-sm ${
                  selectedOption === option ? `${buttonColor} text-black` : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
                role="menuitem"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownButton;
