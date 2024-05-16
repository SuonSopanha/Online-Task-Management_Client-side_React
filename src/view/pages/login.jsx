// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Cookies from 'js-cookie';
// import axios from "axios";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoggingIn, setIsLoggingIn] = useState(false); // State to track login process
//   const navigate = useNavigate();

//   const onLogin = async (e) => {
//     e.preventDefault();
//     try {
//       setIsLoggingIn(true); // Set isLoggingIn to true when starting the login process
//       await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
//         withCredentials: true,
//       });

//       const xsrfToken = Cookies.get("XSRF-TOKEN");
//       const response = await axios.post(
//         "http://localhost:8000/login",
//         {
//           email,
//           password,
//         },
//         {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "application/json",
//             "X-XSRF-TOKEN": xsrfToken,
//           },
//         }
//       );
      
//       //check if login success or not
//       console.log("Login successful:", response.data);
//       // if (response.data.full_name) {
//       //   navigate("/app");
//       // } else {
//       //   navigate("/welcome");
//       // }
//     } catch (error) {
//       console.error("Login error:", error);
//     } finally {
//       setIsLoggingIn(false); // Set isLoggingIn to false when the login process finishes
//     }
//   };

import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {auth} from "../../firebase/config";
import { getUserByID } from "../../firebase/usersCRUD";

import { userSignin, providerLogin } from "../../firebase/appAuth";



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const navigate = useNavigate();

   const onlogin = async (e) =>{
    e.preventDefault();
    
    await userSignin(email,password);
    const user = await getUserByID(auth.currentUser.uid)


    if(user.full_name){
      navigate('/app')
    }else{
      navigate('/welcome')
    }

  }

const googleLogin = async (e) =>{
  e.preventDefault();
  await providerLogin();
  navigate('/app')

  
}

  return (
    <div class="max-w-[280px] mx-auto h-screen">
      <div class="flex flex-col items-center pt-10">
        <h2 class="mb-5 text-gray-900 font-mono font-bold text-xl">Login</h2>
        <button
          disabled={isLoggingIn} // Disable the button when in the login process
          class="flex items-center mb-2 justify-center transition ease-in-out delay-50 px-3 py-2.5 space-x-2 bg-white border border-slate-600 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 focus:ring-opacity-50"
          onClick={googleLogin}
        >
          <svg
            viewBox="0 0 48 48"
            width="24"
            height="24"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
          >
            {/* Google icon SVG */}
          </svg>
          <span class="text-gray-700 font-medium">Continue with Google</span>
        </button>
        {/* Rest of the login form */}
        <form onSubmit={onlogin}>
          <input
            type="email"
            class="w-full px-6 py-3 mb-2 border border-slate-600 rounded-lg font-medium "
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            class="w-full px-6 py-3 mb-2 border border-slate-600 rounded-lg font-medium "
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            disabled={isLoggingIn} // Disable the button when in the login process
            class="bg-slate-500 hover:bg-slate-700 text-white text-base rounded-lg py-2.5 px-5 transition-colors w-full text-[19px]"
          >
            {isLoggingIn ? "Logging in..." : "Login"}
          </button>
        </form>
        <p class="text-center mt-3 text-[14px]">
          Don't have an account?
          <a href="/signup" class="text-gray-600">
            Signup
          </a>
        </p>
        <p class="text-center mt-3 text-[14px]">
          By clicking continue, you agree to our
          <a href="/terms" class="text-gray-600">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" class="text-gray-600">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
