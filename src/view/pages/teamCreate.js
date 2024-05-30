import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../../api/api";

const TeamCreate = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [industry, setIndustry] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleContinue = async () => {
    // Add any validation logic here before creating the project
    if (name.trim() === "") {
      alert("Please enter a project name.");
      return;
    }

    setLoading(true); // Set loading to true when request starts

    try {
      // Create the project or perform any further actions
      const org = await apiRequest("post", "api/v1/organizations", {
        name: name,
        description: description,
        industry: industry,
        email: email,
      });

      // Add owner as member
      await apiRequest("post", "api/v1/org-members", {
        org_id: org.data.id,
        role: "Project Owner",
      });

      console.log(org);
      navigate("/teamMember", { state: { project_id: org.data.id } });
    } catch (error) {
      console.error("Failed to create organization", error);
      // Handle error appropriately here
    } finally {
      setLoading(false); // Set loading to false when request ends
    }
  };

  return (
    <div className="p-10 w-auto h-screen">
      <div>
        <p className="mb-4 text-3xl font-medium">What's your Team Name?</p>
      </div>
      <div className="mt-5">
        <p className="font-medium">Name for your Team.</p>
      </div>
      <div className="mt-4">
        <input
          className="focus:shadow-outline focus:border-blue-300 w-96 appearance-none rounded-xl border-2 px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none font-medium"
          type="text"
          placeholder="Team Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-4">
        <p className="font-medium">Description</p>
        <textarea
          className="focus:shadow-outline focus:border-blue-300 w-96 appearance-none rounded-xl border-2 px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none font-medium"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mt-4">
        <p className="font-medium">Industry</p>
        <input
          className="focus:shadow-outline focus:border-blue-300 w-96 appearance-none rounded-xl border-2 px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none font-medium"
          type="text"
          placeholder="Industry"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
        />
      </div>
      <div className="mt-4">
        <p className="font-medium">Email</p>
        <input
          className="focus:shadow-outline focus:border-blue-300 w-96 appearance-none rounded-xl border-2 px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none font-medium"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
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

export default TeamCreate;
