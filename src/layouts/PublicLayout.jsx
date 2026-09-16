import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
      <Navbar />
      <main className="flex-1 flex flex-col relative z-0">
        <Outlet />
      </main>
      <Footer />
    </div>);
};

export default PublicLayout;