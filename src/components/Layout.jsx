import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <nav className="w-64 bg-white shadow-md">
        <ul className="py-4">
          <li>
            <Link to="/" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Dashboard</Link>
          </li>
          <li>
            <Link to="/tasks" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Task Management</Link>
          </li>
          <li>
            <Link to="/monthly-goal" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Monthly Goal</Link>
          </li>
        </ul>
      </nav>
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;