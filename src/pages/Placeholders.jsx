import React from 'react';
import { Navigate } from 'react-router-dom';

const Placeholder = ({ title }) =>
<div className="p-8 text-center text-slate-500">
    <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">{title}</h2>
    <p>This page has been scaffolded and is ready for full implementation.</p>
  </div>;


export const Landing = () => <Navigate to="/dashboard" />;
export const RouteDetails = () => <Placeholder title="Route Details" />;
export const Search = () => <Placeholder title="Search Trains" />;
export const Favorites = () => <Placeholder title="Favorites" />;
export const Notifications = () => <Placeholder title="Notifications" />;
export const Settings = () => <Placeholder title="Settings" />;