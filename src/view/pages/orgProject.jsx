import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { apiRequest } from "../../api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const OrgProject = () => {
  const [projectName, setProjectName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [projectStatus, setProjectStatus] = useState("Not Started");
  const [projectPriority, setProjectPriority] = useState("Low");
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { org_id } = state;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newProject) => {
      const response = await apiRequest("post", "api/v1/projects", newProject);
      if (!response || !response.data) {
        throw new Error("Invalid response data");
      }
      return response.data;
    },
    onMutate: async (newProject) => {
      setLoading(true);

      await queryClient.cancelQueries(["teamOverview_teamProject", org_id]);
      await queryClient.cancelQueries(["project"]);

      const previousProjects = queryClient.getQueryData(["teamOverview_teamProject", org_id]);


      queryClient.setQueryData(["teamOverview_teamProject", org_id], (old) => {
        if (!old) {
          return [newProject];
        }
        return [...old, newProject];
      });


      queryClient.setQueryData(["project"], (old) => {
        if (!old) {
          return [newProject];
        }
        return [...old, newProject];
      });

      return { previousProjects };
    },
    onError: (err, newProject, context) => {
      console.error("Error occurred:", err);
      if (context.previousProjects) {
        queryClient.setQueryData(["teamOverview_teamProject", org_id], context.previousProjects);
        queryClient.setQueryData(["project"], context.previousProjects);
      }

      alert("Error occurred while creating the project");
      setLoading(false);
    },
    onSuccess: async (data, newProject) => {
      await apiRequest("post", "api/v1/project-members", {
        project_id: data.id,
        role: "Project Owner",
      });
      navigate("/team", { state: { project_id: data.id } });
    },
    onSettled: () => {
      queryClient.invalidateQueries(["teamOverview_teamProject", org_id]);
      queryClient.invalidateQueries(["project"]);
      setLoading(false);
    },
  });

  const handleContinue = () => {
    if (projectName.trim() === "") {
      alert("Please enter a project name.");
      return;
    }

    const newProject = {
      organization_id: org_id,
      project_name: projectName,
      start_date: startDate,
      end_date: endDate,
      project_status: projectStatus,
      project_priority: projectPriority,
    };

    mutation.mutate(newProject);
  };

  return (
    <div className="p-10 w-auto h-screen">
      <div>
        <p className="mb-4 text-3xl font-medium">What's your project Name?</p>
      </div>
      <div className="mt-2">
        <p className="font-medium">Name for your project.</p>
      </div>
      <div className="mt-2">
        <input
          className="focus:shadow-outline focus:border-blue-300 mt-2 w-96 appearance-none rounded-xl border-2 px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none font-medium"
          type="text"
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
      </div>
      <div className="mt-2 flex space-x-4">
        <div>
          <p className="font-medium">Start Date</p>
          <input
            className="focus:shadow-outline focus:border-blue-300 mt-2 w-full appearance-none rounded-xl border-2 px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none font-medium"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <p className="font-medium">End Date</p>
          <input
            className="focus:shadow-outline focus:border-blue-300 mt-4 w-full appearance-none rounded-xl border-2 px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none font-medium"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-2 flex space-x-4">
        <div>
          <p className="font-medium">Project Status</p>
          <select
            className="focus:shadow-outline focus:border-blue-300 mt-2 w-full appearance-none rounded-xl border-2 px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none font-medium"
            value={projectStatus}
            onChange={(e) => setProjectStatus(e.target.value)}
          >
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div>
          <p className="font-medium">Project Priority</p>
          <select
            className="focus:shadow-outline focus:border-blue-300 mt-2 w-full appearance-none rounded-xl border-2 px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none font-medium"
            value={projectPriority}
            onChange={(e) => setProjectPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>
      <button
        className={`mt-8 h-10 w-28 rounded-xl font-medium text-white ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-700"}`}
        onClick={handleContinue}
        disabled={loading} // Disable the button when loading
      >
        {loading ? "Loading..." : "Continue"}
      </button>
    </div>
  );
};

export default OrgProject;
