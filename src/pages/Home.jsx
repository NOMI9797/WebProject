import React from "react";
import { signOutUser } from "../appwrite/Services/authServices";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';

const Home = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOutUser();
      setUser(null);
      localStorage.removeItem("authToken");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Welcome, {user?.username || "User"}!
        </h1>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-gray-700 text-lg">
            <p>
              <span className="font-semibold">Name:</span> {user?.username || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {user?.email || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Joined on:</span> {user?.createdAt || "N/A"}
            </p>
          </div>
          <img
            src={user?.profileImage || "https://via.placeholder.com/150"}
            alt="User Profile"
            className="w-32 h-32 rounded-full shadow-lg mt-6 md:mt-0"
          />
        </div>
      </div>

      <div className="mt-10 w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-indigo-600 text-white rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-bold">Recent Activities</h3>
            <p className="mt-2">
              Keep track of your latest activities here. More features coming soon!
            </p>
          </div>
          <div className="bg-green-600 text-white rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-bold">Notifications</h3>
            <p className="mt-2">No new notifications. Stay tuned for updates!</p>
          </div>
          <div className="bg-yellow-600 text-white rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-bold">Your Projects</h3>
            <p className="mt-2">View and manage your projects efficiently.</p>
          </div>
          <div className="bg-red-600 text-white rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-bold">Account Settings</h3>
            <p className="mt-2">Manage your profile and preferences here.</p>
          </div>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
