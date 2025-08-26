import React, { useState } from "react";
import Sidenav from './Sidenav'
import axios from "axios";
export default function A_Events() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user")); // from login response
    const organizerId = user?.id;

    const eventData = { title, desc, date, location, organizerId };

      const res = await axios.post("http://localhost:5000/events", eventData, {
        headers: { "Content-Type": "application/json" },
      });

      alert("Event created successfully!");
      console.log(res.data);

      // Reset form
      setTitle("");
      setDesc("");
      setDate("");
      setLocation("");
    } catch (err) {
      console.error(err);
      alert("Failed to create event.");
    }
  };

  return (
    <div>
      <Sidenav/>

      <div className="flex-1 p-6 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <p className="text-2xl underline underline-offset-4 text-cyan-700 text-center font-semibold">
            Add Events
          </p>



          <form className="max-w-md mx-auto my-12" onSubmit={handleSubmit}>
      {/* Event Title */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="event_title"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
            border-0 border-b-2 border-gray-300 appearance-none dark:text-white 
            dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none 
            focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="event_title"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 
          duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
          peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Event Title
        </label>
      </div>

      {/* Description */}
      <div className="relative z-0 w-full mb-5 group">
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          id="event_desc"
          rows="3"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
            border-0 border-b-2 border-gray-300 appearance-none dark:text-white 
            dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none 
            focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="event_desc"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 
          duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
          peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Description
        </label>
      </div>

      {/* Date */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          id="event_date"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
            border-0 border-b-2 border-gray-300 appearance-none dark:text-white 
            dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none 
            focus:ring-0 focus:border-blue-600 peer"
          required
        />
        <label
          htmlFor="event_date"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 
          duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
          peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Event Date
        </label>
      </div>

      {/* Location */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          id="event_location"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
            border-0 border-b-2 border-gray-300 appearance-none dark:text-white 
            dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none 
            focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="event_location"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 
          duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
          peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Location
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="text-white bg-cyan-700 hover:bg-cyan-800 
        focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium 
        rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center 
        dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Post Event
      </button>
    </form>

        </div>
      </div>
    </div>
  )
}
