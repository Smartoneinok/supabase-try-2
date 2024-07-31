import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Home Page</h1>
        <Link to="/login" className="p-2 bg-blue-500 text-white rounded mx-2">Login</Link>
        <Link to="/signup" className="p-2 bg-green-500 text-white rounded mx-2">Sign Up</Link>
      </div>
    </div>
  );
};

export default Home;
