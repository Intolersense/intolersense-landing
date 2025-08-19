import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Analysis from './pages/Analysis';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analysis" element={<Analysis />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
