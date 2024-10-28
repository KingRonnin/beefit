
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlanFrontPage from './PlanFrontPage.js'; 
import MyPlan from './routes/myplan.tsx';
import LogFitness from './routes/Logfitness.tsx';

import SignIn from './routes/SignIn.jsx';
import Header from './component/layout/Header.jsx';
import About from './routes/About.jsx'; 



function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<PlanFrontPage />} />
          <Route path="/myplan" element={<MyPlan />} />
          <Route path="/logfitness" element={<LogFitness />} />
          <Route path="/PlanFrontPage" element={<PlanFrontPage />} />
      
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/Header" element={<Header />} />
          <Route path="/About" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
