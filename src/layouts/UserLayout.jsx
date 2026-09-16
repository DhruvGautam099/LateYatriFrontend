import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import Footer from '../components/common/Footer';

const UserLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
      <Navbar />
      <div className="flex flex-1 overflow-hidden relative z-0">
        <Sidebar />
        <main className="flex-1 overflow-y-auto flex flex-col">
          <div className="max-w-7xl mx-auto w-full p-4 md:p-6 lg:p-8 flex-1">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </div>);
};

export default UserLayout;