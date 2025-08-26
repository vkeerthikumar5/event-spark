import React, { useEffect, useState } from "react";
import Sidenav from "./Sidenav";
import axios from "axios";

export default function SA_Dashboard() {
  const [stats, setStats] = useState({
    organizersCount: 0,
    pendingCount: 0,
    totalEvents: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/sa/stats`);
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidenav />

      {/* Main Content */}
      <div className="flex-1 p-6 sm:ml-64">
        <div className="p-6 border rounded-lg shadow-md bg-white dark:bg-gray-900 dark:border-gray-700">
          <h1 className="text-2xl text-center font-bold mb-4 text-gray-800 dark:text-gray-200">
            Welcome Keerthi Kumar
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Welcome to your dashboard. Here you can manage your profile,
            view your activity, and access important resources.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow">
              <h2 className="text-center text-lg font-semibold text-gray-700 dark:text-gray-300">
                No.of Organizers
              </h2>
              <p className="text-xl text-center text-gray-500 dark:text-gray-400">
                {stats.organizersCount}
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow">
              <h2 className="text-center text-lg font-semibold text-gray-700 dark:text-gray-300">
                Pending Activations
              </h2>
              <p className="text-xl text-center text-gray-500 dark:text-gray-400">
                {stats.pendingCount}
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow">
              <h2 className="text-lg text-center font-semibold text-gray-700 dark:text-gray-300">
                Total Events
              </h2>
              <p className="text-xl text-center text-gray-500 dark:text-gray-400">
                {stats.totalEvents}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
