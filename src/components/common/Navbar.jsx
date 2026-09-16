import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Train, LogOut, Sun, Moon, User as UserIcon } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-white dark:bg-slate-800 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Train className="h-8 w-8 text-railway-blue dark:text-railway-accent" />
              <span className="font-bold text-xl text-slate-900 dark:text-white">LateYatri</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400">
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>
            {user ?
            <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <UserIcon className="h-4 w-4" />
                  {user.name}
                </span>
                <button onClick={logout} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400" title="Logout">
                  <LogOut className="h-5 w-5" />
                </button>
              </div> :

            <div className="flex gap-2">
                <Link to="/login" className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-railway-blue dark:hover:text-railway-accent px-3 py-2">Login</Link>
                <Link to="/register" className="text-sm font-medium bg-railway-blue text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors">Register</Link>
              </div>
            }
          </div>
        </div>
      </div>
    </nav>);

};

export default Navbar;