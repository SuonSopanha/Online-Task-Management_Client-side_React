import React, { useState } from "react";
import { formattedDate } from "../../utils/formatDate";
import { Link } from "react-router-dom";

const AdminUser = () => {
  // Example user data
  const users = [
    {
      id: 1,
      name: "Jane Cooper",
      title: "Regional Paradigm Technician",
      department: "Optimization",
      status: "Active",
      role: "Admin",
      email: "jane.cooper@example.com",
      image: "https://i.pravatar.cc/150?img=1",
    },

    {
      id: 2,
      name: "Cody Fisher",
      title: "Product Directives Officer",
      department: "Intranet",
      status: "Active",
      role: "Admin",
      email: "cody.fisher@example.com",
      image: "https://i.pravatar.cc/150?img=2",
    },

    {
      id: 3,
      name: "Esther Howard",
      title: "Forward Response Developer",
      department: "Directives",
      status: "Active",
      role: "Admin",
      email: "esther.howard@example.com",
      image: "https://i.pravatar.cc/150?img=3",
    },

    {
      id: 4,
      name: "Jenny Wilson",
      title: "Central Security Planner",
      department: "Security",
      status: "Active",
      role: "Admin",
      email: "jenny.wilson@example.com",
      image: "https://i.pravatar.cc/150?img=4",
    },

    {
      id: 5,
      name: "Esther Howard",
      title: "Forward Response Developer",
      department: "Directives",
      status: "Active",
      role: "Admin",
      email: "esther.howard@example.com",
      image: "https://i.pravatar.cc/150?img=5",
    },

    {
      id: 6,
      name: "Jenny Wilson",
      title: "Central Security Planner",
      department: "Security",
      status: "Active",
      role: "Admin",
      email: "jenny.wilson@example.com",
      image: "https://i.pravatar.cc/150?img=6",
    },

    {
      id: 7,
      name: "Jenny Wilson",
      title: "Central Security Planner",
      department: "Security",
      status: "Active",
      role: "Admin",
      email: "jenny.wilson@example.com",
      image: "https://i.pravatar.cc/150?img=7",
    },

    // Add more user objects as needed
    // ...
  ];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const usersPerPage = 5;

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate pagination values
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page on search
  };
  // Handle pagination
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="flex justify-between items-center text-2xl bg-glasses backdrop-blur-12 font-semibold p-4 m-2 rounded-lg">
          <div className="flex items-center justify-start">
            <div className="relative w-12 h-12 rounded-full md:block">
              <img
                className="object-cover w-full h-full rounded-full"
                src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                alt="Admin"
                loading="lazy"
              />
              <div
                className="absolute inset-0 rounded-full shadow-inner"
                aria-hidden="true"
              ></div>
            </div>
            <div>
              <p className="ml-2">Admin</p>
              <p className="ml-2">Dashboard</p>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <p className="text-sm">{formattedDate}</p>
          </div>
        </div>
        <div className="flex justify-between items-center bg-glasses backdrop-blur-12 font-semibold p-4 mx-2 mb-1 rounded-lg">
          <nav className="flex space-x-4">
            <Link
              to="/overview"
              className="text-sm text-gray-700 hover:text-gray-900"
            >
              Overview
            </Link>
            <Link
              to="/reports"
              className="text-sm text-gray-700 hover:text-gray-900"
            >
              Reports
            </Link>
            <Link
              to="/adminOrg"
              className="text-sm text-gray-700 hover:text-gray-900"
            >
              Organization
            </Link>
            <Link
              to="/adminUser"
              className="text-sm text-gray-700 hover:text-gray-900"
            >
              Users
            </Link>
            <Link
              to="/support"
              className="text-sm text-gray-700 hover:text-gray-900"
            >
              Support
            </Link>
          </nav>
        </div>
        <div className="flex justify-center items-start">
          <div className="h-fit flex w-full justify-end items-end">
            <div className="flex relative rounded-md w-full px-4 max-w-xl">
              <input
                type="text"
                name="q"
                id="query"
                placeholder="Search by name or email"
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full p-2 rounded-md border border-r-white rounded-r-none border-gray-300 placeholder-gray-500 dark:placeholder-gray-300 dark:bg-gray-500 dark:text-gray-300 dark:border-none"
              />
              <button className="inline-flex items-center gap-2 bg-blue-700 text-white text-lg font-semibold px-6 rounded-r-md">
                <span>Search</span>
                <span className="hidden md:block">
                  <svg
                    className="text-gray-200 h-5 w-5 p-0 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 56.966 56.966"
                    width="512px"
                    height="512px"
                  >
                    <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between bg-glasses backdrop-blur-12 font-semibold p-4 m-2 rounded-lg">
          <h3 className="text-lg text-start pl-4 mb-4">Users</h3>
          <table className="w-full divide-y divide-gray-500 overflow-x-auto rounded-lg ">
            <thead className="bg-glasses">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Role
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-glasses divide-y divide-gray-500">
              {currentUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={user.image}
                          alt={user.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.title}</div>
                    <div className="text-sm text-gray-500">
                      {user.department}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a
                      href="#"
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </a>
                    <a
                      href="#"
                      className="ml-2 text-red-600 hover:text-red-900"
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center p-4">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="text-sm text-gray-700 hover:text-gray-900 disabled:opacity-50"
            >
              Previous
            </button>
            <p className="text-sm">
              Page {currentPage} of {totalPages}
            </p>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="text-sm text-gray-700 hover:text-gray-900 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminUser;
