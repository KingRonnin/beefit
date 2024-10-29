import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainWrapper from './layouts/MainWrapper.jsx';
import PlanFrontPage from './views/core/Index.jsx';
import MyPlan from './views/routes/MyPlan.tsx';
import LogFitness from './views/routes/LogFitness.tsx';
import Calender from './views/routes/Calendar.jsx';
import SignIn from './views/routes/SignIn.jsx';
import Register from './views/auth/Register.jsx';
import Login from './views/auth/Login.jsx';
import About from './views/routes/About.jsx';





function App() {
  return (
    <>
      <Router>
        <MainWrapper>
              <Routes>
                <Route path="/" element={<PlanFrontPage />} />
                <Route path="/myplan" element={<MyPlan />} />
                <Route path="/logfitness" element={<LogFitness />} />
                <Route path="/Calender" element={<Calender />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path='/about' element={<About />} />
              </Routes>
        </MainWrapper>
      </Router>
    </>
  );
}

export default App;