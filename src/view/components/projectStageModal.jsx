import React, { useState, useEffect, useContext } from "react";
import MemberDropdown from "./memberDropdown";
import { apiRequest } from "../../api/api";
import { modalContext } from "../part/test";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const ProjectStageModal = ({ onClose, initialValue }) => {
  const [stageName, setStageName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [period, setPeriod] = useState("");
  const [complete, setComplete] = useState(false);
  const [completeDate, setCompleteDate] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [isEditing, setIsEditing] = useState(false);

  const { tabID } = useContext(modalContext);

  const queryClient = useQueryClient();

  const project_id = parseInt(tabID);

  useEffect(() => {
    if (initialValue) {
      setStageName(initialValue.stage_name || "");
      setStartDate(initialValue.start_date || "");
      setEndDate(initialValue.end_date || "");
      setPeriod(initialValue.period || "");
      setComplete(initialValue.complete || false);
      setCompleteDate(initialValue.complete_date || "");
    }

    if (initialValue) {
      setIsEditing(true);
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

  const createStageMutation = useMutation({
    mutationFn: async (newStage) => {
      const response = await apiRequest(
        "post",
        "api/v1/project-stages",
        newStage
      );
      if (!response || response.status !== "Request was successful") {
        throw new Error(response.message || "Failed to save project stage");
      }
      return response.data;
    },
    onMutate: async (newStage) => {
      await queryClient.cancelQueries(["projectList_projectStageList",tabID]);
      await queryClient.cancelQueries(["projectBoard_projectStageList",tabID]);

      await queryClient.cancelQueries(["projectBoard_taskList",tabID]);
      await queryClient.cancelQueries(["projectList_taskList",tabID]);

      const previousStagesList = queryClient.getQueryData([
        "projectList_projectStageList",tabID
      ]);
      const previousStagesBoard = queryClient.getQueryData([
        "projectBoard_projectStageList",tabID
      ]);

      queryClient.setQueryData(["projectBoard_taskList",tabID], (old) => {
        if (!old) return [newStage];
        return [...old, newStage];
      });

      queryClient.setQueryData(["projectBoard_taskList",tabID], (old) => {
        if (!old) return [newStage];
        return [...old, newStage];
      });

      queryClient.setQueryData(["projectList_projectStageList",tabID], (old) => {
        if (!old) return [newStage];
        return [...old, newStage];
      });

      queryClient.setQueryData(["projectBoard_projectStageList",tabID], (old) => {
        if (!old) return [newStage];
        return [...old, newStage];
      });

      return { previousStagesList, previousStagesBoard };
    },
    onError: (err, newStage, context) => {
      console.error("Error occurred:", err);
      if (context.previousStagesList) {
        queryClient.setQueryData(
          ["projectList_projectStageList",tabID],
          context.previousStagesList
        );
      }
      if (context.previousStagesBoard) {
        queryClient.setQueryData(
          ["projectBoard_projectStageList",tabID],
          context.previousStagesBoard
        );
      }

      if (context.previousStagesList) {
        queryClient.setQueryData(
          ["projectBoard_taskList",tabID],
          context.previousStagesList
        );
      }
      if (context.previousStagesBoard) {
        queryClient.setQueryData(
          ["projectBoard_taskList",tabID],
          context.previousStagesBoard
        );
      }

      alert("An error occurred while saving the project stage.");
    },
    onSettled: () => {
      queryClient.invalidateQueries(["projectList_projectStageList",tabID]);
      queryClient.invalidateQueries(["projectBoard_projectStageList",tabID]);

      queryClient.invalidateQueries(["projectBoard_taskList",tabID]);
      queryClient.invalidateQueries(["projectList_taskList",tabID]);
    },
  });

  const handleSave = async () => {
    if (stageName.trim() === "") {
      alert("Please enter a stage name.");
      return;
    }

    setIsLoading(true); // Disable button when request starts

    try {
      const newStage = {
        project_id: project_id,
        stage_name: stageName,
        start_date: startDate,
        end_date: endDate,
        period: period,
        completed: complete,
        completion_date: completeDate,
      };

      createStageMutation.mutate(newStage, {
        onSuccess: (data) => {
          console.log("Project stage created successfully:", data);
          onClose(); // Close the modal after saving
        },
      });
    } catch (error) {
      console.error("Failed to save project stage:", error);
      alert("An error occurred while saving the project stage.");
    } finally {
      setIsLoading(false); // Re-enable button after request completes
    }
  };

  const updateStageMutation = useMutation({
    mutationFn: async (updatedStage) => {
      const response = await apiRequest(
        "put",
        `api/v1/project-stages/${initialValue.id}`,
        updatedStage
      );
      if (!response || response.status !== "Request was successful") {
        throw new Error(response.message || "Failed to update project stage");
      }
      return response.data;
    },
    onMutate: async (updatedStage) => {
      await queryClient.cancelQueries(["projectList_projectStageList",tabID]);
      await queryClient.cancelQueries(["projectBoard_projectStageList",tabID]);

      await queryClient.cancelQueries(["projectBoard_taskList",tabID]);
      await queryClient.cancelQueries(["projectList_taskList",tabID]);

    

      const previousStagesList = queryClient.getQueryData([
        "projectList_projectStageList",tabID
      ]);
      const previousStagesBoard = queryClient.getQueryData([
        "projectBoard_projectStageList",tabID
      ]);

      


      queryClient.setQueryData(["projectList_stage",tabID], (old) => {
        if (!old) return [];
        return old.map((stage) =>
          stage.id === updatedStage.id ? updatedStage : stage
        );
      });

      queryClient.setQueryData(["projectBoard_projectStageList",tabID], (old) => {
        if (!old) return [];
        return old.map((stage) =>
          stage.id === updatedStage.id ? updatedStage : stage
        );
      });


      
      queryClient.setQueryData(["projectBoard_taskList",tabID], (old) => {
        if (!old) return [];
        return old.map((stage) =>
          stage.id === updatedStage.id ? updatedStage : stage
        );
      });

      queryClient.setQueryData(["projectList_taskList",tabID], (old) => {
        if (!old) return [];
        return old.map((stage) =>
          stage.id === updatedStage.id ? updatedStage : stage
        );
      });

      return { previousStagesList, previousStagesBoard };
    },
    onError: (err, updatedStage, context) => {
      console.error("Error occurred:", err);
      if (context.previousStagesList) {
        queryClient.setQueryData(
          ["projectList_stage",tabID],
          context.previousStagesList
        );
      }
      if (context.previousStagesBoard) {
        queryClient.setQueryData(
          ["projectBoard_projectStageList",tabID],
          context.previousStagesBoard
        );
      }

      
      if (context.previousStagesList) {
        queryClient.setQueryData(
          ["projectBoard_taskList",tabID],
          context.previousStagesList
        );
      }
      if (context.previousStagesBoard) {
        queryClient.setQueryData(
          ["projectList_taskList",tabID],
          context.previousStagesBoard
        );
      }

      alert("An error occurred while updating the project stage.");
    },
    onSettled: () => {
      queryClient.invalidateQueries(["projectList_stage",tabID]);
      queryClient.invalidateQueries(["projectBoard_projectStageList",tabID]);

      queryClient.invalidateQueries(["projectBoard_taskList",tabID]);
      queryClient.invalidateQueries(["projectList_taskList",tabID]);
    },
  });

  const handleUpdate = async () => {
    if (stageName.trim() === "") {
      alert("Please enter a stage name.");
      return;
    }

    setIsLoading(true); // Disable button when request starts

    try {
      const updatedStage = {
        stage_name: stageName,
        start_date: startDate,
        end_date: endDate,
        period: period,
        completed: complete,
        completion_date: completeDate,
      };

      updateStageMutation.mutate(updatedStage, {
        onSuccess: (data) => {
          console.log("Project stage updated successfully:", data);
          onClose(); // Close the modal after updating
        },
      });
    } catch (error) {
      console.error("Failed to update project stage:", error);
      alert("An error occurred while updating the project stage.");
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
              {isEditing && (
                <button
                  type="button"
                  onClick={handleUpdate}
                  className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isLoading} // Disable button when loading
                >
                  {isLoading ? "Update..." : "Update"}
                </button>
              )}

              {!isEditing && (
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

export default ProjectStageModal;
