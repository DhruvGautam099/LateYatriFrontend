export const mockTrains = [
{ id: 1, trainNumber: '12002', trainName: 'NDLS - BPL S', trainType: 'Shtb', source: 'NDLS', destination: 'HBJ' },
{ id: 2, trainNumber: '12951', trainName: 'MUMBAI RAJDHANI', trainType: 'Raj', source: 'MMCT', destination: 'NDLS' },
{ id: 3, trainNumber: '12269', trainName: 'MAS NZM DURONTO', trainType: 'Drnt', source: 'MAS', destination: 'NZM' }];


export const mockStations = [
{ id: 1, stationCode: 'NDLS', stationName: 'New Delhi', latitude: 28.6429, longitude: 77.2191 },
{ id: 2, stationCode: 'MTJ', stationName: 'Mathura Junction', latitude: 27.4924, longitude: 77.6737 },
{ id: 3, stationCode: 'AGC', stationName: 'Agra Cantt', latitude: 27.1592, longitude: 77.9942 },
{ id: 4, stationCode: 'DHO', stationName: 'Dholpur Junction', latitude: 26.6976, longitude: 77.8860 },
{ id: 5, stationCode: 'MRA', stationName: 'Morena', latitude: 26.4950, longitude: 77.9984 },
{ id: 6, stationCode: 'GWL', stationName: 'Gwalior Junction', latitude: 26.2081, longitude: 78.1884 },
{ id: 7, stationCode: 'JHS', stationName: 'Jhansi Junction', latitude: 25.4484, longitude: 78.5830 },
{ id: 8, stationCode: 'LAR', stationName: 'Lalitpur Junction', latitude: 24.6865, longitude: 78.4116 },
{ id: 9, stationCode: 'BPL', stationName: 'Bhopal Junction', latitude: 23.2599, longitude: 77.4126 },
{ id: 10, stationCode: 'HBJ', stationName: 'Habibganj', latitude: 23.2088, longitude: 77.4390 }];


export const mockRoutes = {
  '12002': [
  { sequenceNumber: 1, scheduledArrival: '06:00:00', scheduledDeparture: '06:00:00', distanceFromPrevious: 0, station: mockStations[0] },
  { sequenceNumber: 2, scheduledArrival: '07:20:00', scheduledDeparture: '07:22:00', distanceFromPrevious: 141, station: mockStations[1] },
  { sequenceNumber: 3, scheduledArrival: '08:00:00', scheduledDeparture: '08:05:00', distanceFromPrevious: 54, station: mockStations[2] },
  { sequenceNumber: 4, scheduledArrival: '08:45:00', scheduledDeparture: '08:47:00', distanceFromPrevious: 53, station: mockStations[3] },
  { sequenceNumber: 5, scheduledArrival: '09:10:00', scheduledDeparture: '09:12:00', distanceFromPrevious: 27, station: mockStations[4] },
  { sequenceNumber: 6, scheduledArrival: '09:40:00', scheduledDeparture: '09:45:00', distanceFromPrevious: 39, station: mockStations[5] },
  { sequenceNumber: 7, scheduledArrival: '11:00:00', scheduledDeparture: '11:08:00', distanceFromPrevious: 98, station: mockStations[6] },
  { sequenceNumber: 8, scheduledArrival: '12:05:00', scheduledDeparture: '12:07:00', distanceFromPrevious: 90, station: mockStations[7] },
  { sequenceNumber: 9, scheduledArrival: '13:50:00', scheduledDeparture: '13:55:00', distanceFromPrevious: 201, station: mockStations[8] },
  { sequenceNumber: 10, scheduledArrival: '14:20:00', scheduledDeparture: '14:20:00', distanceFromPrevious: 10, station: mockStations[9] }]

};

export const getMockTrainStatus = (trainNumber) => {
  const train = mockTrains.find((t) => t.trainNumber === trainNumber) || mockTrains[0];
  const now = new Date();
  const nextArrival = new Date(now.getTime() + 65.73 * 60000); // approx 65 mins

  return {
    trainNumber: train.trainNumber,
    trainName: train.trainName,
    currentLatitude: 25.4484 + (Math.random() - 0.5) * 0.1, // Near Jhansi for 12002
    currentLongitude: 78.5830 + (Math.random() - 0.5) * 0.1,
    speed: 82.5 + Math.random() * 10 - 5,
    currentDelay: 10 + Math.floor(Math.random() * 20),
    lastUpdated: now.toISOString(),
    predictedArrival: nextArrival.toISOString(),
    predictedDelay: 90
  };
};

