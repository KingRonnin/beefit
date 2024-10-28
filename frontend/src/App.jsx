import React from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import MainWrapper from './layouts/MainWrapper.jsx';
import PlanFrontPage from './views/core/Index.jsx';
import MyPlan from './views/routes/MyPlan.tsx';
import LogFitness from './views/routes/LogFitness.tsx';
import Calender from './views/routes/Calendar.jsx';
import SignIn from './views/routes/SignIn.jsx';
import Register from './views/auth/Register.jsx';




function App() {
  return (
    <>
      <BrowserRouter>
        <MainWrapper>
              <Routes>
                <Route path="/" element={<PlanFrontPage />} />
                <Route path="/myplan" element={<MyPlan />} />
                <Route path="/logfitness" element={<LogFitness />} />
                <Route path="/Calender" element={<Calender />} />
                <Route path="/SignIn" element={<SignIn />} />
                <Route path="/register" element={<Register />} />
              </Routes>
        </MainWrapper>
      </BrowserRouter>
    </>
  );
}

export default App;