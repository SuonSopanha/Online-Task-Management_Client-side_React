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
import LoadingBalls from "../../utils/loading";



const TeamOverview = ({team}) => {

  const navigate = useNavigate();
  const handleChangeCreateProject = () => {
    navigate("/projectCreate");
  };

  const addMember = async (user) => {
    navigate('/team',{ state: { team_id:team.id } });
  };




  
  const {
    data: teamMember,
    isLoading: teamMemberLoading,
    error: teamMemberError,
  } = useQuery({
    queryKey: ["teamOverview_teamMember"],
    queryFn: fetchTeamMember,
  });

  
  const {
    data: teamProject,
    isLoading: teamProjectLoading,
    error: teamProjectError,
  } = useQuery({
    queryKey: ["teamOverview_teamProject"],
    queryFn: fetchTeamProject,
  });

  
  const {
    data: teamGoal,
    isLoading: teamGoalLoading,
    error: teamGoalError,
  } = useQuery({
    queryKey: ["teamOverview_teamGoal"],
    queryFn: fetchTeamGoal,
  });

  async function fetchTeamMember() {
    const response = await apiRequest("get", "api/v1/org-members?org_id[eq]=" + team.id);

    return [...response.data];
  }

  async function fetchTeamProject() {
    const response = await apiRequest("get", "api/v1/projects?organization_id[eq]=" + team.id);
    console.log(response.data,team.id)
    return [...response.data];
  }

  async function fetchTeamGoal() {
    const response = await apiRequest("get", "api/v1/goals?organization_id[eq]=" + team.id);
    return [...response.data];
  }




  if (teamMemberError || teamProjectError || teamGoalError) {
    return (
      <div>
        Error: {teamMemberError?.message || teamProjectError?.message || teamGoalError?.message}
      </div>
    );
  };



  return (
    <>
      <div class="container mx-auto flex flex-col lg:flex-row lg:space-x-4 mt-3">
        <div class="w-full lg:w-8/12 flex flex-col">
          <div className="w-full h-fit  bg-glasses backdrop-blur-12 px-4 py-2 space-y-5 rounded-xl mb-4">
            <h1 className="text-2xl font-semibold text-gray-700 pt-2">
              Member
            </h1>

            <div className="grid gap-10 row-gap-8 mx-auto sm:row-gap-10 lg:max-w-screen-lg sm:grid-cols-2 lg:grid-cols-3 pb-2">
              {teamMemberLoading? null : teamMember.map((member, index) =>
                member !== null ? (
                  <div className="flex items-center" key={index}>
                    {member.user_photo !== null ? (
                      <img
                        className="object-cover w-12 h-12 mr-4 rounded-full shadow"
                        src={member.user_photo}
                        alt="Person"
                      />
                    ) : (
                      <div className="object-cover w-12 h-12 mr-4 rounded-full shadow">
                        <UserProfilePic name={member.user_name} size={12} />
                      </div>
                    )}

                    <div className="flex flex-col justify-center">
                      <p className="text-sm text-gray-700 font-bold">
                        {member.user_name}
                      </p>
                      <p className="text-xs text-gray-500">{member.role}</p>
                      <p className="text-xs text-gray-500">{member.user_email}</p>
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

              {teamProjectLoading ? null : teamProject &&
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
        <div class="w-full lg:w-4/12 flex flex-col mt-0 mb-2 lg:mt-0">
          <div className="w-full bg-glasses backdrop-blur-12 p-4 rounded-xl text-gray-700 mb-4">
            <div className="text-2xl font-bold">About Us</div>

            <div className="p-2">
              <EditableBox init={team.description} OnChange={() => {}} />
            </div>
          </div>

          <div class="flex flex-col  bg-glasses backdrop-blur-12 p-4 rounded-xl text-gray-700 w-full h-fit ">
            <div>
              <span class="text-xs">{team.name}</span>
            </div>
            <div>
              {!teamGoalLoading && teamGoal && teamGoal.length > 0 && (
                <p className="text-xl font-bold my-1">
                  {teamGoal[0].goal_name}
                </p>
              )}
            </div>

            <div>
              <p class="text-xs">{teamGoal[0].description}</p>
              <div class="px-2 py-1 text-xs my-1 font-semibold leading-tight w-fit text-green-700 bg-green-100 rounded-lg">
                {teamGoal[0].completed ? "Completed" : "InProgress"}
              </div>
            </div>

            {!teamGoalLoading && teamGoal && teamGoal.length > 0 && (
              <div class="text-xs mb-2">
                Due Date : {teamGoal[0].due_date}
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
