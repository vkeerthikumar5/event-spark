import React, { useState, useEffect } from "react";
import Sidenav from "./Sidenav";
import axios from "axios";

export default function Registrations() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/get_user_events/${userId}`);
        setEvents(res.data.events);
      } catch (err) {
        console.error("Error fetching registrations:", err.message);
      }
    };
    fetchEvents();
  }, [userId]);

  const openModal = (event) => {
    setSelectedEvent(event);
    setIsOpen(true);
  };

  const handleCancel = async (eventId) => {
    try {
      await axios.delete(`http://localhost:5000/events/${eventId}/cancel`, {
        data: { userId }, // axios requires `data` for DELETE body
      });

      // remove from UI without refresh
      setEvents((prev) => prev.filter((event) => event._id !== eventId));
    } catch (err) {
      console.error("Error cancelling registration:", err.message);
    }
  };


  return (
    <div className="flex">
      <Sidenav />
      <div className="flex-1 p-6 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <p className="text-2xl underline underline-offset-4 text-cyan-700 text-center font-semibold">
            My Registrations
          </p>

          <div className="m-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {events.length === 0 ? (
              <p className="text-center text-gray-500 col-span-3">
                No registrations yet.
              </p>
            ) : (
              events.map((event) => (
                <div
                key={event._id}
                className="flex flex-col max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
              >
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {event.title}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {event.desc}
                </p>
                <p className="text-sm text-gray-600">{event.date}</p>
                <p className="text-sm text-gray-600">{event.location}</p>
              
                {/* Buttons container pinned to bottom */}
                <div className="mt-auto flex space-x-4 pt-4">
                  <button
                    onClick={() => openModal(event)}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-cyan-700 rounded-lg hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleCancel(event._id)}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
              
              ))
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {selectedEvent?.title}
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-900"
                >
                  ✕
                </button>
              </div>
              <div className="p-4 md:p-5">
                <p>{selectedEvent?.desc}</p>
                <p className="mt-2 text-sm text-gray-600">{selectedEvent?.location}</p>
                <p className="text-sm text-gray-600">{selectedEvent?.date}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
