import { useQuery } from "@tanstack/react-query";
import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiRequest } from "../../api/api";
import LoadingBalls from "../../utils/loading";
import { modalContext } from "../part/test";


const mockProjectData = {
  project_name: "Mock Project",
  start_date: "2024-01-01",
  end_date: "2024-12-31",
  project_status: "In Progress",
  project_priority: "High",
};

const ProjectDetail = () => {
  const { projectId } = useParams();
  const { tabID } = useContext(modalContext);
  const navigate = useNavigate();
  // const [project, setProject] = useState(mockProjectData);
  const [isEditing, setIsEditing] = useState(false);

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
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    project((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Save changes to mock data (In real scenario, you would update the database here)
    setIsEditing(false);
    console.log("Project saved:", project);
  };

  const handleDelete = () => {
    // Delete the project from mock data (In real scenario, you would delete from the database here)
    console.log("Project deleted");
    navigate("/projects");
  };

  if (projectLoading) {
    return (
      <div className="flex justify-center items-center h-72">
        <LoadingBalls />
      </div>
    );
  }

  if (projectError)
    return <div>Error: {projectError}</div>;

  return (
    <div className="p-10 w-auto">
      <div className=" bg-glasses bg-opacity-50 shadow-md rounded-lg p-6">
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
                value={project.project_name}
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
                  value={project.start_date}
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
                  value={project.end_date}
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
                  value={project.project_status}
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
                  value={project.project_priority}
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
