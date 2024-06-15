import React, { useState } from 'react';

const Settings = ({ groupSelections, setGroupSelections }) => {
   const [notificationsEnabled, setNotificationsEnabled] = useState(true);
   const [offlineModeEnabled, setOfflineModeEnabled] = useState(false);

   const handleNotificationsChange = () => {
      setNotificationsEnabled(!notificationsEnabled);
   };

   const handleOfflineModeChange = () => {
      setOfflineModeEnabled(!offlineModeEnabled);
   };

   const handleGroupChange = (group) => {
      setGroupSelections((prevSelections) => ({
         ...prevSelections,
         [group]: !prevSelections[group],
      }));
   };

   const groups = [
      'All',
      'Catering Team',
      'Medic',
      'Scouts',
      'Adults',
      'Special 1',
      'Special 2',
   ];

   return (
      <div className="settings">
         <h1>Settings</h1>
         <div className="setting-option">
            <label>
               <input
                  type="checkbox"
                  checked={notificationsEnabled}
                  onChange={handleNotificationsChange}
               />
               Enable Notifications
            </label>
         </div>
         <div className="setting-option">
            <label>
               <input
                  type="checkbox"
                  checked={offlineModeEnabled}
                  onChange={handleOfflineModeChange}
               />
               Enable Offline Mode
            </label>
         </div>
         <div className="setting-option">
            <h2>Group Affiliations</h2>
            {groups.map((group) => (
               <label key={group}>
                  <input
                     type="checkbox"
                     checked={groupSelections[group] || false}
                     onChange={() => handleGroupChange(group)}
                  />
                  {group}
               </label>
            ))}
         </div>
      </div>
   );
};

export default Settings;
