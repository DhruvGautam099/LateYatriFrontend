import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';

import PublicLayout from './layouts/PublicLayout';
import UserLayout from './layouts/UserLayout';
import ProtectedRoute from './components/common/ProtectedRoute';

import {
  Landing, RouteDetails,
  Search, Favorites,
  Notifications, Settings } from
'./pages/Placeholders';

import Login from './pages/user/Login';
import Register from './pages/user/Register';
import History from './pages/user/History';
import Analytics from './pages/user/Analytics';
import AdminDashboard from './pages/admin/AdminDashboard';

import Home from './pages/user/Home';
import Dashboard from './pages/user/Dashboard';
import LiveTracking from './pages/user/LiveTracking';
import PredictETA from './pages/user/PredictETA';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            {/* User Routes */}
            <Route element={<UserLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/live-tracking" element={<LiveTracking />} />
              <Route path="/predict-eta" element={<PredictETA />} />
              <Route path="/route/:trainNumber" element={<RouteDetails />} />
              <Route path="/history" element={<History />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/search" element={<Search />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/settings" element={<Settings />} />
            </Route>

            {/* Admin Routes */}
            <Route element={<ProtectedRoute adminOnly={true} />}>
              <Route element={<UserLayout />}>
                <Route path="/admin" element={<AdminDashboard />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>);

}

export default App;