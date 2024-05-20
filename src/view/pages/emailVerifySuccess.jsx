import React from "react";
import { useNavigate } from "react-router-dom";

const EmailVerifySuccess = () => {
  const navigate = useNavigate();

  const handleContinueClick = () => {
    // Navigate to the /app route
    
    navigate("/app");
  };

  return (
    <div className="flex items-center flex-col h-screen p-16 w-full bg-gradient-to-r from-[#65A0FD] via-[#E8CCCC] to-[#FFA9F1B5]">
      <div className="bg-glasses bg-opacity-50 p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold text-center text-green-600 mb-4">
          Email Verified Successfully!
        </h2>
        <p className="text-lg text-center text-gray-700 mb-6">
          Thank you for verifying your email address.
        </p>
        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md focus:outline-none focus:ring focus:ring-blue-400"
            onClick={handleContinueClick}
          >
            Continue to App
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerifySuccess;
