import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "../../api/api";
import UserProfilePic from "../../utils/photoGenerator";
const UserProfile = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    bio: "",
    description: "",
  });

  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  async function fetchUser() {
    const response = await apiRequest("get", "api/v1/users");
    return response.data;
  }

  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      console.log("isSignIn");
    } else {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const response = apiRequest("put", "api/v1/users/" + user.id, {
        full_name: userData.username,
        email: userData.email,
      });
      if (response) {
        console.log("User updated successfully");
      }
    } catch (error) {}
  };

  const handleBack = () => {
    window.history.back();
  };

  if (userLoading) {
    return <div className="h-screen">Loading...</div>;
  }
  return (
    <section className="p-4 w-full h-screen flex justify-center items-center">
      <div className="w-full md:w-3/4 h-full bg-glasses backdrop-blur-12 rounded-lg">
        <div className="flex flex-col md:flex-row w-full h-full">
          {/* Left Side */}
          <div className="w-full md:w-1/4 h-auto md:h-full m-5">
            <div className="flex flex-col justify-start py-2 pb-3 ms-5">
              <h1 className="text-xl font-bold">Settings</h1>
              <p className="text-xs font-normal">
                Manage your account settings.
              </p>
            </div>

            <button className="flex items-center w-full h-8 px-3 mt-1 rounded hover:bg-glasses hover:backdrop-blur-sm transform transition-transform hover:scale-105">
              <span className="ml-2 text-xs font-semibold text-gray-700">
                Profile
              </span>
            </button>

            <button className="flex items-center w-full h-8 px-3 mt-1 rounded hover:bg-glasses hover:backdrop-blur-sm transform transition-transform hover:scale-105">
              <span className="ml-2 text-xs font-semibold text-gray-700">
                Account
              </span>
            </button>
          </div>

          {/* Account Right Side */}
          <div className="w-3/4 h-full p-5 bg-white rounded-lg">
            <div className="flex flex-col justify-start">
              <div className="flex flex-col justify-start py-4 border-b border-gray-500">
                <h1 className="text-xs font-bold mb-1">Account</h1>
                <p className="text-xs font-normal">
                  Update your account information.
                </p>
              </div>

              <div className="flex flex-col justify-start">
                <div className="py-2 flex justify-start items-center">
                  <div className="flex flex-col items-center space-y-2">
                    <p className="text-lg font-medium justify-start">
                      Username : {user.full_name}
                    </p>
                    <p className="text-lg font-medium justify-start">
                      Email : {user.email}
                    </p>
                    <p className="text-xs font-medium justify-start">
                      Profile picture
                    </p>
                    <div className="relative">
                      {user && user.photo_url ? (
                        <img
                          src={user.photo_url}
                          alt={user.full_name}
                          className="object-cover w-20 h-20 rounded-full"
                        />
                      ) : (
                        <UserProfilePic name={user.full_name} size={20} />
                      )}

                      <button className="absolute bottom-0 right-0 mb-2 mr-2 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700 focus:outline-none">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <form
                  className="py-2 flex flex-col justify-start"
                  onSubmit={handleSubmit}
                >
                  <div className="py-1 flex flex-col justify-start">
                    <label
                      className="text-xs font-medium mr-20 pb-2"
                      htmlFor="username"
                    >
                      Username
                    </label>
                    <input
                      className="w-3/4 h-7 px-3 border border-gray-500 rounded text-xs font-light"
                      type="text"
                      id="username"
                      value={userData.username}
                      onChange={handleInputChange}
                      placeholder={user.full_name}
                    />
                  </div>

                  <div className="py-1 flex flex-col justify-start">
                    <label
                      className="text-xs font-medium mr-20 pb-2"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className="w-3/4 h-7 px-3 border border-gray-500 rounded text-xs font-light"
                      type="email"
                      id="email"
                      value={userData.email}
                      onChange={handleInputChange}
                      placeholder={user.email}
                    />
                  </div>

                  <button
                    className="h-8 w-1/4 rounded bg-indigo-600 hover:bg-indigo-700 font-medium text-xs text-white mt-4"
                    type="submit"
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
