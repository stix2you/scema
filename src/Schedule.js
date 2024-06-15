import React, { useState, useEffect } from 'react';

const Schedule = () => {
   const [events, setEvents] = useState([]);

   useEffect(() => {
      const fetchEvents = async () => {
         try {
            const response = await fetch('/events.json');
            if (!response.ok) {
               throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setEvents(data['2024_weekend_events'][0].activities); // Adjust the data extraction as needed
         } catch (error) {
            console.error('Failed to fetch events:', error);
         }
      };

      fetchEvents();
   }, []);

   return (
      <div className="schedule">
         <h1>Event Schedule</h1>
         <div className="event-list">
            {events.map((event, index) => (
               <div key={index} className="event-card">
                  <h2>{event.activity_type}</h2>
                  <p>{event.description}</p>
                  <p><strong>Time:</strong> {event.start} - {event.end}</p>
                  <p><strong>Location:</strong> {event.location}</p>
                  <p><strong>Leader:</strong> {event.leader}</p>
               </div>
            ))}
         </div>
      </div>
   );
};

export default Schedule;
