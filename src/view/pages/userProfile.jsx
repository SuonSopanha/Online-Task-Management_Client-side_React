import React from "react";

const UserProfile = () => {

  const handleBack = () => {
    //go back to previous page
    window.history.back();
    // Add functionality to go back to the previous page
    // You can use history.goBack() or any routing library method
  };

  return (
    <section className="p-4 w-full h-screen">
      <div className="w-full md:w-1/2 md:mx-auto flex flex-col md:flex-row items-center justify-center text-center">
        <img
          className="inline-flex object-cover border-4 border-indigo-600 rounded-full shadow-[5px_5px_0_0_rgba(0,0,0,1)] shadow-indigo-600/100 bg-indigo-50 h-24 w-24 md:h-32 md:w-32 mb-4 md:mb-0 ml-0 md:mr-5"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwyfHxoZWFkc2hvdHxlbnwwfDB8fHwxNjk1ODE3MjEzfDA&ixlib=rb-4.0.3&q=80&w=1080"
          alt="User Profile Picture"
        />
        <div className="flex flex-col">
          <div className="md:text-justify mb-3">
            <div className="flex flex-col mb-5">
              <p className="text-indigo-900 font-bold text-xl">John Doe</p>


            </div>

            <p className="text-black font-semibold text-center md:text-left">
              jondoe@gmail.com
            </p>

            <h2 className="text-black font-semibold text-center text-lg md:text-left mt-4">
              Organization
            </h2>
            <p className="text-black font-semibold text-center md:text-left">
              Insurance Specialist | Protecting Lives and Assets | Dedicated to
              Your Peace of Mind Manager
            </p>

            <h2 className="text-black font-semibold text-center text-lg md:text-left mt-4">
              Project
            </h2>
            <p className="text-black font-semibold text-center md:text-left">
              Insurance Specialist | Protecting Lives and Assets | Dedicated to
              Your Peace of Mind Manager
            </p>
          </div>

          <button
            onClick={handleBack}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none"
          >
            Back
          </button>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
