import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../../api/api";

const ProjectCreate = () => {
  const [projectName, setProjectName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [projectStatus, setProjectStatus] = useState("Not Started");
  const [projectPriority, setProjectPriority] = useState("Low");
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleContinue = async () => {
    if (projectName.trim() === "") {
      alert("Please enter a project name.");
      return;
    }

    setLoading(true); // Set loading to true when request starts

    try {
      // Create the project or perform any further actions
      const project = await apiRequest("post", "api/v1/projects", {
        project_name: projectName,
        start_date: startDate,
        end_date: endDate,
        project_status: projectStatus,
        project_priority: projectPriority,
      });

      await apiRequest("post", "api/v1/project-members", {
        project_id: project.data.id,
        role: "Project Owner",
      });

      console.log(project);
      navigate("/team", { state: { project_id: project.data.id } });
    } catch (error) {
      console.error("Failed to create project", error);
      // Handle error appropriately here
    } finally {
      setLoading(false); // Set loading to false when request ends
    }
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

export default ProjectCreate;
