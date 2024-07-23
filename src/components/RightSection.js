// src/components/RightSection.js
import React, { useEffect, useRef, useState } from 'react';
import '../styles/dashboard.css'; // Import the regular CSS file

const RightSection = () => {
  const darkModeRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkMode = darkModeRef.current;

    if (darkMode) {
      darkMode.addEventListener('click', toggleDarkMode);
    }

    return () => {
      if (darkMode) darkMode.removeEventListener('click', toggleDarkMode);
    };
  }, []);

  const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode-variables');
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className="right-section">
      <div className="nav">
        <div className="dark-mode" ref={darkModeRef}>
          <span className={`material-icons ${isDarkMode ? '' : 'active'}`}>light_mode</span>
          <span className={`material-icons ${isDarkMode ? 'active' : ''}`}>dark_mode</span>
        </div>
        <div className="profile">
          <div className="info">
            <p>Hey, <b>Pasindu</b></p>
          </div>
        </div>
      </div>

      {/* Other elements in the right section */}
      <div className="right-section-content">
        <div className="user-profile">
          <div className="logo">
            <img src="/assets/images/profile-2.jpg" alt="Profile" />
            <h2>Pasindu Dilshan</h2>
            <p>Fullstack Web Developer</p>
          </div>
        </div>
        
        <div className="reminders">
          <div className="header">
            <h2>Reminders</h2>
            <span className="material-icons">notifications_none</span>
          </div>
          <div className="notification">
            <div className="icon">
              <span className="material-icons">volume_up</span>
            </div>
            <div className="content">
              <div className="info">
                <h3>Workshop</h3>
                <small className="text-muted">08:00 AM - 12:00 PM</small>
              </div>
              <span className="material-icons">more_vert</span>
            </div>
          </div>
          <div className="notification add-reminder">
            <div>
              <span className="material-icons">add</span>
              <h3>Add Reminder</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSection;
