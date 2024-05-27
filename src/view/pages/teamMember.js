import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { getUserByEmail } from "../../firebase/usersCRUD";
import { useLocation } from "react-router-dom";
// import { updateByPushNewMembers } from "../../firebase/projectCRUD";
import { apiRequest } from "../../api/api";

const TeamMember = () => {
  const [members, setMembers] = useState([{ email: "", role: "" }]);
  const navigate = useNavigate();
  
  const location = useLocation();
  const { state } = location;
  const { org_id } = state;

  const addInputRow = () => {
    setMembers([...members, { email: "", role: "" }]);
  };

  const handleMemberChange = (index, field, value) => {
    const newMembers = [...members];
    newMembers[index][field] = value;
    setMembers(newMembers);
  };

  const handleContinue = async () => {
    // Filter out empty emails
    const nonEmptyMembers = members.filter(
      (member) => member.email.trim() !== ""
    );

    // Use getUserByEmail for each non-empty email to get user ID
    const userIds = await Promise.all(
      nonEmptyMembers.map(async (member) => {
        // const user = await getUserByEmail(member.email);
        return member ? { email: member.email, role: member.role } : null;
      })
    );

    // Filter out null values (for emails that didn't match any user)
    const validMembers = userIds.filter((userId) => userId !== null);

    // Find invalid user IDs and corresponding emails
    const invalidUsers = nonEmptyMembers
      .map((member, index) =>
        userIds[index] === null ? member.email : null
      )
      .filter(Boolean);

    if (invalidUsers.length > 0) {
      // Alert the user about invalid emails
      alert(`Invalid emails: ${invalidUsers.join(", ")}`);
    } else {
      console.log(validMembers);
      console.log(org_id);
      // await updateByPushNewMembers(team_id, validMembers);
      try {
        const request = await apiRequest("post", "api/v1/add-organizations-members", {
          org_id: org_id,
          members: validMembers,
        });
        console.log(request);
        navigate("/app");
      } catch (error) {
        console.error('Failed to add org members:', error);
      }

      // Navigate to the next page or perform any other logic
      navigate("/app");
    }
  };

  return (
    <>
      <div className="p-10 h-screen">
        <div>
          <p className="mb-4 text-3xl font-medium">
            Invite a organizations member to try PAS together
          </p>
          <p>You can start small by inviting a trusted organizations member to</p>
          <p>learn how PAS works with you.</p>
        </div>

        <div className="mt-2">
          <p className="font-medium">Email Address & Role</p>
          {members.map((member, index) => (
            <div key={index} className="flex space-x-4 mt-2">
              <input
                className="focus:shadow-outline focus:border-blue-300 w-64 appearance-none rounded-xl border-2 px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none font-medium"
                type="text"
                placeholder="Teammate's email"
                value={member.email}
                onChange={(e) =>
                  handleMemberChange(index, "email", e.target.value)
                }
              />
              <input
                className="focus:shadow-outline focus:border-blue-300 w-64 appearance-none rounded-xl border-2 px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none font-medium"
                type="text"
                placeholder="Role"
                value={member.role}
                onChange={(e) =>
                  handleMemberChange(index, "role", e.target.value)
                }
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
    </>
  );
};

export default TeamMember;
