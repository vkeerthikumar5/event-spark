import React, { useEffect, useState } from "react";
import Sidenav from "./Sidenav";
import axios from "axios";

export default function A_Dashboard() {

  const [count,setcount]=useState()
  const user = JSON.parse(localStorage.getItem("user")); // from login response
    const adminId = user?.id;
    const name = user?.name;
    useEffect(() => {
      const fetchEvents=async()=>{
        try{
        const res=await axios.get(`http://localhost:5000/get_events/${adminId}`)
        
        setcount(res.data.count)
      }
      catch (err){
          console.log(err)
      }
      }
      fetchEvents()
     
    }, []);
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidenav />

      {/* Main Content */}
      <div className="flex-1 p-6 sm:ml-64">
        <div className="p-6 border rounded-lg shadow-md bg-white dark:bg-gray-900 dark:border-gray-700">
          <h1 className="text-2xl text-center font-bold mb-4 text-gray-800 dark:text-gray-200">
            Welcome {name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Welcome to your dashboard. Here you can manage your profile,
            view your activity, and access important resources.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow">
              <h2 className="text-center text-lg font-semibold text-gray-700 dark:text-gray-300">
                No.of Events
              </h2>
              <p className="text-xl text-center text-gray-500 dark:text-gray-400">
                {count}
              </p>
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
