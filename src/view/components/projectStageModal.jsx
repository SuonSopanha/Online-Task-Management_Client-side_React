import React, { useState, useEffect } from "react";
import MemberDropdown from "./memberDropdown";


const mockMembers = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alice Johnson" },
    { id: 4, name: "Bob Brown" },
    { id: 5, name: "Emily Davis" },
  ];
  

const ProjectStageModal = ({ onClose, initialValue }) => {
  const [stageName, setStageName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [period, setPeriod] = useState("");
  const [complete, setComplete] = useState(false);
  const [completeDate, setCompleteDate] = useState("");

  useEffect(() => {
    if (initialValue) {
      setStageName(initialValue.stageName || "");
      setStartDate(initialValue.startDate || "");
      setEndDate(initialValue.endDate || "");
      setPeriod(initialValue.period || "");
      setComplete(initialValue.complete || false);
      setCompleteDate(initialValue.completeDate || "");
    }
  }, [initialValue]);

  const handleNameChange = (event) => {
    setStageName(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handlePeriodChange = (event) => {
    setPeriod(event.target.value);
  };

  const handleCompleteChange = () => {
    setComplete(!complete);
  };

  const handleCompleteDateChange = (event) => {
    setCompleteDate(event.target.value);
  };

  const handleSave = () => {
    // You can perform any action here with the stage data, such as saving it to a database
    console.log("Stage Name:", stageName);
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
    console.log("Period:", period);
    console.log("Complete:", complete);
    console.log("Complete Date:", completeDate);

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
                    Project Stage
                  </h3>
                  <div className="mt-2">
                    <input
                      type="text"
                      value={stageName}
                      onChange={handleNameChange}
                      className="border rounded-md p-2 w-full mb-2"
                      placeholder="Enter stage name"
                    />
                    <div className="flex flex-wrap -mx-3 mb-2">
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Start Date:
                        </label>
                        <input
                          type="date"
                          value={startDate}
                          onChange={handleStartDateChange}
                          className="border rounded-md p-2 w-full"
                        />
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          End Date:
                        </label>
                        <input
                          type="date"
                          value={endDate}
                          onChange={handleEndDateChange}
                          className="border rounded-md p-2 w-full"
                        />
                      </div>
                    </div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Period:
                    </label>
                    <input
                      type="text"
                      value={period}
                      onChange={handlePeriodChange}
                      className="border rounded-md p-2 w-full mb-2"
                      placeholder="Enter period"
                    />
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Complete:
                    </label>
                    <input
                      type="checkbox"
                      checked={complete}
                      onChange={handleCompleteChange}
                      className="mr-2"
                    />
                    <label className="mr-2">Yes</label>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Complete Date:
                    </label>
                    <input
                      type="date"
                      value={completeDate}
                      onChange={handleCompleteDateChange}
                      className="border rounded-md p-2 w-full mb-2"
                    />
                  </div>

                  <MemberDropdown members={mockMembers}/>
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

export default ProjectStageModal;
