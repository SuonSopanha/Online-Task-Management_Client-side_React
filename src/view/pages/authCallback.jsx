import React from "react";
import { useEffect } from "react";

const AuthCallback = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      // Store token in local storage or context for future authenticated requests
      localStorage.setItem("token", token);

      // Fetch user info with token
      window.location.href = "/";
    }
  }, []);

  return (
    <>
      <div>signup with google auth ....</div>
      <div>pleas wait</div>
    </>
  );
};

export default AuthCallback;
