import React, { useEffect, useRef } from 'react';
import RightSection from './RightSection';
import dash from '../styles/dashboard.css';

const DashboardLogic = () => {
  const sideMenuRef = useRef(null);

  useEffect(() => {
    const sideMenu = sideMenuRef.current;

    if (sideMenu) {
      sideMenu.style.display = 'block'; // Adjust as needed for your layout
    }

    // Clean up if necessary
    return () => {};
  }, []);

  return (
    <div className="dashboard">
      {/* Render the RightSection which contains the dark mode switch */}
      <RightSection />
      {/* Other dashboard content */}
      <div className="dashboard-content">
        {/* Add the content that was previously in your dashboard here */}
      </div>
    </div>
  );
};

export default DashboardLogic;

