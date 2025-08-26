import React from "react";
import { Login } from "../components/Login";
import { Register } from "../components/Register";
import { useLocation } from "react-router-dom";
export default function Main() {
    const location = useLocation();
    const isRegister = location.pathname === "/register";
  return (
    
    <section className="flex min-h-screen flex-col md:flex-row">
      
      {/* Title Section */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-cyan-500 to-blue-600 text-white items-center justify-center p-8">
        <div className="max-w-md text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Event Spark</h1>
          <p className="text-lg text-white/90">
            Discover, manage, and register for events seamlessly.
            Join our vibrant community today!
          </p>
        </div>
      </div>

      {/* Login Container */}
      <div className="w-full flex justify-center items-center">
        {isRegister ? <Register /> : <Login />}
      </div>
    </section>
  );
}
