import React from "react";
import { FaMessage, FaUsers } from "react-icons/fa6";
import { FaUserDoctor } from "react-icons/fa6";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { MdInsertDriveFile } from "react-icons/md";
import { Link } from "react-router-dom";
function AdminDashHome() {
  // Sample data for charts
const revenueData = [
  { name: "Jan", revenue: 18500 },
  { name: "Feb", revenue: 21200 },
  { name: "Mar", revenue: 19800 },
  { name: "Apr", revenue: 24500 },
  { name: "May", revenue: 26300 },
  { name: "Jun", revenue: 24583 },
];

const usersData = [
  { name: "Jan", users: 850 },
  { name: "Feb", users: 920 },
  { name: "Mar", users: 1050 },
  { name: "Apr", users: 980 },
  { name: "May", users: 1200 },
  { name: "Jun", users: 1100 },
];
    const users = [
      {
        username: "johndoe",
        email: "johndoe@example.com",
        gender: "Male",
        country: "Rwanda",
      },
      {
        username: "janedoe",
        email: "janedoe@example.com",
        gender: "Female",
        country: "Kenya",
      },
      {
        username: "alexsmith",
        email: "alexsmith@example.com",
        gender: "Male",
        country: "Uganda",
      },
      {
        username: "maryjane",
        email: "maryjane@example.com",
        gender: "Female",
        country: "Tanzania",
      },
      {
        username: "peterjohn",
        email: "peterjohn@example.com",
        gender: "Male",
        country: "Burundi",
      },
    ];


  // Sample data for activity table

  // Status badge color configuration

 

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Card 1 */}
          <div className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Users</span>
              <span className="text-xm font-bold mt-1">{users.length}</span>
              <span className="text-sm text-green-500 mt-1">Total Users</span>
            </div>
            <div className="w-7 h-7 rounded-sm bg-[#EFF6FF] flex items-center justify-center text-blue-400 text-xl">
              <FaUsers />
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">LostItems</span>
              <span className="text-xm font-bold mt-1">{15}</span>
              <span className="text-sm text-green-500 mt-1">
                Total Lost Items
              </span>
            </div>
            <div className="w-7 h-7 rounded-sm bg-[#ECFDF5] flex items-center justify-center text-[#10B981] text-xl">
              <FaUserDoctor />
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">FoundItems</span>
              <span className="text-sm font-bold mt-1">{12}</span>
              <span className="text-sm text-green-500 mt-1">
                Total Found Items
              </span>
            </div>
            <div className="w-7 h-7 rounded-sm bg-[#F5F3FF] flex items-center justify-center text-[#8B5CF6] text-xl">
              <MdInsertDriveFile />
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Messages</span>
              <span className="text-sm font-bold mt-1">{10}</span>
              <span className="text-sm text-green-500 mt-1">
                Total Messages
              </span>
            </div>
            <div className="w-7 h-7 rounded-sm bg-[#FFFBEB] flex items-center justify-center text-[#F59E0B] text-xl">
              <FaMessage />
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {/* Revenue Chart */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-base font-medium text-gray-800 mb-2">
              Revenue Overview
            </h3>
            <div style={{ width: "100%", height: 200 }}>
              <ResponsiveContainer>
                <LineChart
                  data={revenueData}
                  margin={{
                    top: 5,
                    right: 20,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#4b7bec"
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Users Chart */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-base font-medium text-gray-800 mb-2">
              User Statistics
            </h3>
            <div style={{ width: "100%", height: 200 }}>
              <ResponsiveContainer>
                <BarChart
                  data={usersData}
                  margin={{
                    top: 5,
                    right: 20,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="users" fill="#20bf6b" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        {/* Recent Activity Section */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 flex justify-between items-center">
            <h3 className="text-base font-medium text-gray-800">
              Recent Activity
            </h3>
            <Link
              to={"user"}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              View All
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-size-sm font-medium text-gray-900  tracking-wider">
                    Username
                  </th>
                  <th className="px-4 py-2 text-left text-size-sm font-medium text-gray-900  tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-2 text-left text-size-sm font-medium text-gray-900  tracking-wider">
                    Gender
                  </th>
                  <th className="px-4 py-2 text-left text-size-sm font-medium text-gray-900  tracking-wider">
                    Country
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((activity) => (
                  <tr>
                    <td className="px-4 py-2 whitespace-nowrap text-size-sm  text-gray-500">
                      {activity.username}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-size-sm text-gray-500">
                      {activity.email}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-size-sm text-gray-500">
                      {activity.gender}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <span className="px-2 inline-flex text-size-sm   rounded-full text-gray-500 ">
                        {activity.country}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashHome;
