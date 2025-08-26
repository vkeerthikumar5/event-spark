import React from 'react'
import Sidenav from './Sidenav';
import axios from 'axios';
import { useEffect, useState } from 'react';
export default function Activations() {
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const res = await axios.get("http://localhost:5000/admins");

                setAdmins(res.data);

            } catch (err) {
                console.error(err);
            }
        };

        fetchAdmins();
    }, []);
    const changeStatus = async (id) => {
        const confirmAction = window.confirm("Are you sure you want to activate this admin?");
        if (!confirmAction) return; // If user clicks Cancel, stop here
    
        try {
            await axios.put(`http://localhost:5000/activate/${id}`);
            // update state after activation
            setAdmins((prevAdmins) =>
                prevAdmins.map((admin) =>
                    admin._id === id ? { ...admin, status: "activated" } : admin
                )
            );
            alert("Admin activated successfully ");
        } catch (err) {
            console.error(err);
            alert("Something went wrong ❌");
        }
    };
    

    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidenav />

            {/* Main Content */}
            <div className="flex-1 p-6 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                    <p className="text-2xl underline underline-offset-4 text-cyan-700 text-center font-semibold">
                        Activate Organizers
                    </p>

                    <div>


                        <div className="m-8 relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Organizer Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Email ID
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Mobile No.
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Date of Request
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {admins.map((data, index) => (
                                        <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {data.name}
                                            </th>
                                            <td className="px-6 py-4">
                                                {data.email}
                                            </td>
                                            <td className="px-6 py-4">
                                                {data.m_no}
                                            </td>
                                            <td className="px-6 py-4">
                                                {data.dor}
                                            </td>

                                            <td className="px-6 py-4">
                                                {data.status === "activated" ? (
                                                    <span className="font-medium text-green-600">Activated</span>
                                                ) : (
                                                    <button
                                                        onClick={() => changeStatus(data._id)}
                                                        className="underline font-medium text-red-600 hover:text-red-700"
                                                    >
                                                        Activate
                                                    </button>

                                                )}
                                            </td>

                                        </tr>
                                    ))}


                                </tbody>
                            </table>
                        </div>

                    </div>

                </div>
            </div>


        </div>
    );
}
