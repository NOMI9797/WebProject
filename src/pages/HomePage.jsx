import React from "react";
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="relative min-h-screen bg-red-500">
      {/* Navbar */}
      <nav className="flex justify-between items-center py-4 px-8 bg-white shadow-lg">
        <div className="text-3xl font-bold text-gray-800">Outfitters</div>
        <ul className="flex space-x-6 text-gray-700 font-medium">
          <li className="hover:text-red-500 cursor-pointer">Products</li>
          <li className="hover:text-red-500 cursor-pointer">New Arrivals</li>
          <li className="hover:text-red-500 cursor-pointer">Sale</li>
          <li className="hover:text-red-500 cursor-pointer">Contact</li>
        </ul>
        <div className="flex space-x-4 text-gray-700">
          <i className="fas fa-search cursor-pointer hover:text-red-500"></i>
          <Link to="/profile">
            <i className="fas fa-user cursor-pointer hover:text-red-500"></i>
          </Link>
          <i className="fas fa-shopping-cart cursor-pointer hover:text-red-500"></i>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-[80vh] flex items-center justify-center text-center text-white">
        <img
          src="/public/outfitter.jpg"
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="relative z-10">
          <h1 className="text-5xl font-extrabold">WINTER SALE</h1>
          <h2 className="text-4xl font-bold mt-2">UPTO 50% OFF</h2>
          <p className="mt-4 text-lg">LIVE IN-STORE & ONLINE</p>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
            <button className="px-4 py-2 bg-white text-red-500 rounded-md shadow-md hover:bg-gray-200">
              VIEW ALL
            </button>
            <button className="px-4 py-2 bg-white text-red-500 rounded-md shadow-md hover:bg-gray-200">
              JACKETS | COATS
            </button>
            <button className="px-4 py-2 bg-white text-red-500 rounded-md shadow-md hover:bg-gray-200">
              SWEATSHIRTS | HOODIES
            </button>
            <button className="px-4 py-2 bg-white text-red-500 rounded-md shadow-md hover:bg-gray-200">
              SWEATERS | CARDIGANS
            </button>
            <button className="px-4 py-2 bg-white text-red-500 rounded-md shadow-md hover:bg-gray-200">
              JEANS
            </button>
            <button className="px-4 py-2 bg-white text-red-500 rounded-md shadow-md hover:bg-gray-200">
              ACCESSORIES
            </button>
          </div>
          <p className="mt-6 text-sm uppercase">Women</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