export const getMockLocationHistory = (trainNumber) => {
  return [
  { latitude: 27.1592, longitude: 77.9942, speed: 75, currentDelay: 0, timestamp: new Date(Date.now() - 3600000).toISOString() },
  { latitude: 26.2081, longitude: 78.1884, speed: 85, currentDelay: 5, timestamp: new Date(Date.now() - 1800000).toISOString() },
  { latitude: 25.4484, longitude: 78.5830, speed: 82.5, currentDelay: 10, timestamp: new Date().toISOString() }];

};

export const getMockETAPrediction = (trainNumber, stationCode) => {
  const train = mockTrains.find((t) => t.trainNumber === trainNumber) || mockTrains[0];
  const station = mockStations.find((s) => s.stationCode === stationCode) || mockStations[8];
  const now = new Date();

  return {
    id: Math.floor(Math.random() * 100),
    predictedArrival: new Date(now.getTime() + 65.73 * 60000).toISOString(),
    predictedDelay: 90,
    predictedEtaMinutes: 65.73,
    predictionTime: now.toISOString(),
    station: station,
    train: train
  };
};

export const mockJourneyHistory = [
{ id: 1, journeyDate: '2026-09-08', station: mockStations[8], train: mockTrains[0], scheduledArrival: '13:50:00', actualArrival: '14:10:00', arrivalDelay: 20, scheduledDeparture: '13:55:00', actualDeparture: '14:15:00', departureDelay: 20 },
{ id: 2, journeyDate: '2026-09-09', station: mockStations[8], train: mockTrains[0], scheduledArrival: '13:50:00', actualArrival: '15:20:00', arrivalDelay: 90, scheduledDeparture: '13:55:00', actualDeparture: '15:25:00', departureDelay: 90 }];

// -------------------------------------------------------------
// MOCK AUTHENTICATION LOGIC
// -------------------------------------------------------------

export let mockUsers = [
  { id: 1, name: 'Admin User', email: 'admin@lateyatri.com', password: 'password123', role: 'ADMIN' },
  { id: 2, name: 'Test User', email: 'user@lateyatri.com', password: 'password123', role: 'USER' }
];

export const mockLogin = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find(u => u.email === email && u.password === password);
      if (user) {
        // Return a mock JWT and user object (without password)
        const { password, ...userProfile } = user;
        resolve({
          token: `mock-jwt-token-for-${userProfile.id}-${Date.now()}`,
          user: userProfile
        });
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 500);
  });
};

export const mockRegister = (email, password, name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (mockUsers.find(u => u.email === email)) {
        reject(new Error('Email already exists'));
      } else {
        const newUser = {
          id: mockUsers.length + 1,
          name,
          email,
          password,
          role: 'USER'
        };
        mockUsers.push(newUser);
        
        const { password: _, ...userProfile } = newUser;
        resolve({
          token: `mock-jwt-token-for-${userProfile.id}-${Date.now()}`,
          user: userProfile
        });
      }
    }, 500);
  });
};

// -------------------------------------------------------------
// MOCK ADMIN CRUD LOGIC
// -------------------------------------------------------------

export const mockAddTrain = (trainData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newTrain = { id: mockTrains.length + 1, ...trainData };
      mockTrains.push(newTrain);
      resolve(newTrain);
    }, 500);
  });
};

export const mockUpdateTrain = (id, trainData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockTrains.findIndex(t => t.id === parseInt(id));
      if (index !== -1) {
        mockTrains[index] = { ...mockTrains[index], ...trainData };
        resolve(mockTrains[index]);
      } else {
        reject(new Error('Train not found'));
      }
    }, 500);
  });
};

export const mockDeleteTrain = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockTrains.findIndex(t => t.id === parseInt(id));
      if (index !== -1) {
        mockTrains.splice(index, 1);
        resolve({ success: true });
      } else {
        reject(new Error('Train not found'));
      }
    }, 500);
  });
};