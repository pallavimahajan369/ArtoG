import React, { useEffect, useState } from "react";
import { FaPaintBrush, FaUsers, FaHeart } from "react-icons/fa";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { getAllSketchesAdmin } from "../../api/sketchApi";
import { getAllUsers } from "../../api/userApi";
import { getLikesSummary } from "../../api/likeApi";

const AdminDashboardPage = () => {
  const [totalSketches, setTotalSketches] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);
  const [userGrowthData, setUserGrowthData] = useState([]);

  // Fetch total sketches
  useEffect(() => {
    const fetchTotalSketches = async () => {
      try {
        const sketches = await getAllSketchesAdmin();
        setTotalSketches(sketches.length);
      } catch (error) {
        console.error("Failed to fetch sketches:", error);
      }
    };
    fetchTotalSketches();
  }, []);

  // Fetch total users and generate chart data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getAllUsers(); // API from userApi.js
        setTotalUsers(users.length);

        // Prepare monthly user growth chart
        const months = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ];

        const growth = new Array(12).fill(0);
        users.forEach(user => {
          const monthIndex = new Date(user.createdAt).getMonth();
          growth[monthIndex]++;
        });

        const chartData = months.map((month, index) => ({
          name: month,
          users: growth[index],
        }));

        setUserGrowthData(chartData);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Fetch total likes
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const data = await getLikesSummary();
        setTotalLikes(data.totalLikes);
      } catch (error) {
        console.error("Failed to fetch likes:", error);
      }
    };
    fetchLikes();
  }, []);

  return (
    <div>
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center space-x-4 border-l-4 border-orange-500">
          <div className="p-3 bg-orange-500/20 rounded-full">
            <FaPaintBrush className="h-8 w-8 text-orange-400" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Total Sketches</p>
            <p className="text-3xl font-bold text-white">{totalSketches}</p>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center space-x-4 border-l-4 border-teal-500">
          <div className="p-3 bg-teal-500/20 rounded-full">
            <FaUsers className="h-8 w-8 text-teal-400" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Total Users</p>
            <p className="text-3xl font-bold text-white">{totalUsers}</p>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center space-x-4 border-l-4 border-pink-500">
          <div className="p-3 bg-pink-500/20 rounded-full">
            <FaHeart className="h-8 w-8 text-pink-400" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Total Likes</p>
            <p className="text-3xl font-bold text-white">{totalLikes}</p>
          </div>
        </div>
      </div>

      {/* User Growth Chart */}
      <div className="grid grid-cols-1 gap-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-white mb-4">User Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1F2937", border: "none" }}
                labelStyle={{ color: "#F97316" }}
                itemStyle={{ color: "#fff" }}
              />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#F97316"
                strokeWidth={3}
                dot={{ fill: "#F97316", r: 5 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
