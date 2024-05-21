import React, { useState, useEffect } from "react";
import UserProfilePic from "../../utils/photoGenerator";
import apiRequest from "../../api/api";

const Navbar = ({ toggleSidebar }) => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleClick = () => {
    toggleSidebar(true);
  };

  // useEffect(() => {
  //   // Simulate loading for 1.5 seconds
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 1500);

  //   // Cleanup timer
  //   return () => clearTimeout(timer);
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiRequest("get", "api/v1/users");
        setData(response.data);
        setLoading(false);
        console.log(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="flex justify-between bg-glasses backdrop-blur-12 text-blue-500 w-screen h-12">
        <div className="flex flex-row sm:space-x-3 px-5 xl:px-10 py-3 justify-between items-center">
          <button
            type="button"
            className="flex px-2 py-1 items-center justify-center rounded-lg bg-gray-100 text-blue-500 border-1 border-blue-500 hover:bg-blue-600 sm:w-1/2 sm:px-2 sm:py-1 sm:text-base"
            onClick={handleClick}
          >
            <i className="fa-solid fa-bars"></i>
          </button>
          <button
            type="button"
            className="flex py-1 mx-3 items-center justify-center rounded-2xl bg-gray-100 font-semibold text-blue-500 border-1 border-blue-500 hover:bg-blue-600 sm:mx-0 sm:w-1/2 sm:px-2 sm:py-1 sm:text-sm"
          >
            <span className="px-1">Created</span>
          </button>
        </div>
        <div className="px-5 xl:px-12 py-3 flex w-full items-center ">
          <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
            <div className="relative border-2 border-gray-50 px-3 py-1 rounded-2xl bg-white sm:w-64 md:w-80">
              <i className="fa-solid fa-magnifying-glass text-gray-500 px-0"></i>
              <input
                type="text"
                className="text-sm px-2"
                name="search-bar"
                placeholder="Search"
              ></input>
            </div>
          </ul>

          <div className="hidden xl:flex space-x-5 items-center">
            <a className="flex items-center hover:text-gray-200" href="#">
              {loading === true ? (
                <div className="w-6 h-6 bg-gray-200 animate-pulse rounded-full"></div>
              ) : (
                <div>
                  <UserProfilePic name="John Doe" size={6} />
                </div>
              )}
            </a>
          </div>
        </div>
        <a className="xl:hidden flex mr-6 items-center" href="#">
          <a className="flex items-center hover:text-gray-200" href="#">
            {loading === true ? (
              <div className="w-6 h-6 bg-gray-200 animate-pulse rounded-full"></div>
            ) : (
              <div>
                <UserProfilePic name="John Doe" size={6} />
              </div>
            )}
          </a>
          <span className="flex absolute -mt-5 ml-4">
            <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
          </span>
        </a>
      </nav>
    </header>
  );
};

export default Navbar;
