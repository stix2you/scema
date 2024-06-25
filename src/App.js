import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, NavLink } from 'react-router-dom';
import { FaCalendarAlt, FaUser, FaQrcode, FaCog } from 'react-icons/fa';
import Now from './Now';
import Schedule from './Schedule';
import MySchedule from './MySchedule';
import EventDetails from './EventDetails';
import Settings from './Settings';
import './App.css';

function App() {
   const [groupSelections, setGroupSelections] = useState({
      'All': true,
      'Catering Team': false,
      'Medic': false,
      'Scouts': false,
      'Adults': false,
      'Special 1': false,
      'Special 2': false,
   });

   return (
      <Router>
         <div className="App">
            <header className="App-header">
               <img src="./scouts-logo.png" className="App-logo" alt="Scouts Logo" />
               <h1>Scout Camp Event Management App</h1>
            </header>
            <main>
               <Routes>
                  <Route path="/" element={<Navigate to="/now" />} />
                  <Route path="/now" element={<Now />} />
                  <Route path="/schedule" element={<Schedule />} />
                  <Route path="/my-schedule" element={<MySchedule userName="Fraser Hewson" groupSelections={groupSelections} />} />
                  <Route path="/event/:id" element={<EventDetails />} />
                  <Route path="/settings" element={<Settings groupSelections={groupSelections} setGroupSelections={setGroupSelections} />} />
                  <Route path="*" element={<Navigate to="/now" />} />
               </Routes>
            </main>
            <nav className="bottom-nav">
               <NavLink to="/now" className="nav-link">
                  <FaQrcode />
                  <span>Now</span>
               </NavLink>
               <NavLink to="/schedule" className="nav-link">
                  <FaCalendarAlt />
                  <span>Schedule</span>
               </NavLink>
               <NavLink to="/my-schedule" className="nav-link">
                  <FaUser />
                  <span>My Schedule</span>
               </NavLink>
               <NavLink to="/settings" className="nav-link">
                  <FaCog />
                  <span>Settings</span>
               </NavLink>
            </nav>
         </div>
      </Router>
   );
}

export default App;
