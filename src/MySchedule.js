// src/MySchedule.js
import React, { useState, useEffect } from 'react';

const MySchedule = () => {
   const [myEvents, setMyEvents] = useState([]);

   useEffect(() => {
      // Fetch personalized events from an API or local data source
      const fetchMyEvents = async () => {
         const response = await fetch('/api/my-events'); // Adjust the API endpoint as needed
         const data = await response.json();
         setMyEvents(data);
      };

      fetchMyEvents();
   }, []);

   return (
      <div className="my-schedule">
         <h1>My Schedule</h1>
         <div className="event-list">
            {myEvents.map(event => (
               <div key={event.id} className="event-card">
                  <h2>{event.title}</h2>
                  <p>{event.description}</p>
                  <p><strong>Time:</strong> {event.startTime} - {event.endTime}</p>
                  <p><strong>Location:</strong> {event.location}</p>
                  <a href={`/event/${event.id}`} className="details-link">View Details</a>
               </div>
            ))}
         </div>
      </div>
   );
};

export default MySchedule;
