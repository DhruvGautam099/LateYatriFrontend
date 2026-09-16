import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getTrainStatus, getTrains } from '../../api/trainApi';
import { getTrainRoute } from '../../api/routeApi';
import { getTrainLocationHistory } from '../../api/locationApi';

import L from 'leaflet';
import { MapPin, Navigation, Clock, AlertTriangle } from 'lucide-react';

// Fix Leaflet default marker icon issue
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const trainIcon = new L.DivIcon({
  html: `<div class="bg-blue-600 rounded-full w-4 h-4 border-2 border-white shadow-lg flex items-center justify-center animate-pulse"></div>`,
  className: 'custom-train-marker',
  iconSize: [16, 16],
  iconAnchor: [8, 8]
});


const LiveTracking = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const trainNumber = searchParams.get('train') || '12002';

  const [status, setStatus] = useState(null);
  const [route, setRoute] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [statusData, routeData, historyData] = await Promise.all([
          getTrainStatus(trainNumber),
          getTrainRoute(trainNumber),
          getTrainLocationHistory(trainNumber)
        ]);
        setStatus(statusData);
        setRoute(routeData);
        setHistory(historyData);
      } catch (error) {
        console.error('Error fetching live data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(() => {
      getTrainStatus(trainNumber).then(setStatus).catch(console.error);
    }, 30000); // Poll every 30 seconds

    return () => clearInterval(interval);
  }, [trainNumber]);

  const routeCoordinates = route.map((r) => [r.station.latitude, r.station.longitude]);
  const historyCoordinates = history.map((h) => [h.latitude, h.longitude]);
  // Also include the current status location as the end of the history breadcrumb
  if (status && historyCoordinates.length > 0) {
    historyCoordinates.push([status.currentLatitude, status.currentLongitude]);
  }

  return (
    <div className="space-y-4 h-[calc(100vh-10rem)] flex flex-col">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Navigation className="text-railway-blue dark:text-railway-accent" /> Live Tracking
        </h1>
        {status &&
        <div className="flex gap-4">
             <div className="bg-white dark:bg-slate-800 px-4 py-2 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-500" />
                <span className="text-sm font-medium">Speed: <span className="text-railway-blue">{status.speed.toFixed(1)} km/h</span></span>
             </div>
             <div className="bg-white dark:bg-slate-800 px-4 py-2 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-2">
                <AlertTriangle className={`w-4 h-4 ${status.currentDelay > 0 ? 'text-red-500' : 'text-green-500'}`} />
                <span className="text-sm font-medium">Delay: <span className={status.currentDelay > 0 ? 'text-red-500' : 'text-green-500'}>{status.currentDelay} min</span></span>
             </div>
          </div>
        }
      </div>

      <div className="flex-1 rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700 relative">
        {loading &&
        <div className="absolute inset-0 z-[1000] bg-white/80 dark:bg-slate-900/80 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-railway-blue border-t-transparent rounded-full animate-spin"></div>
          </div>
        }
        
        {status && route.length > 0 &&
        <MapContainer center={[status.currentLatitude, status.currentLongitude]} zoom={7} className="w-full h-full z-10">
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          
            
            <Polyline positions={routeCoordinates} color="#3b82f6" weight={3} opacity={0.5} dashArray="5, 10" />
            
            {/* Draw the actual traveled path */}
            {historyCoordinates.length > 0 && (
              <Polyline positions={historyCoordinates} color="#10b981" weight={4} opacity={0.8} />
            )}
            
            {route.map((r, i) =>
          <Marker key={i} position={[r.station.latitude, r.station.longitude]}>
                <Popup>
                  <div className="font-semibold">{r.station.stationName} ({r.station.stationCode})</div>
                  <div className="text-sm text-gray-600">Arrival: {r.scheduledArrival}</div>
                </Popup>
              </Marker>
          )}

            <Marker position={[status.currentLatitude, status.currentLongitude]} icon={trainIcon}>
              <Popup>
                <div className="font-bold text-railway-blue">{status.trainName}</div>
                <div className="text-sm">Current Speed: {status.speed.toFixed(1)} km/h</div>
                <div className="text-sm">Delay: {status.currentDelay} mins</div>
              </Popup>
            </Marker>
          </MapContainer>
        }
      </div>
    </div>);

};

export default LiveTracking;