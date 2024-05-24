import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import EditableBox from "./editableBox";
import { getUserByID } from "../../firebase/usersCRUD";
import { getprojecByID } from "../../firebase/projectCRUD";
import UserProfilePic from "../../utils/photoGenerator";
import { FaClipboardList, FaPlusCircle, FaPlusSquare } from "react-icons/fa";

import { apiRequest } from "../../api/api";
import { useQuery } from "@tanstack/react-query";

// const mockTeam = {
//   id: "1",
//   name: "Sample Team",
//   description: "This is a sample team description.",
//   milestone: "Sample Milestone",
//   members: [
//     {
//       user_id: "1",
//       full_name: "John Doe",
//       role: "Developer",
//       photoURL: "https://via.placeholder.com/150",
//     },
//     {
//       user_id: "2",
//       full_name: "Jane Smith",
//       role: "Designer",
//       photoURL: "https://via.placeholder.com/150",
//     },
//     // Add more mock team members as needed
//   ],
//   projects: [
//     {
//       project_id: "1",
//       project_name: "Sample Project 1",
//     },
//     {
//       project_id: "2",
//       project_name: "Sample Project 2",
//     },
//     // Add more mock projects as needed
//   ],
//   milestones: [
//     {
//       milestone_name: "Sample Milestone",
//       due_date: "2024-05-01", // Sample due date
//     },
//     // Add more mock milestones as needed
//   ],
// };



