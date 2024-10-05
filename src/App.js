import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FrontPage from './FrontPage.js'; 
import MyPlan from './routes/myplan.tsx';

function App() {
  return (
    <div>
      <MyPlan /> {}
    </div>
  );
}

export default App;
