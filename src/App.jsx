// src/App.jsx
import React, { useState } from 'react';
import TourReservation from './components/TourReservation';
import Filter from './components/Filter';

const App = () => {
  const [allReservations, setAllReservations] = useState([]);

  return (
    <div className="min-h-screen bg-gray-100">
      <TourReservation setReservations={setAllReservations} />
      <Filter reservations={allReservations} />
    </div>
  );
};

export default App;
