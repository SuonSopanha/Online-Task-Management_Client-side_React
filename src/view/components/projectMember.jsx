import React, { useState, useEffect, useContext } from "react";
import { getUserByID } from "../../firebase/usersCRUD";
import { getprojecByID } from "../../firebase/projectCRUD";
import UserProfilePic from "../../utils/photoGenerator";
import { FaClipboardList, FaPlusCircle, FaPlusSquare } from "react-icons/fa";
import { modalContext } from "../part/test";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../../api/api";
import { useQuery } from "@tanstack/react-query";
import LoadingBalls from "../../utils/loading";

const ProjectMember = () => {
  // const [teamMembers, setTeamMembers] = useState([]);
  // const [teamProjects, setTeamProjects] = useState([]);
  const { tabID } = useContext(modalContext);
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(true);

  const addMember = async (user) => {
    navigate("/team", { state: { project_id: tabID } });
  };

  const {
    data: teamMembers,
    isLoading: teamMembersLoading,
    error: teamMembersError,
  } = useQuery({
    queryKey: ["projectMember_teamMembers"],
    queryFn: fetchTeamProjects,
  });



  async function fetchTeamProjects() {
    const response = await apiRequest(
      "get",
      "api/v1/project-members-by-project-id/" + tabID
    );
    return response.data;
  }

  if (teamMembersLoading) {
    return (
      <div className="flex justify-center items-center h-72">
        <LoadingBalls />
      </div>
    );
  }


  return (
    <>
      <div class="container mx-auto flex flex-col lg:flex-row lg:space-x-4 mt-3">
        <div class="flex flex-col mx-4">
          <div className="w-full h-fit  bg-glasses backdrop-blur-12 px-4 py-2 space-y-5 rounded-xl mb-4">
            <h1 className="text-2xl font-semibold text-gray-700 pt-2">
              Member
            </h1>
            <div className="grid gap-10 row-gap-8 mx-auto sm:row-gap-10 lg:max-w-screen-lg sm:grid-cols-2 lg:grid-cols-3 pb-2">
              {teamMembers.map((member, index) =>
                member !== null ? (
                  <div className="flex items-center" key={index}>
                    {member.photo_url !== null ? (
                      <img
                        className="object-cover w-12 h-12 mr-4 rounded-full shadow"
                        src={member.photo_url}
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
                      <p className="text-xs font-semibold text-gray-500">{member.role}</p>
                      <p className="text-xs text-gray-500">{member.email}</p>
                    </div>
                  </div>
                ) : null
              )}
              <button onClick={addMember} className="flex items-center">
                <div className="object-cover w-12 h-12 mr-4 rounded-full shadow flex items-center justify-center">
                  <FaPlusCircle className="w-full h-full text-gray-400"></FaPlusCircle>
                </div>

                <div className="flex flex-col justify-center">
                  <p className="text-sm text-gray-700 font-bold">Add member</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectMember;
