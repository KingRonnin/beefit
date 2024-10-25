import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
<<<<<<< HEAD:frontend/src/App.jsx
import PlanFrontPage from './views/core/Index.jsx'; 
import MyPlan from './views/routes/MyPlan.tsx';
import LogFitness from './views/routes/LogFitness.tsx';
import Calender from './views/routes/Calendar.jsx';
import SignIn from './views/routes/SignIn.jsx';
import Header from './views/component/Header.jsx';

=======
import PlanFrontPage from './PlanFrontPage.js'; 
import MyPlan from './routes/myplan.tsx';
import LogFitness from './routes/Logfitness.tsx';
import Calender from './routes/Calendar.jsx';
import SignIn from './routes/SignIn.jsx';
import Header from './component/layout/Header.jsx';
import About from './routes/About.jsx'; 
>>>>>>> c1f93a5b010a40d06a996e5f502e12d6948fb707:src/App.js



function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<PlanFrontPage />} />
          <Route path="/myplan" element={<MyPlan />} />
          <Route path="/logfitness" element={<LogFitness />} />
          <Route path="/PlanFrontPage" element={<PlanFrontPage />} />
          <Route path="/Calender" element={<Calender />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/Header" element={<Header />} />
<<<<<<< HEAD:frontend/src/App.jsx
=======
          <Route path="/About" element={<About />} />
>>>>>>> c1f93a5b010a40d06a996e5f502e12d6948fb707:src/App.js
        </Routes>
      </div>
    </Router>
  );
}

export default App;