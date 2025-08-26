import React, { useEffect, useState } from "react";
import Sidenav from "./Sidenav";
import axios from "axios";

export default function BrowseEvents() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [appliedEventIds, setAppliedEventIds] = useState([]); // track registered events
  const [events, setEvents] = useState([]);

  // 🔹 Assume logged-in userId is stored in localStorage/session
  const user = JSON.parse(localStorage.getItem("user")); // from login response
    const userId = user?.id;

  const openModal = (event) => {
    setSelectedEvent(event);
    setIsOpen(true);
  };

  const handleRegister = async () => {
    try {
      await axios.post(`http://localhost:5000/events/${selectedEvent._id}/register`, {
        userId,
      });

      setAppliedEventIds((prev) => [...prev, selectedEvent._id]);
      setIsOpen(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    const getevents = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/browse_events/${userId}`);
        setEvents(res.data.events);
  
        // store registered event IDs
        const registeredIds = res.data.events
          .filter(e => e.isRegistered)
          .map(e => e._id);
  
        setAppliedEventIds(registeredIds);
      } catch (err) {
        console.log(err.message);
      }
    };
    getevents();
  }, [userId]);
  

  return (
    <div className="flex">
      <Sidenav />
      <div className="flex-1 p-6 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <p className="text-2xl underline underline-offset-4 text-cyan-700 text-center font-semibold">
            Browse Events
          </p>

          <div className="m-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {events.map((event) => (
              <div
              key={event._id}
              className="max-w-sm p-6 flex flex-col justify-between bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
            >
              <div>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {event.title}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {event.desc}
                </p>
                <p className="mb-1 text-sm text-gray-700">{event.location}</p>
                <p className="mb-3 text-sm text-gray-700">{event.date}</p>
              </div>
            
              <div className="mt-auto">
                {appliedEventIds.includes(event._id) ? (
                  <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300">
                    Registered
                  </span>
                ) : (
                  <button
                    onClick={() => openModal(event)}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-cyan-700 rounded-lg hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                  >
                    Register
                  </button>
                )}
              </div>
            </div>
            
            ))}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              Confirm Registration
            </h3>
            <p className="mb-6">
              Are you sure you want to register for{" "}
              <span className="font-bold">{selectedEvent?.title}</span>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                No
              </button>
              <button
                onClick={handleRegister}
                className="px-4 py-2 bg-cyan-700 text-white rounded-lg hover:bg-cyan-800"
              >
                Yes, Register
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
