import React, { useState } from 'react';
import { Search as SearchIcon, Train as TrainIcon, Clock, AlertTriangle, MapPin, Navigation } from 'lucide-react';
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
    <div className="w-full flex flex-col bg-slate-50 min-h-screen dark:bg-slate-900 pb-16">
        
        {/* Header - Solid Blue Utilitarian Header */}
        <div className="bg-railway-blue text-white pt-8 pb-14 px-4 sm:px-6 lg:px-8 shadow-sm">
          <div className="max-w-4xl mx-auto flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <TrainIcon className="w-9 h-9" />
              <div>
                 <h1 className="text-3xl font-bold tracking-tight">Spot Your Train</h1>
                 <p className="text-blue-100 text-sm mt-1 font-medium">Live running status & accurate schedule</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search Container */}
        <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-2 shadow-lg shadow-black/5 border border-slate-200 dark:border-slate-700">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 flex items-center bg-transparent rounded-lg focus-within:bg-blue-50/50 dark:focus-within:bg-slate-900/50 transition-colors px-3 py-1">
                <SearchIcon className="text-slate-400 w-5 h-5 ml-1" />
                <input
                  type="text"
                  placeholder="Enter Train Number (e.g. 12002) or Name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none w-full ml-3 text-slate-800 dark:text-slate-100 placeholder-slate-400 py-3 text-[17px] font-medium"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto bg-railway-accent hover:bg-[#e67300] text-white font-bold py-3.5 px-8 rounded-lg shadow-sm active:scale-[0.98] transition-transform disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {loading ? 'Searching...' : 'Find Train'}
              </button>
            </form>
          </div>
        </div>

        <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex flex-col flex-1">
          {/* Error States */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 p-4 rounded-lg flex items-center gap-3 mb-6 shadow-sm">
              <AlertTriangle className="w-5 h-5 flex-shrink-0" />
              <p className="font-medium text-sm">{error}</p>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex-1 flex flex-col items-center justify-center py-20 text-slate-500 dark:text-slate-400">
              <div className="w-8 h-8 border-4 border-slate-200 dark:border-slate-700 border-t-railway-blue rounded-full animate-spin mb-4"></div>
              <p className="font-medium">Fetching live status...</p>
            </div>
          )}

          {/* Timeline Container */}
          {trainStatus && trainRoute.length > 0 && !loading && (
            <div className="flex-1 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
              
              {/* Train Header Info - Clean & Solid */}
              <div className="bg-slate-50 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-700 p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                   <h3 className="text-slate-900 dark:text-white text-xl font-bold flex items-center gap-2">
                     <span className="bg-railway-blue text-white px-2 py-0.5 rounded text-sm font-mono tracking-wider">{trainStatus.trainNumber}</span>
                     {trainStatus.trainName}
                   </h3>
                   {trainStatus.currentDelay > 0 ? (
                      <span className="inline-flex items-center gap-1.5 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-sm font-bold px-2.5 py-1 rounded">
                         <Clock className="w-4 h-4" />
                         Delayed {trainStatus.currentDelay} min
                      </span>
                   ) : (
                      <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-sm font-bold px-2.5 py-1 rounded">
                         <Clock className="w-4 h-4" />
                         On Time
                      </span>
                   )}
                </div>
                
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600 dark:text-slate-400 mt-2">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>Updated: <strong>{new Date(trainStatus.lastUpdated).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Navigation className="w-4 h-4 text-slate-400" />
                    <span>Speed: <strong>{trainStatus.speed} km/h</strong></span>
                  </div>
                </div>
              </div>

              {/* Vertical Timeline - Utilitarian Railway style */}
              <div className="p-4 sm:p-6 pb-2 relative">
                {trainRoute.map((stop, index) => {
                  const isLast = index === trainRoute.length - 1;
                  // In a real app we'd mark passed/upcoming stations. We'll simplify visually here.
                  
                  return (
                    <div key={stop.sequenceNumber} className="flex relative min-h-[70px]">
                      {/* Vertical Line */}
                      {!isLast && (
                        <div className="absolute left-[72px] sm:left-[88px] top-6 bottom-[-24px] w-1 bg-slate-300 dark:bg-slate-600 z-0"></div>
                      )}

                      {/* Time Column */}
                      <div className="w-[60px] sm:w-[76px] flex flex-col pt-1.5 text-right">
                        <span className="text-[14px] sm:text-[15px] font-bold text-slate-800 dark:text-slate-200">
                          {stop.scheduledArrival.substring(0, 5)}
                        </span>
                      </div>

                      {/* Node Indicator */}
                      <div className="w-5 h-5 bg-white dark:bg-slate-800 border-[4px] border-slate-400 dark:border-slate-500 rounded-full mx-4 sm:mx-6 mt-1.5 z-10 relative"></div>

                      {/* Station Info */}
                      <div className="flex-1 pb-6 pt-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
                          <h4 className="text-[15px] sm:text-[16px] font-bold text-slate-800 dark:text-white leading-tight">
                            {stop.station.stationName} 
                            <span className="text-slate-500 dark:text-slate-400 font-medium text-[13px] ml-1.5 font-mono">
                              ({stop.station.stationCode})
                            </span>
                          </h4>
                          
                          {/* Platform (Placeholder logic) */}
                          <div className="text-[12px] font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/50 px-2 py-0.5 rounded sm:ml-auto w-fit border border-slate-200 dark:border-slate-700">
                            PF {Math.floor(Math.random() * 5) + 1}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 mt-1">
                           <span className="text-[13px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                              {stop.distanceFromPrevious} km from previous
                           </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
    </div>
  );
};

export default Home;
