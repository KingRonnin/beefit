import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainWrapper from "./layouts/MainWrapper.jsx";
import PlanFrontPage from "./views/core/Index.jsx";
import MyPlan from "./views/routes/MyPlan.tsx";
import LogFitness from "./views/routes/LogFitness.tsx";
import Calender from "./views/routes/Calendar.jsx";
import Register from "./views/auth/Register.jsx";
import Login from "./views/auth/Login.jsx";
import About from "./views/routes/About.jsx";
import WorkoutLog from "./views/routes/WorkoutLog.jsx";
import CoursesPage from "./views/routes/CoursesPage.jsx";
import HabitChallenges from "./views/routes/HabitChallenges.jsx";
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
import Payment from "./views/routes/Payment.jsx";
import Test from "./views/routes/test.jsx";
import PaymentPageFinal from "./views/routes/PaymentPage.jsx";
import Success from "./views/routes/Success.jsx";
import PrivateRoute from './layouts/PrivateRoute.jsx';
import WorkoutAnalysis from "./views/routes/WorkoutAnalysis.jsx";
import EquipmentPage from "./views/routes/Equipment.jsx";

// const stripePromise = loadStripe('pk_test_51QFzYyHH43Q0yRB555Wz4VOQnfH1JdDeazmNBOOfG9s53j6NOuIC9RTreaFe2lGGh31C7opLoYomj8du5EFbqr7B00zQZR4LS1');
function App() {
  return (
    <>
      <Router>
        <MainWrapper>
              <Routes>
                <Route path="/" element={<PlanFrontPage />} />
                <Route path="/myplan" element={
                  <PrivateRoute>
                    <MyPlan />
                  </PrivateRoute>
                } />
                <Route path="/logfitness" element={
                  <PrivateRoute>
                    <LogFitness />
                  </PrivateRoute>
                } />
                <Route path="/Calender" element={<Calender />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/About" element={<About />} />
                <Route path="/WorkoutLog" element={
                  <PrivateRoute>
                    <WorkoutLog />
                  </PrivateRoute>
                  } />
                <Route path='/WorkoutAnalysis' element={
                  <PrivateRoute>
                    <WorkoutAnalysis />
                  </PrivateRoute>
                } />
                <Route path="/CoursesPage" element={<CoursesPage />} />
                <Route path="/HabitChallenges" element={<HabitChallenges />} />
                <Route path="/Payment" element={<Payment amount={"500"} name={"Test Object"} />} />
                <Route path="/test" element={<Test />} />
                <Route path="/PaymentPage" element={<PaymentPageFinal />} />
                <Route path="/Success" element={<Success  />} />
                <Route path="/Payment/:paymentInfo" element={<Payment />} />
                <Route path="/EquipmentPage" element={<EquipmentPage />} />
              </Routes>
        </MainWrapper>
      </Router>
    </>
  );
}

export default App;
