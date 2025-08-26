import React, { useState, useEffect } from 'react'
import Sidenav from './Sidenav';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
export default function View_Events() {
  
  const [events, setEvents] = useState([])
  const user = JSON.parse(localStorage.getItem("user")); // from login response
  const adminId = user?.id;
  const navigate=useNavigate()
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/get_events/${adminId}`)
        setEvents(res.data.events)
      }
      catch (err) {
        console.log(err)
      }
    }
    fetchEvents()

  }, []);

  const openModal = (event) => {
    setSelectedEvent(event);
    setIsOpen(true);
    isApplied(true)
  };
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidenav />

      {/* Main Content */}
      <div className="flex-1 p-6 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <p className="text-2xl underline underline-offset-4 text-cyan-700 text-center font-semibold">
            Your Events
          </p>

          <div className="m-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {events.map((event, index) => (
              <div
              key={index}
              className="max-w-sm flex flex-col justify-between p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
            >
              <div>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {event.title}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {event.desc}
                </p>
              </div>
            
              <button
                onClick={() => navigate(`/admin/events/${event._id}`)}
                className="mt-auto inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-cyan-700 rounded-lg hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                View Registrations
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            </div>
            
            ))}
          </div>
        </div>
      </div>


      {/* Modal */}
     

    </div>
  );
}
