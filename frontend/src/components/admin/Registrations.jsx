import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidenav from "./Sidenav";
export default function EventRegistrations() {
  const { id } = useParams(); // event id from URL
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    // Fetch all registrations for this event
    fetch(`${import.meta.env.VITE_API_BASE_URL}/${id}/registrations`)
      .then((res) => res.json())
      .then((data) => setRegistrations(data))
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div>
    <Sidenav/>

    <div className="flex-1 p-6 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <p className="text-2xl underline underline-offset-4 text-cyan-700 text-center font-semibold">
         Registrations
        </p>



        <div className="p-6">
      

      {registrations.length === 0 ? (
        <p className="text-gray-600">No one has registered yet.</p>
      ) : (
        

<div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Mobile Number
                </th>
                <th scope="col" class="px-6 py-3">
                    Email
                </th>
                
            </tr>
        </thead>
        <tbody>
              {registrations.map((r, index) => (
                <tr key={index} className=" hover:bg-gray-50">
                  <td className="px-6 py-3">{r.name}</td>
                  <td className="px-6 py-3">{r.m_no}</td>
                  <td className="px-6 py-3">{r.email}</td>
                </tr>
              ))}
            </tbody>
    </table>
</div>

      )}
    </div>
      </div>
    </div>
  </div>
   
  );
}
