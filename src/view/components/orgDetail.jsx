import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const mockProjectData = {
  name: "Mock Project",
  industry: "Technology",
  email: "project@example.com",
  description: "This is a mock project description."
};
const OrgDetail = ({team}) => {
    const navigate = useNavigate();
    const [project, setProject] = useState(mockProjectData);
    const [isEditing, setIsEditing] = useState(false);
  
    const handleEditToggle = () => {
      setIsEditing(!isEditing);
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setProject((prevProject) => ({
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
  
    return (
      <div className="p-10 w-auto">
        <div className="bg-white bg-opacity-50 shadow-md rounded-lg p-6">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Project Details</h1>
            <p className="text-lg text-gray-600">
              {isEditing ? "Edit your project details below" : "View your project details below"}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-gray-700 font-medium">Name</label>
              {isEditing ? (
                <input
                  className="mt-2 w-full p-3 border rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                  type="text"
                  name="name"
                  value={project.name}
                  onChange={handleChange}
                />
              ) : (
                <p className="mt-2 p-3 border rounded-lg bg-gray-50">{project.name}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Industry</label>
              {isEditing ? (
                <input
                  className="mt-2 w-full p-3 border rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                  type="text"
                  name="industry"
                  value={project.industry}
                  onChange={handleChange}
                />
              ) : (
                <p className="mt-2 p-3 border rounded-lg bg-gray-50">{project.industry}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              {isEditing ? (
                <input
                  className="mt-2 w-full p-3 border rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                  type="email"
                  name="email"
                  value={project.email}
                  onChange={handleChange}
                />
              ) : (
                <p className="mt-2 p-3 border rounded-lg bg-gray-50">{project.email}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Description</label>
              {isEditing ? (
                <textarea
                  className="mt-2 w-full p-3 border rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                  name="description"
                  value={project.description}
                  onChange={handleChange}
                  rows="4"
                />
              ) : (
                <p className="mt-2 p-3 border rounded-lg bg-gray-50">{project.description}</p>
              )}
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

export default OrgDetail;