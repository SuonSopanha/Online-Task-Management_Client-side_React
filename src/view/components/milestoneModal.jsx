import React, { useState, useEffect } from "react";

const MilestoneModal = ({ onClose, initialValue }) => {
  const [milestoneName, setMilestoneName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (initialValue) {
      setMilestoneName(initialValue.milestoneName || "");
      setStartDate(initialValue.startDate || "");
      setEndDate(initialValue.endDate || "");
    }
  }, [initialValue]);

  const handleNameChange = (event) => {
    setMilestoneName(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleSave = () => {
    // You can perform any action here with the milestone data, such as saving it to a database
    console.log("Milestone Name:", milestoneName);
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);

    // Close the modal after saving
    onClose();
  };

  return (
    <>
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div
            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-headline"
                  >
                    Milestone
                  </h3>
                  <div className="mt-2">
                    <input
                      type="text"
                      value={milestoneName}
                      onChange={handleNameChange}
                      className="border rounded-md p-2 w-full mb-2"
                      placeholder="Enter milestone name"
                    />
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date:
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={handleStartDateChange}
                      className="border rounded-md p-2 w-full mb-2"
                    />
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date:
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={handleEndDateChange}
                      className="border rounded-md p-2 w-full mb-2"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2"
              >
                Save
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MilestoneModal;
