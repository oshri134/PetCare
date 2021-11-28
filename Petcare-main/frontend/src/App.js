import React from "react";
import './App.css';
import { Routes, Route } from "react-router-dom";
import CreateAppointment from './page/CreateAppointment/CreateAppointemnt'
import LogOut from "./Components/LogOut/LogOut";
import ScheduleTable from "./page/ScheduleTable/ScheduleTable";
import Profile from "./page/Profile/Profile";



function App() {

  return (
    <>
      <Routes>
        <Route path="Schedule" element={<ScheduleTable />} />
        <Route path="Profile" element={<Profile />} />
        <Route path="/Logout" element={<LogOut />} />
        <Route path="/CreateAppointment" element={<CreateAppointment />} />




      </Routes>
    </>
  );
}

export default App;
