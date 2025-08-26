import React, { useEffect, useState } from "react";
import Sidenav from "./Sidenav";
import { Link } from "react-router-dom";
import axios from "axios";

export default function User_Dashboard() {
  const user = JSON.parse(localStorage.getItem("user")); // from login response
  const[count,setCount]=useState('')
  const[totalEvents,setle]=useState('')
  const name = user?.name;
  const userId = user?.id;
  
  useEffect(()=>{
    const fetch_details=async()=>{
      try{
      const res=await axios.get(`${import.meta.env.VITE_API_BASE_URL}/get_user_events/${userId}`)
      setCount(res.data.totalRegisteredEvents)
      setle(res.data.totalEvents)

      }
      catch(err){
        console.log(err.message)
      }
    }
    fetch_details()
  })
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidenav />

      {/* Main Content */}
      <div className="flex-1 p-6 sm:ml-64">
        <div className="p-6 border rounded-lg shadow-md bg-white dark:bg-gray-900 dark:border-gray-700">
          <h1 className="text-2xl text-center font-bold mb-4 text-gray-800 dark:text-gray-200">
            Welcome {name}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Welcome to your dashboard. Here you can manage your profile,
            view your activity, and access important resources.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow">
              <h2 className="text-lg text-center font-semibold text-gray-700 dark:text-gray-300">
                Total Events
              </h2>
              <p className="text-xl text-center text-gray-500 dark:text-gray-400">
                {totalEvents}
              </p>
              

            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow">
              <h2 className="text-center text-lg font-semibold text-gray-700 dark:text-gray-300">
              Events Registered
              </h2>
              <p className="text-xl text-center text-gray-500 dark:text-gray-400">
                {count}
              </p>
              <Link 
  to="/user/registrations" 
  className="block text-xs text-cyan-700 dark:text-gray-400 hover:underline text-end"
>
  View Registrations
</Link>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow">
              <h2 className="text-center text-lg font-semibold text-gray-700 dark:text-gray-300">
                Support
              </h2>
              <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                Need help? Reach out to our support team anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
