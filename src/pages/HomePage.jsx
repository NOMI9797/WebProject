import React from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-red-500">
      <Header />
      {/* Hero Section */}
      <div className="relative h-[80vh] flex items-center justify-center text-center text-white">
        <img
          src="/outfitter.jpg"
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="relative z-10">
          <h1 className="text-5xl font-extrabold">WINTER SALE</h1>
          <h2 className="text-4xl font-bold mt-2">UPTO 50% OFF</h2>
          <p className="mt-4 text-lg">LIVE IN-STORE & ONLINE</p>
          <p className="mt-6 text-sm uppercase">Women</p>
          
          {/* Dashboard Button */}
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-8 px-6 py-3 bg-white text-red-500 font-semibold rounded-md hover:bg-gray-100 transition duration-300 shadow-lg"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
