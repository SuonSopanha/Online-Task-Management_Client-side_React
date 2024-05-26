import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserByEmail } from "../../firebase/usersCRUD";
import { useLocation } from "react-router-dom";
// import { updateByPushNewMembers } from "../../firebase/projectCRUD";
import {apiRequest} from '../../api/api';

const Teamates = () => {
  const [members, setMembers] = useState([{ email: "", role: "" }]);
  const location = useLocation();
  const { state } = location;
  const { project_id } = state;

  const navigate = useNavigate();

  const addInputRow = () => {
    setMembers([...members, { email: "", role: "" }]);
  };

  const handleEmailChange = (index, value) => {
    const newMembers = [...members];
    newMembers[index].email = value;
    setMembers(newMembers);
  };

  const handleRoleChange = (index, value) => {
    const newMembers = [...members];
    newMembers[index].role = value;
    setMembers(newMembers);
  };

  const handleContinue = async () => {
    const nonEmptyMembers = members.filter((member) => member.email.trim() !== '');

    const userIds = await Promise.all(
      nonEmptyMembers.map(async (member) => {
        // const user = await getUserByEmail(member.email);
        return member ? { email: member.email, role: member.role } : null;
      })
    );

    const validMembers = userIds.filter((user) => user !== null);
    const invalidUsers = nonEmptyMembers
      .map((member, index) => (userIds[index] === null ? member.email : null))
      .filter(Boolean);

    if (invalidUsers.length > 0) {
      alert(`Invalid emails: ${invalidUsers.join(', ')}`);
    } else {
      console.log(project_id);
      // // await updateByPushNewMembers(project_id, validMembers);
      try {
        const request = await apiRequest("post", "api/v1/add-project-members", {
          project_id: project_id,
          members: validMembers
        });
        console.log(request);
        navigate("/app");
      } catch (error) {
        console.error('Failed to add project members:', error);
      }
    }
  };


  return (
    <div className="p-10 h-screen">
      <div>
        <p className="mb-4 text-3xl font-medium">
          Invite a teammate to try PAS together
        </p>
        <p>You can start small by inviting a trusted teammate to</p>
        <p>learn how PAS works with you.</p>
      </div>
      <div className="mt-2">
        <p className="font-medium">Email Address</p>
        {members.map((member, index) => (
          <div key={index} className="flex space-x-4 mt-1">
            <input
              className="focus:shadow-outline focus:border-blue-300 w-64 appearance-none rounded-xl border-2 px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none font-medium"
              type="text"
              placeholder="Teammate's email"
              value={member.email}
              onChange={(e) => handleEmailChange(index, e.target.value)}
            />
            <input
              className="focus:shadow-outline focus:border-blue-300 w-64 appearance-none rounded-xl border-2 px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none font-medium"
              type="text"
              placeholder="Role"
              value={member.role}
              onChange={(e) => handleRoleChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>
      <button
        className="mt-4 h-10 w-28 mr-2 rounded-xl bg-blue-700 text-white font-medium"
        onClick={addInputRow}
      >
        Add More
      </button>
      <button
        className="mt-4 h-10 w-28 rounded-xl bg-blue-700 text-white font-medium"
        onClick={handleContinue}
      >
        Continue
      </button>
    </div>
  );
};

export default Teamates;
