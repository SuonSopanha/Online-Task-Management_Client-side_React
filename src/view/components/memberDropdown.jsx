import React, { useState } from "react";

const MemberDropdown = ({ members, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMemberSelect = (member) => {
    setSelectedMember(member);
    setIsOpen(false);
    if (onChange) {
      onChange(member);
    }
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          onClick={toggleDropdown}
        >
          {selectedMember ? selectedMember.full_name : "Select Member"}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M7.293 7.293a1 1 0 011.414 0L10 8.586l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414zM10 4a1 1 0 110 2 1 1 0 010-2z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {members.map((member) => {
              if (!member) return null; // Skip rendering if member is undefined or null
              return (
                <div
                  key={member.id}
                  className={`block px-4 py-2 text-sm cursor-pointer ${
                    selectedMember && selectedMember.id === member.id
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                  onClick={() => handleMemberSelect(member)}
                  role="menuitem"
                >
                  {member.photo_url ? (
                    <img
                      src={member.photo_url}
                      alt={member.full_name}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                  ) : (
                    <img
                      src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                      alt="Default Avatar"
                      className="w-8 h-8 rounded-full mr-2"
                    />
                  )}
                  {member.full_name}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberDropdown;
