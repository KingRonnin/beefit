// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FrontPage from './FrontPage.js'; 
import MyPlan from './routes/myplan.tsx';
import LogFitness from './routes/Logfitness.tsx' ;


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/myplan" element={<MyPlan />} />
          <Route path="/logfitness" element={<LogFitness />} />
        
        </Routes>
      </div>
    </Router>
  );
}

export default App;
