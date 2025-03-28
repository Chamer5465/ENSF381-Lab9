import logo from './logo.svg';
import './App.css';
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './Login';
import HousePricePredictor from './HousePricePredictor';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/predict" element={<HousePricePredictor/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
