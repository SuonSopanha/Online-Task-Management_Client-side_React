import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    // Show loading indicator
    setLoading(true);

    try {
      // Your password reset logic goes here
      // For example, you can send a request to your backend API
      // and handle the response accordingly
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      // Handle success response
      if (response.ok) {
        setMessage(data.message);
      } else {
        // Handle error response
        setMessage(data.error);
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setMessage("An error occurred while resetting your password. Please try again later.");
    } finally {
      // Hide loading indicator
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen p-16 w-full bg-gradient-to-r from-[#65A0FD] via-[#E8CCCC] to-[#FFA9F1B5]">
      <div className="bg-glasses bg-opacity-50 p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>
        <input
          type="email"
          className="w-full px-4 py-2 mb-4 rounded-md"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          onClick={handleResetPassword}
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
        {message && <p className="text-red-500 mt-2">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
