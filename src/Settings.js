import React, { useState } from 'react';

const Settings = () => {
   const [notificationsEnabled, setNotificationsEnabled] = useState(true);
   const [offlineModeEnabled, setOfflineModeEnabled] = useState(false);

   const handleNotificationsChange = () => {
      setNotificationsEnabled(!notificationsEnabled);
   };

   const handleOfflineModeChange = () => {
      setOfflineModeEnabled(!offlineModeEnabled);
   };

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
      </div>
   );
};

export default Settings;
