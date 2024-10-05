import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, Target, ListTodo, Calendar } from "lucide-react";

const Layout = () => {
  const location = useLocation();

  const navItems = [
    { to: "/", icon: <LayoutDashboard className="h-5 w-5" />, label: "Dashboard" },
    { to: "/tasks", icon: <ListTodo className="h-5 w-5" />, label: "Task Management" },
    { to: "/monthly-goal", icon: <Target className="h-5 w-5" />, label: "Monthly Goal" },
    { to: "/calendar", icon: <Calendar className="h-5 w-5" />, label: "Calendar" },
    { to: "/weekly", icon: <CalendarDays className="h-5 w-5" />, label: "Weekly View" },
  ];

  return (
    <div className="flex h-screen bg-gradient-radial from-blue-100 to-purple-100">
      <nav className="w-64 bg-white shadow-xl">
        <div className="p-4 gradient-bg">
          <h1 className="text-2xl font-bold text-white">Content Harmony</h1>
        </div>
        <ul className="space-y-2 py-4">
          {navItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className={`flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 hover-glow ${
                  location.pathname === item.to ? 'bg-gray-200 font-semibold' : ''
                }`}
              >
                <span className="icon-hover">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;