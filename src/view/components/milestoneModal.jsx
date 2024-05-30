import React, { useState, useEffect } from "react";
import api, { apiRequest } from "../../api/api";
import { useMutation , useQueryClient } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";

const MilestoneModal = ({ onClose, initialValue }) => {
  const [milestoneName, setMilestoneName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  // const navigate = useNavigate();
  const [editState,setEditState] = useState(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (initialValue) {
      setMilestoneName(initialValue.milestone_name || "");
      setStartDate(initialValue.start_date || "");
      setEndDate(initialValue.end_date || "");
    }

    if(initialValue.milestone_name){
      setEditState(true);
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

  const createMilestoneMutation = useMutation({
    mutationFn: async (newMilestone) => {
      const response = await apiRequest(
        "post",
        "api/v1/milestones",
        newMilestone
      );
      if (!response || response.status !== "Request was successful") {
        throw new Error(response.message || "Failed to save milestone");
      }
      return response.data;
    },
    onMutate: async (newMilestone) => {
      await queryClient.cancelQueries(["taskList_milestone"]);
      await queryClient.cancelQueries(["taskBoard_milestone"]);

      const previousMilestonesList = queryClient.getQueryData([
        "taskList_milestone",
      ]);
      const previousMilestonesBoard = queryClient.getQueryData([
        "taskBoard_milestone",
      ]);

      queryClient.setQueryData(["taskList_milestone"], (old) => {
        if (!old) return [newMilestone];
        return [...old, newMilestone];
      });

      queryClient.setQueryData(["taskBoard_milestone"], (old) => {
        if (!old) return [newMilestone];
        return [...old, newMilestone];
      });

      return { previousMilestonesList, previousMilestonesBoard };
    },
    onError: (err, newMilestone, context) => {
      console.error("Error occurred:", err);
      if (context.previousMilestonesList) {
        queryClient.setQueryData(
          ["taskList_milestone"],
          context.previousMilestonesList
        );
      }
      if (context.previousMilestonesBoard) {
        queryClient.setQueryData(
          ["taskBoard_milestone"],
          context.previousMilestonesBoard
        );
      }

      alert("An error occurred while saving the milestone.");
    },
    onSettled: () => {
      queryClient.invalidateQueries(["taskList_milestone"]);
      queryClient.invalidateQueries(["taskBoard_milestone"]);
    },
  });

  const handleSave = async () => {
    if (milestoneName.trim() === "") {
      alert("Please enter a milestone name.");
      return;
    }
  
    setIsLoading(true); // Disable button when request starts
  
    try {
      const newMilestone = {
        milestone_name: milestoneName,
        start_date: startDate,
        end_date: endDate,
      };
  
      createMilestoneMutation.mutate(newMilestone, {
        onSuccess: (data) => {
          console.log("Milestone created successfully:", data);
          // navigate("/app", { state: { milestone_id: data.id } });
          onClose(); // Close the modal after saving
        },
      });
    } catch (error) {
      console.error("Failed to save milestone:", error);
      alert("An error occurred while saving the milestone.");
    } finally {
      setIsLoading(false); // Re-enable button after request completes
    }
  };

  const updateMilestoneMutation = useMutation({
    mutationFn: async (updatedMilestone) => {
      const response = await apiRequest("put", `api/v1/milestones/${updatedMilestone.id}`, updatedMilestone);
      if (!response || response.status !== "Request was successful") {
        throw new Error(response.message || "Failed to update milestone");
      }
      return response.data;
    },
    onMutate: async (updatedMilestone) => {
      await queryClient.cancelQueries(["taskList_milestone"]);
      await queryClient.cancelQueries(["taskBoard_milestone"]);
  
      const previousMilestonesList = queryClient.getQueryData(["taskList_milestone"]);
      const previousMilestonesBoard = queryClient.getQueryData(["taskBoard_milestone"]);
  
      queryClient.setQueryData(["taskList_milestone"], (old) => {
        if (!old) return [];
        return old.map(milestone => milestone.id === updatedMilestone.id ? updatedMilestone : milestone);
      });
  
      queryClient.setQueryData(["taskBoard_milestone"], (old) => {
        if (!old) return [];
        return old.map(milestone => milestone.id === updatedMilestone.id ? updatedMilestone : milestone);
      });
  
      return { previousMilestonesList, previousMilestonesBoard };
    },
    onError: (err, updatedMilestone, context) => {
      console.error("Error occurred:", err);
      if (context.previousMilestonesList) {
        queryClient.setQueryData(["taskList_milestone"], context.previousMilestonesList);
      }
      if (context.previousMilestonesBoard) {
        queryClient.setQueryData(["taskBoard_milestone"], context.previousMilestonesBoard);
      }
  
      alert("An error occurred while updating the milestone.");
    },
    onSettled: () => {
      queryClient.invalidateQueries(["taskList_milestone"]);
      queryClient.invalidateQueries(["taskBoard_milestone"]);
    },
  });


  const handleUpdate = async () => {
    if (milestoneName.trim() === "") {
      alert("Please enter a milestone name.");
      return;
    }
  
    setIsLoading(true); // Disable button when request starts
  
    try {

      const updatedMilestone = {
        id:initialValue.id,
        milestone_name: milestoneName,
        start_date: startDate,
        end_date: endDate,
      };
  
      updateMilestoneMutation.mutate(updatedMilestone, {
        onSuccess: (data) => {
          console.log("Milestone updated successfully:", data);
          // navigate("/app", { state: { milestone_id: data.id } });
          onClose(); // Close the modal after updating
        },
      });
    } catch (error) {
      console.error("An error occurred while updating the milestone:", error);
      alert("An error occurred while updating the milestone. Please try again later.");
    } finally {
      setIsLoading(false); // Re-enable button after request completes
    }
  };
  
  
  

  return (
    <>
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen p-4 text-center">
          <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-md w-full">
            <div className="bg-gray-800 text-white py-4 px-6">
              <h3 className="text-lg font-semibold">Milestone</h3>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">
                  Milestone Name:
                </label>
                <input
                  type="text"
                  value={milestoneName}
                  onChange={handleNameChange}
                  className="w-full border rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  placeholder="Enter milestone name"
                />
              </div>
              <div className="mb-4">
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
              <div className="mb-4">
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
            <div className="bg-gray-100 py-3 px-4 flex justify-end">
              {editState && (
                <button
                type="button"
                onClick={handleUpdate}
                className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoading} // Disable button when loading
              >
                {isLoading ? "Updating..." : "Update"}
              </button>
              )}

              {!editState && (
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
              )}


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

export default MilestoneModal;
