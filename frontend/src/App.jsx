import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlanFrontPage from './views/core/Index.jsx'; 
import MyPlan from './views/routes/MyPlan.tsx';
import LogFitness from './views/routes/LogFitness.tsx';
import Calender from './views/routes/Calendar.jsx';
import SignIn from './views/routes/SignIn.jsx';




function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<PlanFrontPage />} />
          <Route path="/myplan" element={<MyPlan />} />
          <Route path="/logfitness" element={<LogFitness />} />
          <Route path="/Calender" element={<Calender />} />
          <Route path="/SignIn" element={<SignIn />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;