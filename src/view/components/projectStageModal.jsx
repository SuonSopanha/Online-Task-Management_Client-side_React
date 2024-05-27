import React, { useState, useEffect, useContext } from "react";
import MemberDropdown from "./memberDropdown";
import { apiRequest } from "../../api/api";
import { modalContext } from "../part/test";

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
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const { tabID } = useContext(modalContext);

  const project_id = parseInt(tabID);

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

  const handleSave = async () => {
    if (stageName.trim() === "") {
      alert("Please enter a stage name.");
      return;
    }

    setIsLoading(true); // Disable button when request starts

    try {
      const stage_id = await apiRequest("post", "api/v1/project-stages", {
        project_id: project_id,
        stage_name: stageName,
        start_date: startDate,
        end_date: endDate,
        period: period,
        completed: complete,
        completion_date: completeDate,
      });

      console.log(stage_id);

      // Close the modal after saving
      onClose();
    } catch (error) {
      console.error("Failed to save project stage:", error);
      alert("An error occurred while saving the project stage.");
    } finally {
      setIsLoading(false); // Re-enable button after request completes
    }
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
              {/* <MemberDropdown members={mockMembers} /> */}
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
                  type="number"
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
                className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoading} // Disable button when loading
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md ml-2 hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
                disabled={isLoading} // Disable button when loading
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
