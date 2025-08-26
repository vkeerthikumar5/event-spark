import React, { useEffect, useState } from 'react';
import Sidenav from './Sidenav';
import axios from 'axios';

export default function Events() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchOrganizers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/organizers");
        setData(res.data);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchOrganizers();
  }, []);

  return (
    <div className="flex">
      <Sidenav />

      <div className="flex-1 p-6 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <p className="text-2xl underline underline-offset-4 text-cyan-700 text-center font-semibold">
            Organizers
          </p>

          <div className="m-8 relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Organizer Name</th>
                  <th scope="col" className="px-6 py-3">Email ID</th>
                  <th scope="col" className="px-6 py-3">Mobile No.</th>
                  <th scope="col" className="px-6 py-3">No. of Events</th>
                </tr>
              </thead>
              <tbody>
                {data.map((org, index) => (
                  <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {org.name}
                    </th>
                    <td className="px-6 py-4">{org.email}</td>
                    <td className="px-6 py-4">{org.m_no}</td>
                    <td className="px-6 py-4">{org.noe}</td>
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