const TeamOverview = ({team}) => {
  // const [teamDesciption, setTeamDescription] = useState(mockTeam.description);
  // const [teamMilestone, setTeamMilestone] = useState(mockTeam.milestone);
  // const [teamName, setTeamName] = useState(mockTeam.name);

  // const [teamMembers, setTeamMembers] = useState([]);
  // const [teamProjects, setTeamProjects] = useState([]);
  // const [teamGoal, setTeamGoal] = useState([]);
  // const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const handleChangeCreateProject = () => {
    navigate("/projectCreate");
  };

  const addMember = async (user) => {
    navigate('/team',{ state: { team_id:mockTeam.id } });
  };


  //fecth member by team.id url : api/v1/org-members?org_id[eq]=team.id
  //fetch project by team.id url : api/v1/project?organization_id[eq]=team.id
  //fetch goal by team.id url : api/v1/goal?organization_id[eq]=team.id

  
  const {
    data: teamMember,
    isLoading: teamMemberLoading,
    error: teamMemberError,
  } = useQuery({
    queryKey: ["teamOverview_teamMember"],
    queryFn: fetchTeamMember(team.id),
  });

  
  const {
    data: teamProject,
    isLoading: teamProjectLoading,
    error: teamProjectError,
  } = useQuery({
    queryKey: ["teamOverview_teamProject"],
    queryFn: fetchTeamProject(team.id),
  });

  
  const {
    data: teamGoal,
    isLoading: teamGoalLoading,
    error: teamGoalError,
  } = useQuery({
    queryKey: ["teamOverview_teamGoal"],
    queryFn: fetchTeamGoal(team.id),
  });

  async function fetchTeamMember(teamID) {
    const response = await apiRequest("get", "api/v1/org-members?org_id[eq]=" + teamID);
    return response.data;
  }

  async function fetchTeamProject(teamID) {
    const response = await apiRequest("get", "api/v1/projects?organization_id[eq]=" + teamID);
    return response.data;
  }

  async function fetchTeamGoal(teamID) {
    const response = await apiRequest("get", "api/v1/goals?organization_id[eq]=" + teamID);
    return response.data;
  }

  if (teamMemberLoading || teamProjectLoading || teamGoalLoading) {
    return (
      <div className="flex justify-center items-center h-72">
        <LoadingBalls />
      </div>
    );
  }

  if (teamMemberError || teamProjectError || teamGoalError)
    return <div>Error: {teamMemberError || teamProjectError || teamGoalError}</div>;


  // useEffect (() => {

  //   const fetchMember = async () => {
  //     try {
  //       const response = await apiRequest("get", "api/v1/org-members?org_id[eq]=" + team.id);
  //       setTeamMembers(response.data);
  //       setLoading(false);
  //       console.log(response);
  //     }catch(error) {
  //       console.error("Error fetching team members:", error);
  //     }
  //   }

  //   const fetchProject = async () => {
  //     try {
  //       const response = await apiRequest("get", "api/v1/projects?organization_id[eq]=" + team.id);
  //       setTeamProjects(response.data);
  //       setLoading(false);
  //       console.log(response);
  //     }catch(error) {
  //       console.error("Error fetching team projects:", error);
  //     }
  //   }

  //   const fetchGoal = async () => {
  //     try {
  //       const response = await apiRequest("get", "api/v1/goals?organization_id[eq]=" + team.id);
  //       setTeamGoal(response.data);
  //       setLoading(false);
  //       console.log(response);
  //     }catch(error) {
  //       console.error("Error fetching team goal:", error);
  //     }
  //   }

  //   fetchMember();

  //   fetchProject();

  //   fetchGoal();
    
  // }, [team.id])


  return (
    <>
      <div class="container mx-auto flex flex-col lg:flex-row lg:space-x-4 mt-3">
        <div class="w-full lg:w-8/12 flex flex-col">
          <div className="w-full h-fit  bg-glasses backdrop-blur-12 px-4 py-2 space-y-5 rounded-xl mb-4">
            <h1 className="text-2xl font-semibold text-gray-700 pt-2">
              Member
              {console.log(team)}
            </h1>

            <div className="grid gap-10 row-gap-8 mx-auto sm:row-gap-10 lg:max-w-screen-lg sm:grid-cols-2 lg:grid-cols-3 pb-2">
              {teamMember.map((member, index) =>
                member !== null ? (
                  <div className="flex items-center" key={index}>
                    {member.photoURL !== null ? (
                      <img
                        className="object-cover w-12 h-12 mr-4 rounded-full shadow"
                        src={member.photoURL}
                        alt="Person"
                      />
                    ) : (
                      <div className="object-cover w-12 h-12 mr-4 rounded-full shadow">
                        <UserProfilePic name={member.full_name} size={12} />
                      </div>
                    )}

                    <div className="flex flex-col justify-center">
                      <p className="text-sm text-gray-700 font-bold">
                        {member.full_name}
                      </p>
                      <p className="text-xs text-gray-500">{member.role}</p>
                    </div>
                  </div>
                ) : null
              )}
              <button className="flex items-center" onClick={addMember}>
                <div className="object-cover w-12 h-12 mr-4 rounded-full shadow flex items-center justify-center">
                  <FaPlusCircle className="w-full h-full text-gray-400"></FaPlusCircle>
                </div>

                <div className="flex flex-col justify-center">
                  <p className="text-sm text-gray-700 font-bold">Add member</p>
                </div>
              </button>
            </div>
          </div>

          <div className="w-full h-fit bg-glasses backdrop-blur-12 px-4 py-2 space-y-5 rounded-xl mb-4">
            <h1 className="text-2xl font-semibold text-gray-700 pt-2">
              Project
            </h1>

            <ul className="flex flex-col space-y-4 ">
              <li>
                <div class="flex items-center text-sm border-b border-gray-900 px-1 pb-2 transition-transform duration-300 transform hover:scale-105">
                  <div class="relative w-10 h-10 mr-3 rounded-full md:block flex items-center justify-center text-sky-400">
                    <FaPlusSquare className="w-full h-full"></FaPlusSquare>
                    <div
                      class="absolute inset-0 rounded-full shadow-inner"
                      aria-hidden="true"
                    ></div>
                  </div>
                  <button onClick={handleChangeCreateProject}>
                    <p class="font-semibold text-gray-700 ">Add Project</p>
                  </button>
                </div>
              </li>

              {teamProject &&
                teamProject.map((project) => (
                  <li className="flex flex-row justify-between border-b border-gray-700 w-full items-center">
                    <div class="flex items-center text-sm  px-1 pb-2 transition-transform duration-300 transform hover:scale-105">
                      <div class="relative w-10 h-10 mr-3 rounded-full md:block">
                        <button className="object-cover w-full h-full rounded-lg flex flex-row items-center justify-center bg-sky-300">
                          <FaClipboardList className="text-white w-6 h-6" />
                        </button>
                        <div
                          class="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        ></div>
                      </div>
                      <div>
                        <p class="font-semibold text-gray-700">
                          {project.project_name}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        {console.log(teamProject)}
        <div class="w-full lg:w-4/12 flex flex-col mt-0 mb-2 lg:mt-0">
          <div className="w-full bg-glasses backdrop-blur-12 p-4 rounded-xl text-gray-700 mb-4">
            <div className="text-2xl font-bold">About Us</div>

            <div className="p-2">
              <EditableBox init={teamDesciption} OnChange={() => {}} />
            </div>
          </div>

          <div class="flex flex-col  bg-glasses backdrop-blur-12 p-4 rounded-xl text-gray-700 w-full h-fit ">
            <div>
              <span class="text-xs">{team.name}</span>
            </div>
            <div>
              {team && team.milestones && team.milestones.length > 0 && (
                <p className="text-xl font-bold my-1">
                  {team.milestones[0].milestone_name}
                </p>
              )}
            </div>

            <div>
              <p class="text-xs">How to be cool and Make them good</p>
              <div class="px-2 py-1 text-xs my-1 font-semibold leading-tight w-fit text-green-700 bg-green-100 rounded-lg">
                Acceptable
              </div>
            </div>

            {team && team.milestones && team.milestones.length > 0 && (
              <div class="text-xs mb-2">
                Due Date : {team.milestones[0].due_date}
              </div>
            )}

            <div class="w-full bg-gray-400 p-0">
              <div class="w-[50%] bg-blue-500 h-1"></div>
            </div>
          </div>


        </div>
      </div>
    </>
  );
};

export default TeamOverview;
