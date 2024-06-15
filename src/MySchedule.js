import React, { useState, useEffect } from 'react';

const MySchedule = ({ userName = 'Fraser Hewson', groupSelections = {} }) => {
   const [events, setEvents] = useState([]);
   const [filteredEvents, setFilteredEvents] = useState([]);

   useEffect(() => {
      // Fetch events from the local JSON file
      const fetchEvents = async () => {
         try {
            const response = await fetch('/events.json'); // Ensure this path is correct
            if (!response.ok) {
               throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setEvents(data['2024_weekend_events'][0].activities);
         } catch (error) {
            console.error('Failed to fetch events:', error);
         }
      };

      fetchEvents();
   }, []);

   useEffect(() => {
      const selectedGroups = Object.keys(groupSelections).filter(
         (group) => groupSelections[group]
      );

      const filtered = events.filter((event) => {
         return (
            event.leader === userName ||
            event.support === userName ||
            selectedGroups.includes(event.leader) ||
            selectedGroups.includes(event.support)
         );
      });

      setFilteredEvents(filtered);
   }, [events, userName, groupSelections]);

   return (
      <div className="my-schedule">
         <h1>My Schedule</h1>
         <div className="event-list">
            {filteredEvents.map((event, index) => (
               <div key={index} className="event-card">
                  <h2>{event.activity_type}</h2>
                  <p>{event.description}</p>
                  <p><strong>Time:</strong> {event.start} - {event.end}</p>
                  <p><strong>Location:</strong> {event.location}</p>
                  <p><strong>Leader:</strong> {event.leader}</p>
                  <p><strong>Support:</strong> {event.support}</p>
               </div>
            ))}
         </div>
      </div>
   );
};

export default MySchedule;
