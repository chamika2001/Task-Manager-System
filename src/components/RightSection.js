import React, { useEffect, useRef, useState } from 'react';
import { getAuth } from '../components/useAuth';
import { getDatabase, ref, get } from 'firebase/database';
import '../styles/dashboard.css'; // Import the regular CSS file

const RightSection = () => {
  const darkModeRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: 'Pasindu', // Default value
    profilePicture: '/assets/images/profile-2.jpg' // Default value
  });

  useEffect(() => {
    const darkMode = darkModeRef.current;

    if (darkMode) {
      darkMode.addEventListener('click', toggleDarkMode);
    }

    return () => {
      if (darkMode) darkMode.removeEventListener('click', toggleDarkMode);
    };
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const db = getDatabase();
        const userRef = ref(db, 'userDetails/' + user.uid);

        try {
          const snapshot = await get(userRef);
          if (snapshot.exists()) {
            setUserDetails(snapshot.val());
          } else {
            console.log('No user data found');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserDetails();
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
            <p>Hey, <b>{userDetails.name}</b></p>
          </div>
        </div>
      </div>

      <br />
      <div className="right-section-content">
        <div className="user-profile-single">
          <div className="logo">
            <img src={userDetails.profileImage} alt="Profile" />
          </div>
        </div>
        <br /><br />
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
