import React, { useState } from 'react';
import { Search as SearchIcon, Train as TrainIcon, Clock, AlertTriangle, ArrowRight, ArrowDown } from 'lucide-react';
import { getTrainStatus } from '../../api/trainApi';
import { getTrainRoute } from '../../api/routeApi';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [trainStatus, setTrainStatus] = useState(null);
  const [trainRoute, setTrainRoute] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError('');
    setTrainStatus(null);
    setTrainRoute([]);

    try {
      // In explicit backend mode, if these fail, they will throw and hit the catch block.
      const statusData = await getTrainStatus(searchQuery);
      const routeData = await getTrainRoute(searchQuery);

      if (!statusData || !routeData || routeData.length === 0) {
        setError('Train not found or invalid train number');
      } else {
        setTrainStatus(statusData);
        setTrainRoute(routeData);
      }
    } catch (err) {
      console.error(err);
      if (err.message === 'Train not found' || err.response?.status === 404) {
        setError('Train not found or invalid train number');
      } else {
        setError('Backend Unreachable. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col relative pb-16">
        
        {/* Header - Integrating smoothly with stunning glassmorphism */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 text-white py-8 px-6 md:px-10 flex items-center gap-5 shadow-2xl md:rounded-b-3xl relative z-10 mb-8 overflow-hidden">
          {/* Decorative shapes for dynamic aesthetic */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse"></div>
          
          <TrainIcon className="w-10 h-10 drop-shadow-md" />
          <div>
             <h1 className="text-3xl font-extrabold tracking-tight drop-shadow-md">LateYatri</h1>
             <p className="text-indigo-100 text-sm mt-1.5 font-medium tracking-wide">Premium Live Train Status & Updates</p>
          </div>
        </div>

        {/* Search Container */}
        <div className="px-4 md:px-10">
          <div className="backdrop-blur-xl bg-white/80 dark:bg-slate-800/80 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/40 dark:border-slate-700/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
            <form onSubmit={handleSearch}>
              <div className="flex items-center bg-slate-50 dark:bg-slate-900 rounded-xl p-3 mb-5 border border-slate-200 dark:border-slate-600 focus-within:border-blue-600 dark:focus-within:border-blue-500 focus-within:bg-white dark:focus-within:bg-slate-800 transition-colors">
                <SearchIcon className="text-slate-400 w-5 h-5 ml-2" />
                <input
                  type="text"
                  placeholder="Enter Train Number (e.g., 12002)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none w-full ml-3 text-slate-700 dark:text-slate-200 placeholder-slate-400 text-base"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto md:px-12 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold py-4 rounded-xl shadow-[0_4px_14px_rgba(16,185,129,0.4)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.5)] active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? 'Searching...' : 'Find Train'}
              </button>
            </form>
          </div>
        </div>

        {/* Error States */}
        {error && (
          <div className="px-4 md:px-8 mt-6">
            <div className="bg-red-50 dark:bg-red-900/30 border border-red-100 dark:border-red-800 text-red-600 dark:text-red-400 rounded-xl p-4 flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 flex-shrink-0" />
              <p className="font-medium text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex-1 flex flex-col items-center justify-center py-20 text-slate-500 dark:text-slate-400">
            <div className="w-10 h-10 border-4 border-blue-200 dark:border-blue-900 border-t-blue-600 dark:border-t-blue-500 rounded-full animate-spin mb-4"></div>
            <p className="font-medium">Fetching live status...</p>
          </div>
        )}

        {/* Timeline Container */}
        {trainStatus && trainRoute.length > 0 && !loading && (
          <div className="px-4 md:px-8 mt-6 flex-1 max-w-4xl">
            {/* Train Header Info */}
            <div className="backdrop-blur-xl bg-white/90 dark:bg-slate-800/90 p-7 rounded-3xl mb-8 shadow-lg border border-white/50 dark:border-slate-700/50 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-slate-800 dark:text-white text-xl font-bold mb-2">
                {trainStatus.trainNumber} - {trainStatus.trainName}
              </h3>
              <div className="flex flex-wrap gap-5 mt-4 text-sm">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <div className="p-1.5 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                     <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="font-medium">Updated: {new Date(trainStatus.lastUpdated).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <div className="p-1.5 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg">
                     <ArrowRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="font-medium">Speed: {trainStatus.speed} km/h</span>
                </div>
              </div>
            </div>

            {/* Vertical Timeline */}
            <div className="pl-2 relative">
              {trainRoute.map((stop, index) => {
                const isLast = index === trainRoute.length - 1;
                const hasDelay = trainStatus.currentDelay > 0;

                return (
                  <div key={stop.sequenceNumber} className="flex mb-8 relative group">
                    {/* Vertical Line */}
                    {!isLast && (
                      <div className="absolute left-[70px] top-7 bottom-[-32px] w-0.5 bg-slate-200 dark:bg-slate-700 z-0 transition-colors"></div>
                    )}

                    {/* Time Box */}
                    <div className="w-[60px] text-right mt-0.5 text-[14px] font-semibold text-slate-500 dark:text-slate-400">
                      <div>{stop.scheduledArrival.substring(0, 5)}</div>
                    </div>

                    {/* Node */}
                    <div className="w-4 h-4 bg-white dark:bg-slate-800 border-[3.5px] border-slate-300 dark:border-slate-500 rounded-full mx-5 mt-1.5 z-10 relative shadow-sm group-hover:border-blue-500 transition-colors"></div>

                    {/* Station Info */}
                    <div className="flex-1 pb-2">
                      <h4 className="text-base font-bold text-slate-800 dark:text-white mb-1">
                        {stop.station.stationName} <span className="text-slate-400 dark:text-slate-500 font-medium text-xs ml-1">({stop.station.stationCode})</span>
                      </h4>
                      
                      {/* Distance */}
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                        {stop.distanceFromPrevious} km from previous
                      </p>

                      {/* Display Delay */}
                      {hasDelay && index === trainRoute.length - 1 && (
                         <div className="inline-flex items-center gap-1.5 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-semibold px-2.5 py-1 rounded-md mt-1 border border-red-100 dark:border-red-800/50">
                           <Clock className="w-3.5 h-3.5" />
                           Delayed by {trainStatus.currentDelay} min
                         </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
    </div>
  );
};

export default Home;
