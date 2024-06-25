import React, { useState, useEffect } from 'react';
import './Now.css';

const Now = () => {
   const [events, setEvents] = useState([]);
   const [currentEvent, setCurrentEvent] = useState(null);
   const [nextEvent, setNextEvent] = useState(null);
   const [upcomingEvents, setUpcomingEvents] = useState([]);

   useEffect(() => {
      const fetchEvents = async () => {
         try {
            const response = await fetch('/events.json'); // Ensure this path is correct
            if (!response.ok) {
               throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const activities = data['2024_weekend_events'][0].activities;

            // Simulated current time for development purposes
            const simulatedNow = new Date('2024-06-22T14:30:00'); // Change this to simulate different times

            // Adjust events to include full date for start and end times
            const adjustedActivities = activities.map(event => {
               const start = new Date(`2024-06-22T${event.start}:00`);
               const end = new Date(`2024-06-22T${event.end}:00`);
               return { ...event, start, end };
            });

            console.log('Simulated Now:', simulatedNow);
            console.log('Fetched Events:', adjustedActivities);

            // Determine the current and next events
            const current = adjustedActivities.find(
               (event) => event.start <= simulatedNow && event.end >= simulatedNow
            );
            const next = adjustedActivities.find(
               (event) => event.start > simulatedNow
            );
            const upcoming = adjustedActivities
               .filter((event) => event.start > simulatedNow)
               .slice(0, 3); // Select the next three upcoming events

            console.log('Current Event:', current);
            console.log('Next Event:', next);
            console.log('Upcoming Events:', upcoming);

            setCurrentEvent(current);
            setNextEvent(next);
            setUpcomingEvents(upcoming);
         } catch (error) {
            console.error('Failed to fetch events:', error);
         }
      };

      fetchEvents();
   }, []);

   return (
      <div className="now-container">
         <div className="now-section">
            <h2>NOW</h2>
            {currentEvent ? (
               <div className="event">
                  <h3>{currentEvent.activity_type}</h3>
                  <p>{currentEvent.end ? `${Math.round((currentEvent.end - new Date('2024-06-22T14:30:00')) / 60000)} mins remaining` : ''}</p>
                  <p>Leader: {currentEvent.leader}</p>
                  <p>Location: {currentEvent.location}</p>
               </div>
            ) : (
               <p>No ongoing event</p>
            )}
         </div>
         <div className="next-section">
            <h2>NEXT</h2>
            {nextEvent ? (
               <div className="event">
                  <h3>{nextEvent.activity_type}</h3>
                  <p>in {Math.round((nextEvent.start - new Date('2024-06-22T14:30:00')) / 60000)} mins ({nextEvent.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})</p>
                  <p>Leader: {nextEvent.leader}</p>
                  <p>Location: {nextEvent.location}</p>
               </div>
            ) : (
               <p>No upcoming event</p>
            )}
         </div>
         <div className="schedule-section">
            <h2>SCHEDULE</h2>
            {upcomingEvents.length > 0 ? (
               upcomingEvents.map((event, index) => (
                  <div key={index} className="event">
                     <p>{event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} {event.activity_type} @ {event.location}</p>
                  </div>
               ))
            ) : (
               <p>No upcoming events</p>
            )}
         </div>
      </div>
   );
};

export default Now;
