import React from "react";
import { useState,useEffect, useContext } from "react";

import ChatBox from "../components/chatBox";
import TeamOverview from "./teamOverview";
import TeamDashboard from "./teamDashboard";

import { getTeamByID } from "../../firebase/teamCRUD";
import { modalContext } from "../part/test";
import { apiRequest } from "../../api/api";

const mockTeam = {
  name: "Sample Team",
  description: "This is a sample team description.",
  milestone: "Sample Milestone",
  members: [
    {
      user_id: "1",
      full_name: "John Doe",
      role: "Developer",
      photoURL: "https://via.placeholder.com/150",
    },
    {
      user_id: "2",
      full_name: "Jane Smith",
      role: "Designer",
      photoURL: "https://via.placeholder.com/150",
    },
    // Add more mock team members as needed
  ],
  projects: [
    {
      project_id: "1",
      project_name: "Sample Project 1",
    },
    {
      project_id: "2",
      project_name: "Sample Project 2",
    },
    // Add more mock projects as needed
  ],
  milestones: [
    {
      milestone_name: "Sample Milestone",
      due_date: "2024-05-01", // Sample due date
    },
    // Add more mock milestones as needed
  ],
};

const TeamHeader = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [loading, setLoading] = useState(true);
  const {tabID} = useContext(modalContext);

  const [team,setTeam] = useState(mockTeam);
  const [organization, setOrganization] = useState([]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // useEffect(() => {
  //   getTeamByID(tabID).then((data) => {
  //     setTeam(data);
  //   });
  // }, [tabID]);

  useEffect(() => {

    const fetchOrganization = async () => {
      try {
        const response = await apiRequest("get", "api/v1/organizations?project_id[eq]" + tabID);
        setOrganization(response.data);
        setLoading(false);
        console.log(response);
      }catch(error) {
        console.error("Error fetching organization:", error);
      }
    };

    fetchOrganization();
    
  }, [tabID]);


  console.log(team);
  return (
    <div className="w-full h-fit bg-glasses backdrop-blur-12 rounded-lg mt-[-24px]">
      {/* Header */}
      <div className="flex flex-row justify-start border-b border-gray-500">
        <div className="flex items-center p-3 ml-1">
          <div class="relative w-12 h-12 rounded-full md:block">
            <img
              class="object-cover w-full h-full rounded-xl"
              src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
              alt=""
              loading="lazy"
            />
            <div
              class="absolute inset-0 rounded-full shadow-inner"
              aria-hidden="true"
            ></div>
          </div>
        </div>
        <div className="text-sm font-medium text-gray-500 flex flex-col justify-between">
          <h1 className="text-lg font-semibold text-gray-500 pt-3 pb-1 px-1">
            {team.name}
          </h1>
          <div>
            <ul className="flex flex-wrap -mb-px">
              <li className="me-2">
                <a
                  href="#"
                  className={`inline-block px-3 py-2 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${
                    activeTab === "Overview" ? "text-blue-600 border-blue-600" : ""
                  }`}
                  onClick={() => handleTabClick("Overview")}
                >
                  Overview
                </a>
              </li>
              <li className="me-2">
                <a
                  href="#"
                  className={`inline-block px-3  py-2 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${
                    activeTab === "Message"
                      ? "text-blue-600 border-blue-600"
                      : ""
                  }`}
                  onClick={() => handleTabClick("Message")}
                  aria-current={activeTab === "Message"}
                >
                  Message
                </a>
              </li>
              <li className="me-2">
                <a
                  href="#"
                  className={`inline-block px-3 py-2 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${
                    activeTab === "Dashboard" ? "text-blue-600 border-blue-600" : ""
                  }`}
                  onClick={() => handleTabClick("Dashboard")}
                >
                  Dashboard
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Body content */}

      {activeTab === "Overview" && <TeamOverview team={team} />}
      {activeTab === "Message" && <ChatBox team={team}/>}
      {activeTab === "Dashboard" && <TeamDashboard team={team}/>}
    </div>
  );
};

export default TeamHeader;
