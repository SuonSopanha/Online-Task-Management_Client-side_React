import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiRequest } from "../../api/api";
import LoadingBalls from "../../utils/loading";
import { modalContext } from "../part/test";

const ProjectDetail = () => {
  const { projectId } = useParams();
  const { tabID } = useContext(modalContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editProject, setEditProject] = useState(null);

  const {
    data: project,
    isLoading: projectLoading,
    error: projectError,
  } = useQuery({
    queryKey: ["projectDetail_project"],
    queryFn: fetchProject,
  });

  async function fetchProject() {
    const response = await apiRequest("get", "api/v1/projects/" + tabID);
    return response.data;
  }

  useEffect(() => {
    if (project) {
      setEditProject(project);
    }
  }, [project]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setEditProject(project);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  const saveProjectMutation = useMutation({
    mutationFn: async (updatedProject) => {
      const response = await apiRequest("put", "api/v1/projects/" + updatedProject.id, updatedProject);
      if (!response || response.status !== "Request was successful") {
        throw new Error(response.message || "Failed to update project");
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["projectDetail_project"]);
      setIsEditing(false);
    },
  });

  const handleSave = () => {
    if (editProject) {
      saveProjectMutation.mutate(editProject);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await apiRequest("delete", "api/v1/projects/" + project.id);
      if (response.status === "Request was successful") {
        alert("Project deleted successfully");
        navigate("/projects");
      } else {
        alert("Task not deleted successfully, Unauthorized");
      }
    } catch (error) {
      if (error.response) {
        const statusCode = error.response.status;
        if (statusCode === 403) {
          alert("Unauthorized: You don't have permission to delete this project");
        } else {
          alert(`Error: ${statusCode}`);
        }
      } else {
        alert("Error: Unable to delete project. Please try again later.");
      }
    }
  };

  if (projectLoading) {
    return (
      <div className="flex justify-center items-center h-72">
        <LoadingBalls />
      </div>
    );
  }

  if (projectError) return <div>Error: {projectError.message}</div>;

  return (
    <div className="p-10 w-auto">
      <div className="bg-glasses bg-opacity-50 shadow-md rounded-lg p-6">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Project Details</h1>
          <p className="text-lg text-gray-600">{isEditing ? "Edit your project details below" : "View your project details below"}</p>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-gray-700 font-medium">Project Name</label>
            {isEditing ? (
              <input
                className="mt-2 w-full p-3 border rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                type="text"
                name="project_name"
                value={editProject?.project_name || ""}
                onChange={handleChange}
              />
            ) : (
              <p className="mt-2 p-3 border rounded-lg bg-gray-50">{project.project_name}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium">Start Date</label>
              {isEditing ? (
                <input
                  className="mt-2 w-full p-3 border rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                  type="date"
                  name="start_date"
                  value={editProject?.start_date || ""}
                  onChange={handleChange}
                />
              ) : (
                <p className="mt-2 p-3 border rounded-lg bg-gray-50">{project.start_date}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium">End Date</label>
              {isEditing ? (
                <input
                  className="mt-2 w-full p-3 border rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                  type="date"
                  name="end_date"
                  value={editProject?.end_date || ""}
                  onChange={handleChange}
                />
              ) : (
                <p className="mt-2 p-3 border rounded-lg bg-gray-50">{project.end_date}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium">Project Status</label>
              {isEditing ? (
                <input
                  className="mt-2 w-full p-3 border rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                  type="text"
                  name="project_status"
                  value={editProject?.project_status || ""}
                  onChange={handleChange}
                />
              ) : (
                <p className="mt-2 p-3 border rounded-lg bg-gray-50">{project.project_status}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Project Priority</label>
              {isEditing ? (
                <input
                  className="mt-2 w-full p-3 border rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                  type="text"
                  name="project_priority"
                  value={editProject?.project_priority || ""}
                  onChange={handleChange}
                />
              ) : (
                <p className="mt-2 p-3 border rounded-lg bg-gray-50">{project.project_priority}</p>
              )}
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            {isEditing ? (
              <>
                <button
                  className="h-10 px-6 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  className="h-10 px-6 rounded-lg bg-gray-600 text-white font-medium hover:bg-gray-700 transition"
                  onClick={handleEditToggle}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                className="h-10 px-6 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                onClick={handleEditToggle}
              >
                Edit
              </button>
            )}
            <button
              className="h-10 px-6 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
