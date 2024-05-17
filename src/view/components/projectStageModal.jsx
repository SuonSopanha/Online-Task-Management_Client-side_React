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
      <div className="fixed z-10 inset-0 overflow-y-auto ">
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-md w-full">
            <div className="bg-blue-500 text-white py-4 px-6">
              <h3 className="text-lg font-semibold">Project Stage</h3>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">
                  Stage Name:
                </label>
                <input
                  type="text"
                  value={stageName}
                  onChange={handleNameChange}
                  className="w-full border rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  placeholder="Enter stage name"
                />
              </div>
              <MemberDropdown members={mockMembers} />
              <div className="flex flex-wrap -mx-3 mb-4 mt-2">
                <div className="w-full md:w-1/2 px-3">
                  <label className="block text-sm font-semibold mb-1">
                    Start Date:
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={handleStartDateChange}
                    className="w-full border rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label className="block text-sm font-semibold mb-1">
                    End Date:
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={handleEndDateChange}
                    className="w-full border rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">
                  Period:
                </label>
                <input
                  type="text"
                  value={period}
                  onChange={handlePeriodChange}
                  className="w-full border rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  placeholder="Enter period"
                />
              </div>
              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  checked={complete}
                  onChange={handleCompleteChange}
                  className="mr-2 border border-gray-400 rounded cursor-pointer"
                />
                <label className="text-sm">Complete</label>
              </div>
              {complete && (
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-1">
                    Complete Date:
                  </label>
                  <input
                    type="date"
                    value={completeDate}
                    onChange={handleCompleteDateChange}
                    className="w-full border rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                </div>
              )}

            </div>
            <div className="bg-gray-100 py-3 px-4 flex justify-end">
              <button
                type="button"
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Save
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md ml-2 hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
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
