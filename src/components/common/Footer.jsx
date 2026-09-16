import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 py-6 mt-auto relative z-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-slate-600 dark:text-slate-400 font-bold tracking-wide text-sm">LateYatri</p>
        <p className="text-slate-500 dark:text-slate-500 text-xs mt-1.5">&copy; {new Date().getFullYear()} LateYatri. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
