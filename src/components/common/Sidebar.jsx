import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Search, Map, Star, History, BarChart2, Bell, Settings } from 'lucide-react';

const Sidebar = () => {
  const links = [
  { to: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard' },
  { to: '/search', icon: <Search className="w-5 h-5" />, label: 'Search Trains' },
  { to: '/live-tracking', icon: <Map className="w-5 h-5" />, label: 'Live Tracking' },
  { to: '/predict-eta', icon: <Map className="w-5 h-5" />, label: 'Predict ETA' },
  { to: '/favorites', icon: <Star className="w-5 h-5" />, label: 'My Favorites' },
  { to: '/history', icon: <History className="w-5 h-5" />, label: 'History' },
  { to: '/analytics', icon: <BarChart2 className="w-5 h-5" />, label: 'Analytics' },
  { to: '/notifications', icon: <Bell className="w-5 h-5" />, label: 'Notifications' },
  { to: '/settings', icon: <Settings className="w-5 h-5" />, label: 'Settings' }];


  return (
    <aside className="w-64 bg-white dark:bg-slate-800 shadow-sm h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto hidden md:block">
      <nav className="p-4 space-y-1">
        {links.map((link) =>
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          isActive ?
          'bg-railway-blue/10 text-railway-blue dark:bg-railway-accent/20 dark:text-railway-accent' :
          'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700/50'}`

          }>
          
            {link.icon}
            {link.label}
          </NavLink>
        )}
      </nav>
    </aside>);

};

export default Sidebar;