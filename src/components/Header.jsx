import React from "react";
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center py-4 px-8 bg-white shadow-lg">
      <div 
        className="text-3xl font-bold text-gray-800 cursor-pointer"
        onClick={() => navigate('/')}
      >
        Outfitters
      </div>
      <ul className="flex space-x-6 text-gray-700 font-medium">
        <li 
          className="hover:text-red-500 cursor-pointer"
          onClick={() => navigate('/')}
        >
          Home
        </li>
        <li 
          className="hover:text-red-500 cursor-pointer"
          onClick={() => navigate('/products')}
        >
          Products
        </li>
        <li className="hover:text-red-500 cursor-pointer">New Arrivals</li>
        <li 
          className="hover:text-red-500 cursor-pointer"
          onClick={() => navigate('/sales')}
        >
          Sale
        </li>
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
  );
};

export default Header; 