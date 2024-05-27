import React from "react";

const UserProfile = () => {
  const handleBack = () => {
    //go back to previous page
    window.history.back();
    // Add functionality to go back to the previous page
    // You can use history.goBack() or any routing library method
  };

  return (
    <section className="p-4 w-full h-auto flex justify-center items-center">
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

          {/* Profile Right Side */}
          {/* <div className="w-3/4 h-full p-5 bg-white rounded-lg">
            <div className="flex flex-col justify-start">
              <h1 className=" flex text-xs font-bold border-b border-gray-500 py-4">
                Profile Details
              </h1>

              <div className="border-b border-gray-500 py-3 flex flex-row justify-between items-center">
                <p className="text-xs font-medium">Profile</p>
                <div className="flex items-center space-x-4">
                  <img
                    className="inline-flex object-cover border-4 border-indigo-600 rounded-full w-20 h-20"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwyfHxoZWFkc2hvdHxlbnwwfDB8fHwxNjk1ODE3MjEzfDA&ixlib=rb-4.0.3&q=80&w=1080"
                    alt="User Profile Picture"
                  />
                  <p className="text-xs font-medium">jaiidon dask</p>
                </div>
                <button className="flex justify-center items-center w-1/6 h-8 me-2 rounded hover:bg-glasses hover:backdrop-blur-sm transform transition-transform hover:scale-105">
                  <span class="ml-2 text-xs font-medium text-gray-700">
                    Edit profile
                  </span>
                </button>
              </div>

              <div className="border-b border-gray-500 py-3 flex flex-row justify-start">
                <p className="text-xs font-medium py-3 mr-20">Email Address</p>
                <p className="text-xs font-normal py-3 ps-2">jaiidon@gmail.com</p> 
              </div>

              <div className="border-b border-gray-500 py-3 flex flex-row justify-start">
                <p className="text-xs font-medium py-3 mr-36">Bio</p>
                <p className="text-xs font-normal py-3">If you are going through hell, keep going.</p> 
              </div>
              
              <div className="py-3 flex flex-row justify-start">
                <p className="text-xs font-medium py-3 mr-24">Description</p>
                <p className="text-xs font-normal py-3 text-justify me-4">A quotation is the repetition of a sentence, phrase, or passage from speech or text that someone has said or written. In oral speech, it is the representation of an utterance that is introduced by a quotative marker, such as a verb of saying.</p> 
              </div>
            </div>
          </div> */}

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
                  <div className="flex  flex-col items-center space-y-2">
                    <p className="text-xs font-medium justify-start">
                      Profile picture
                    </p>
                    <div className="relative">
                      <img
                        className="inline-flex object-cover border-4 border-indigo-600 rounded-full w-20 h-20"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwyfHxoZWFkc2hvdHxlbnwwfDB8fHwxNjk1ODE3MjEzfDA&ixlib=rb-4.0.3&q=80&w=1080" // Replace with your image URL
                        alt="Profile"
                      />
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

                <form className="py-2 flex flex-col justify-start">
                  <div className="py-1 flex flex-col justify-start">
                    <label
                      className="text-xs font-medium mr-20 pb-2"
                      for="username"
                    >
                      Username
                    </label>
                    <input
                      className="w-3/4 h-7 px-3 border border-gray-500 rounded text-xs font-light"
                      type="text"
                      id="username"
                      placeholder="Username"
                    />
                  </div>

                  <div className="py-1 flex flex-col justify-start">
                    <label
                      className="text-xs font-medium mr-20 pb-2"
                      for="email"
                    >
                      Email
                    </label>
                    <input
                      className="w-3/4 h-7 px-3 border border-gray-500 rounded text-xs font-light"
                      type="email"
                      id="email"
                      placeholder="example@gmail.com"
                    />
                  </div>

                  <div className="py-1 flex flex-col justify-start">
                    <label className="text-xs font-medium mr-20 pb-2" for="bio">
                      Bio
                    </label>
                    <textarea
                      className="block px-3 p-1.5 w-3/4 h-8 border border-gray-500 rounded text-xs font-light"
                      type="text"
                      id="bio"
                      placeholder="whatever you want to write"
                    />
                  </div>

                  <div className="py-1 flex flex-col justify-start">
                    <label
                      className="text-xs font-medium mr-20 pb-2"
                      for="description"
                    >
                      Description
                    </label>
                    <textarea
                      className="block px-3 p-1.5 w-3/4 h-15 border border-gray-500 rounded text-xs font-light"
                      type="text"
                      id="description"
                      placeholder="description"
                    />
                  </div>
                </form>
                <button
                  className="h-8 w-1/4 rounded bg-indigo-600 hover:bg-indigo-700 font-medium text-xs text-white"
                  type="submit"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
