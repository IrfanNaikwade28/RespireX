import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to Lungs Disease Detection System</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/patient" 
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-3">Patient symptoms Analysis</h2>
        </Link>

        <Link to="/xray" 
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-3">X-Ray Analysis</h2>
        </Link>

        <Link to="/results" 
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-3">Results Dashboard</h2>
        </Link>
      </div>
    </div>
  );
}
