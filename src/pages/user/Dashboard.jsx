import React, { useEffect, useState } from 'react';
import { getTrains } from '../../api/trainApi';

import { Train as TrainIcon, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const data = await getTrains();
        setTrains(data);
      } catch (error) {
        console.error('Failed to fetch trains', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrains();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Overview Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center space-x-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-lg dark:bg-blue-900/30 dark:text-blue-400">
            <TrainIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Trains</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{trains.length}</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center space-x-4">
          <div className="p-3 bg-green-100 text-green-600 rounded-lg dark:bg-green-900/30 dark:text-green-400">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">On Time</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">124</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center space-x-4">
          <div className="p-3 bg-red-100 text-red-600 rounded-lg dark:bg-red-900/30 dark:text-red-400">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Delayed</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">18</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center space-x-4">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-lg dark:bg-purple-900/30 dark:text-purple-400">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Live Trains</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">42</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Active Trains</h2>
          <Link to="/search" className="text-sm text-railway-blue dark:text-railway-accent font-medium hover:underline">View All</Link>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-700">
          {loading ?
          <div className="p-6 text-center text-slate-500">Loading trains...</div> :
          trains.map((train) =>
          <div key={train.trainNumber} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
              <div>
                <p className="font-medium text-slate-900 dark:text-white">{train.trainNumber} - {train.trainName}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{train.source} → {train.destination}</p>
              </div>
              <div className="flex gap-2">
                <Link to={`/live-tracking?train=${train.trainNumber}`} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-600">Track</Link>
                <Link to={`/predict-eta?train=${train.trainNumber}`} className="px-3 py-1.5 bg-railway-blue text-white rounded-md text-sm font-medium hover:bg-blue-700">Predict</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>);

};

export default Dashboard;