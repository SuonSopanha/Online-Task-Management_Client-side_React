import React, { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { apiRequest } from "../../api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const TeamMember = () => {
  const [members, setMembers] = useState([{ email: "", role: "" }]);
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { org_id } = state;
  const queryClient = useQueryClient();

  const [isContinue, setIsContinue] = useState(false);
  const token = sessionStorage.getItem('token');


  useEffect(() => {
    if (token) {
      console.log("isSignIn");

    } else {
      navigate("/login");
    }
      
  }, [token]);


  const addInputRow = () => {
    setMembers([...members, { email: "", role: "" }]);
  };

  const handleMemberChange = (index, field, value) => {
    const newMembers = [...members];
    newMembers[index][field] = value;
    setMembers(newMembers);
  };

  const handleSkip = () => {
    navigate("/app");
  };

  const mutation = useMutation({
    mutationFn: async (validMembers) => {
      const response = await apiRequest("post", "api/v1/add-organizations-members", {
        org_id: org_id,
        members: validMembers,
      });
      if (!response || !response.results) {
        throw new Error("Invalid response data");
      }
      return response.data;
    },
    onMutate: async (validMembers) => {
      await queryClient.cancelQueries(["teamOverview_teamMember", org_id]);

      const previousMembers = queryClient.getQueryData(["teamOverview_teamMember", org_id]);

      queryClient.setQueryData(["teamOverview_teamMember", org_id], (old) => {
        if (!old) {
          return validMembers;
        }
        return [...old, ...validMembers];
      });

      return { previousMembers };
    },
    onError: (err, validMembers, context) => {
      console.error("Error occurred:", err);
      if (context.previousMembers) {
        queryClient.setQueryData(
          ["teamOverview_teamMember", org_id],
          context.previousMembers
        );
      }

      alert("Error occurred while adding organization members");
    },
    onSettled: () => {
      queryClient.invalidateQueries(["teamOverview_teamMember", org_id]);
      navigate("/app");
    },
  });

  const handleContinue = async () => {
    setIsContinue(true);
    const nonEmptyMembers = members.filter(
      (member) => member.email.trim() !== ""
    );

    const validMembers = nonEmptyMembers.map((member) => ({
      email: member.email,
      role: member.role,
    }));

    mutation.mutate(validMembers);

    setIsContinue(false);
  };

  return (
    <>
      <div className="p-10 h-screen">
        <div>
          <p className="mb-4 text-3xl font-medium">
            Invite an organization's member to try PAS together
          </p>
          <p>You can start small by inviting a trusted organization member to</p>
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
          {isContinue ? "Loading..." : "Continue"}
        </button>
        <button
          className="mt-4 h-10 w-28 rounded-xl bg-blue-700 text-white font-medium"
          onClick={handleSkip}
        >
          Skip
        </button>
      </div>
    </>
  );
};

export default TeamMember;
