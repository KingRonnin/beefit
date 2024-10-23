
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlanFrontPage from './PlanFrontPage.js'; 
import MyPlan from './routes/myplan.tsx';
import LogFitness from './routes/Logfitness.tsx';
import WeightLossPage from './routes/WeightLossPage.tsx';
import Calender from './routes/Calendar.jsx';
import SignIn from './routes/SignIn.jsx';




function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<PlanFrontPage />} />
          <Route path="/myplan" element={<MyPlan />} />
          <Route path="/logfitness" element={<LogFitness />} />
          <Route path="/PlanFrontPage" element={<PlanFrontPage />} />
          <Route path="/WeightLossPage" element={<WeightLossPage />} />
          <Route path="/Calender" element={<Calender />} />
          <Route path="/SignIn" element={<SignIn />} />
         
          
         
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
