import React from "react";
import { formattedDate } from "../../utils/formatDate";
import { Link } from "react-router-dom";

const AdminOrg = () => {
  return (
    <>
      <div className="flex flex-col">
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
            {/* Today Date */}
            <p className="text-sm">{formattedDate}</p>
          </div>
        </div>
        <div className="flex justify-between items-center bg-glasses backdrop-blur-12 font-semibold p-4 m-2 rounded-lg">
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
        <div className="flex flex-col justify-between bg-glasses backdrop-blur-12 font-semibold p-4 m-2 rounded-lg">
          <h3 className="text-lg text-start pl-4 mb-4">Users</h3>
          <table class="w-full divide-y divide-gray-500 overflow-x-auto rounded-lg ">
            <thead class="bg-glasses">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Owner
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Member
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Description
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-glasses divide-y divide-gray-500">
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <img
                        class="h-10 w-10 rounded-full"
                        src="https://i.pravatar.cc/150?img=1"
                        alt=""
                      ></img>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        Jane Cooper
                      </div>
                      <div class="text-sm text-gray-500">
                        jane.cooper@example.com
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    Regional Paradigm Technician
                  </div>
                  <div class="text-sm text-gray-500">Optimization</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Admin
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  jane.cooper@example.com
                </td>
                <td class="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                  <a href="#" class="text-indigo-600 hover:text-indigo-900">
                    Edit
                  </a>
                  <a href="#" class="ml-2 text-red-600 hover:text-red-900">
                    Delete
                  </a>
                </td>
              </tr>

              <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <img
                        class="h-10 w-10 rounded-full"
                        src="https://i.pravatar.cc/150?img=1"
                        alt=""
                      ></img>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        Jane Cooper
                      </div>
                      <div class="text-sm text-gray-500">
                        jane.cooper@example.com
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    Regional Paradigm Technician
                  </div>
                  <div class="text-sm text-gray-500">Optimization</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Admin
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  jane.cooper@example.com
                </td>
                <td class="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                  <a href="#" class="text-indigo-600 hover:text-indigo-900">
                    Edit
                  </a>
                  <a href="#" class="ml-2 text-red-600 hover:text-red-900">
                    Delete
                  </a>
                </td>
              </tr>

              <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <img
                        class="h-10 w-10 rounded-full"
                        src="https://i.pravatar.cc/150?img=1"
                        alt=""
                      ></img>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        Jane Cooper
                      </div>
                      <div class="text-sm text-gray-500">
                        jane.cooper@example.com
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    Regional Paradigm Technician
                  </div>
                  <div class="text-sm text-gray-500">Optimization</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Admin
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  jane.cooper@example.com
                </td>
                <td class="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                  <a href="#" class="text-indigo-600 hover:text-indigo-900">
                    Edit
                  </a>
                  <a href="#" class="ml-2 text-red-600 hover:text-red-900">
                    Delete
                  </a>
                </td>
              </tr>

              <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <img
                        class="h-10 w-10 rounded-full"
                        src="https://i.pravatar.cc/150?img=1"
                        alt=""
                      ></img>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        Jane Cooper
                      </div>
                      <div class="text-sm text-gray-500">
                        jane.cooper@example.com
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    Regional Paradigm Technician
                  </div>
                  <div class="text-sm text-gray-500">Optimization</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Admin
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  jane.cooper@example.com
                </td>
                <td class="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                  <a href="#" class="text-indigo-600 hover:text-indigo-900">
                    Edit
                  </a>
                  <a href="#" class="ml-2 text-red-600 hover:text-red-900">
                    Delete
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminOrg;
