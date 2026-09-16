import React, { useState, useEffect } from 'react';
import { getStationHistory } from '../../api/historyApi';
import { getStations } from '../../api/stationApi';
import { BarChart3, AlertTriangle, TrendingUp, Activity } from 'lucide-react';

const Analytics = () => {
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState('');
  
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getStations().then(setStations).catch(console.error);
  }, []);

  const handleFetchAnalytics = async () => {
    if (!selectedStation) return;
    setLoading(true);
    setError('');
    try {
      const data = await getStationHistory(selectedStation);
      setHistory(data);
    } catch (err) {
      setError('Could not fetch analytics data.');
    } finally {
      setLoading(false);
    }
  };

  const avgDelay = history.length ? Math.round(history.reduce((acc, curr) => acc + curr.arrivalDelay, 0) / history.length) : 0;
  const onTimePercentage = history.length ? Math.round((history.filter(h => h.arrivalDelay <= 10).length / history.length) * 100) : 0;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            Station Analytics
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Analyze traffic and punctuality metrics</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row gap-4 items-center">
        <select
          value={selectedStation}
          onChange={(e) => setSelectedStation(e.target.value)}
          className="w-full sm:max-w-xs px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
        >
          <option value="">-- Select Station --</option>
          {stations.map(s => (
            <option key={s.stationCode} value={s.stationCode}>{s.stationName} ({s.stationCode})</option>
          ))}
        </select>
        <button
          onClick={handleFetchAnalytics}
          disabled={!selectedStation || loading}
          className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-sm transition-colors disabled:opacity-70 flex items-center justify-center"
        >
          {loading ? 'Analyzing...' : 'Generate Report'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-xl flex items-center gap-3">
          <AlertTriangle className="w-5 h-5" /> {error}
        </div>
      )}

      {history.length > 0 && !loading && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl w-fit mb-4">
                <Activity className="w-6 h-6" />
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Trains Processed</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{history.length}</p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl w-fit mb-4">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Average Delay</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{avgDelay} <span className="text-lg font-normal text-slate-500">mins</span></p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="p-3 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl w-fit mb-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">On-Time Performance</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{onTimePercentage}%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
