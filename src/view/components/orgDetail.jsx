import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { modalContext } from "../part/test";

import { apiRequest } from "../../api/api";
import { useQuery } from "@tanstack/react-query";
import LoadingBalls from "../../utils/loading";
import { te } from "date-fns/locale";
import { useMutation, useQueryClient } from "@tanstack/react-query";


const OrgDetail = ({ team }) => {
  const navigate = useNavigate();
  const [project, setProject] = useState(team);
  const [isEditing, setIsEditing] = useState(false);

  const { tabID } = useContext(modalContext);
  const queryClient = useQueryClient();

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

  const updateOrganizationMutation = useMutation({
    mutationFn: async (updatedOrganization) => {
      const response = await apiRequest(
        "put",
        `/api/v1/organizations/${updatedOrganization.id}`,
        updatedOrganization
      );
      if (!response || response.status !== "Request was successful") {
        throw new Error(response.message || "Failed to update organization");
      }
      return response.data;
    },
    onMutate: async (updatedOrganization) => {
      await queryClient.cancelQueries(["teamHeader_team", tabID]);

      const previousTeams = queryClient.getQueryData([
        "teamHeader_team",
        tabID,
      ]);

      queryClient.setQueryData(["teamHeader_team", tabID], (old) => {
        if (!old) return [];
        return old.map((team) =>
          team.id === updatedOrganization.id ? updatedOrganization : team
        );
      });

      return { previousTeams };
    },
    onError: (err, updatedOrganization, context) => {
      console.error("Error occurred:", err);
      if (context.previousTeams) {
        queryClient.setQueryData(
          ["teamHeader_team", tabID],
          context.previousTeams
        );
      }
      alert("An error occurred while updating the organization.");
    },
    onSettled: () => {
      queryClient.invalidateQueries(["teamHeader_team", tabID]);
    },
  });

  const handleSave = async () => {
    setIsEditing(false);

    try {
      const updatedOrganization = {
        ...project,
        // other fields to be updated can be included here
      };

      updateOrganizationMutation.mutate(updatedOrganization, {
        onSuccess: (data) => {
          console.log("Organization updated successfully:", data);
        },
      });
    } catch (error) {
      console.error("Failed to update organization:", error);
      alert("An error occurred while updating the organization.");
    }
  };

  const deleteOrganizationMutation = useMutation({
    mutationFn: async (organizationId) => {
      const response = await apiRequest(
        "delete",
        `/api/v1/organizations/${organizationId}`
      );
      if (!response || response.status !== "Request was successful") {
        throw new Error(response.message || "Failed to delete organization");
      }
      return organizationId;
    },
    onMutate: async (organizationId) => {
      await queryClient.cancelQueries(["organization"]);

      const previousTeams = queryClient.getQueryData(["organization"]);

      queryClient.setQueryData(["organization"], (old) => {
        if (!old) return [];
        return old.filter((team) => team.id !== organizationId);
      });

      return { previousTeams };
    },
    onError: (err, organizationId, context) => {
      console.error("Error occurred:", err);
      if (context.previousTeams) {
        queryClient.setQueryData(["organization"], context.previousTeams);
      }
      alert("An error occurred while deleting the organization.");
    },
    onSettled: () => {
      queryClient.invalidateQueries(["organization"]);
    },
  });

  
  const handleDelete = async () => {
    try {
      deleteOrganizationMutation.mutate(project.id, {
        onSuccess: () => {
          navigate("/app");
        },
      });
    } catch (error) {
      console.error("Failed to delete organization:", error);
      if (error.code === 403) {
        alert("You do not have permission to delete this organization.");
      } else {
        alert("You cannot delete this organization.");
      }
    }
  };

  return (
    <div className="p-10 w-auto">
      <div className="bg-white bg-opacity-50 shadow-md rounded-lg p-6">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Project Details
          </h1>
          <p className="text-lg text-gray-600">
            {isEditing
              ? "Edit your project details below"
              : "View your project details below"}
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
              <p className="mt-2 p-3 border rounded-lg bg-gray-50">
                {project.name}
              </p>
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
              <p className="mt-2 p-3 border rounded-lg bg-gray-50">
                {project.industry}
              </p>
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
              <p className="mt-2 p-3 border rounded-lg bg-gray-50">
                {project.email}
              </p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-medium">
              Description
            </label>
            {isEditing ? (
              <textarea
                className="mt-2 w-full p-3 border rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                name="description"
                value={project.description}
                onChange={handleChange}
                rows="4"
              />
            ) : (
              <p className="mt-2 p-3 border rounded-lg bg-gray-50">
                {project.description}
              </p>
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
