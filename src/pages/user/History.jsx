import React, { useState } from 'react';
import { getTrainHistory } from '../../api/historyApi';
import { Clock, Search, Train, Calendar, AlertTriangle } from 'lucide-react';

const History = () => {
  const [trainNumber, setTrainNumber] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!trainNumber) return;

    setLoading(true);
    setError('');
    setSearched(true);
    
    try {
      const data = await getTrainHistory(trainNumber);
      setHistory(data);
    } catch (err) {
      setError('Could not fetch history data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Calendar className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            Train Journey History
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Review past performance and delays for any train</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 max-w-xl">
          <div className="relative flex-1 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
            </div>
            <input
              type="text"
              value={trainNumber}
              onChange={(e) => setTrainNumber(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              placeholder="Enter Train Number (e.g. 12002)"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-sm transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : 'Search History'}
          </button>
        </form>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-xl flex items-center gap-3">
          <AlertTriangle className="w-5 h-5" /> {error}
        </div>
      )}

      {searched && !loading && !error && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
          {history.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Date</th>
                    <th className="px-6 py-4 font-semibold">Station</th>
                    <th className="px-6 py-4 font-semibold">Scheduled Arr.</th>
                    <th className="px-6 py-4 font-semibold">Actual Arr.</th>
                    <th className="px-6 py-4 font-semibold">Delay</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                  {history.map((record) => (
                    <tr key={record.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                        {new Date(record.journeyDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                        {record.station.stationName} ({record.station.stationCode})
                      </td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{record.scheduledArrival}</td>
                      <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{record.actualArrival}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                          record.arrivalDelay > 0 ? 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400' : 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                        }`}>
                          {record.arrivalDelay > 0 ? `${record.arrivalDelay} min late` : 'On Time'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center text-slate-500">No history records found for this train.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default History;
