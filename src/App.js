import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, NavLink } from 'react-router-dom';
import { FaCalendarAlt, FaUser, FaQrcode, FaCog } from 'react-icons/fa';
import QRScanner from './QRScanner';
import Schedule from './Schedule';
import MySchedule from './MySchedule';
import EventDetails from './EventDetails';
import Settings from './Settings';
import './App.css';

function App() {
   return (
      <Router>
         <div className="App">
            <header className="App-header">
               <img src="/scouts-logo.png" className="App-logo" alt="Scouts Logo" />
               <h1>Scout Camp Event Management App</h1>
            </header>
            <main>
               <Routes>
                  <Route path="/" element={<Navigate to="/schedule" />} />
                  <Route path="/scan" element={<QRScanner />} />
                  <Route path="/schedule" element={<Schedule />} />
                  <Route path="/my-schedule" element={<MySchedule />} />
                  <Route path="/event/:id" element={<EventDetails />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="*" element={<Navigate to="/schedule" />} />
               </Routes>
            </main>
            <nav className="bottom-nav">
               <NavLink to="/schedule" className="nav-link">
                  <FaCalendarAlt />
                  <span>Schedule</span>
               </NavLink>
               <NavLink to="/my-schedule" className="nav-link">
                  <FaUser />
                  <span>My Schedule</span>
               </NavLink>
               <NavLink to="/scan" className="nav-link">
                  <FaQrcode />
                  <span>Scan QR</span>
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
