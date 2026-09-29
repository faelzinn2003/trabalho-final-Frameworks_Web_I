import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Converter from './pages/Converter';
import CoinDetail from './pages/CoinDetail';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/conversor" element={<Converter />} />
        <Route path="/moeda/:id" element={<CoinDetail />} />
      </Routes>
    </Router>
  );
}