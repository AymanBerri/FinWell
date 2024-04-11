// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './layouts/LandingPage/LandingPage';
import Portal from './layouts/Portal/Portal';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/portal/*" element={<Portal />} />
      </Routes>
    </Router>
  );
}

export default App;
