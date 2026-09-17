import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTrainRoute } from '../../api/routeApi';
import { getTrainByNumber } from '../../api/trainApi';
import { MapPin, Clock, Train as TrainIcon, Navigation } from 'lucide-react';

const RouteDetails = () => {
  const { trainNumber } = useParams();
  const [route, setRoute] = useState([]);
  const [train, setTrain] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const [routeData, trainData] = await Promise.all([
          getTrainRoute(trainNumber),
          getTrainByNumber(trainNumber).catch(() => null)
        ]);
        setRoute(routeData);
        setTrain(trainData);
      } catch (err) {
        setError('Failed to fetch route details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    if (trainNumber) {
      fetchDetails();
    }
  }, [trainNumber]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-railway-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !route || route.length === 0) {
    return (
      <div className="text-center p-8 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
        <p className="text-red-500 mb-4">{error || 'No route data found for this train.'}</p>
        <Link to="/dashboard" className="text-railway-blue hover:underline">Return to Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrainIcon className="text-railway-blue" />
              {train ? `${train.trainNumber} - ${train.trainName}` : `Train ${trainNumber}`}
            </h1>
            {train && (
              <p className="text-slate-500 dark:text-slate-400 mt-1">
                {train.source} to {train.destination} | Type: {train.trainType}
              </p>
            )}
          </div>
          <Link
            to={`/live-tracking?train=${trainNumber}`}
            className="flex items-center gap-2 px-4 py-2 bg-railway-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Navigation className="w-4 h-4" /> Live Tracking
          </Link>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Route Schedule</h2>
        
        <div className="relative border-l-2 border-slate-200 dark:border-slate-700 ml-4 space-y-8">
          {route.map((stop, index) => (
            <div key={stop.sequenceNumber} className="relative pl-8">
              {/* Timeline marker */}
              <div className={`absolute -left-[11px] top-1 w-5 h-5 rounded-full border-4 border-white dark:border-slate-800 ${index === 0 || index === route.length - 1 ? 'bg-railway-blue' : 'bg-slate-400'}`}></div>
              
              <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    {stop.station.stationName} <span className="text-sm font-normal text-slate-500">({stop.station.stationCode})</span>
                  </h3>
                  <div className="text-sm font-medium text-slate-500 bg-slate-200 dark:bg-slate-600 px-2 py-1 rounded">
                    Stop {stop.sequenceNumber}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-slate-600 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>Arr: {stop.scheduledArrival}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>Dep: {stop.scheduledDeparture}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span>{stop.distanceFromPrevious > 0 ? `+${stop.distanceFromPrevious} km` : 'Origin'}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RouteDetails;
