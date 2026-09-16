import React, { useState, useEffect } from 'react';
import { getTrains } from '../../api/trainApi';
import { getStations } from '../../api/stationApi';
import { predictETA } from '../../api/etaApi';

import { Calculator, Clock, MapPin, AlertCircle, RefreshCw } from 'lucide-react';

const PredictETA = () => {
  const [trains, setTrains] = useState([]);
  const [stations, setStations] = useState([]);

  const [selectedTrain, setSelectedTrain] = useState('');
  const [selectedStation, setSelectedStation] = useState('');

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([getTrains(), getStations()]).then(([t, s]) => {
      setTrains(t);
      setStations(s);
    });
  }, []);

  const handlePredict = async () => {
    if (!selectedTrain || !selectedStation) return;

    setLoading(true);
    setError('');
    try {
      const result = await predictETA(selectedTrain, selectedStation);
      setPrediction(result);
    } catch (err) {
      setError('Unable to generate ETA prediction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Predict Train ETA</h1>
        <p className="text-slate-500 dark:text-slate-400">Powered by advanced machine learning models for accurate railway predictions.</p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Select Train</label>
            <select
              className="w-full rounded-lg border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white p-2.5 outline-none focus:ring-2 focus:ring-railway-blue"
              value={selectedTrain}
              onChange={(e) => setSelectedTrain(e.target.value)}>
              
              <option value="">-- Select Train --</option>
              {trains.map((t) =>
              <option key={t.trainNumber} value={t.trainNumber}>{t.trainNumber} - {t.trainName}</option>
              )}
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Select Destination Station</label>
            <select
              className="w-full rounded-lg border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white p-2.5 outline-none focus:ring-2 focus:ring-railway-blue"
              value={selectedStation}
              onChange={(e) => setSelectedStation(e.target.value)}>
              
              <option value="">-- Select Station --</option>
              {stations.map((s) =>
              <option key={s.stationCode} value={s.stationCode}>{s.stationName} ({s.stationCode})</option>
              )}
            </select>
          </div>
        </div>

        <button
          onClick={handlePredict}
          disabled={!selectedTrain || !selectedStation || loading}
          className="w-full py-3 bg-railway-blue hover:bg-blue-800 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
          
          {loading ? <RefreshCw className="animate-spin w-5 h-5" /> : <Calculator className="w-5 h-5" />}
          {loading ? 'Analyzing Data...' : 'Generate Prediction'}
        </button>
      </div>

      {error &&
      <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-5 h-5" />
          <p>{error}</p>
        </div>
      }

      {prediction && !loading &&
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-gradient-to-br from-blue-500 to-railway-blue rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-2xl"></div>
            <Clock className="w-8 h-8 mb-4 opacity-80" />
            <p className="text-blue-100 font-medium">Remaining ETA</p>
            <p className="text-4xl font-bold">{prediction.predictedEtaMinutes.toFixed(0)} <span className="text-xl font-normal opacity-80">mins</span></p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="p-3 bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 rounded-lg w-fit mb-4">
              <MapPin className="w-6 h-6" />
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">Predicted Arrival Time</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
              {new Date(prediction.predictedArrival).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="p-3 bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 rounded-lg w-fit mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">Predicted Delay</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1 text-red-600 dark:text-red-400">
              {prediction.predictedDelay} mins
            </p>
          </div>
        </div>
      }
    </div>);

};

export default PredictETA;