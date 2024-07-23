import React from 'react';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import RightSection from '../components/RightSection';
import DashboardLogic from '../components/DashboardLogic';
import  '../styles/dashboard.css';

function Dashboard() {
  return (
    <div className="container">
      <Sidebar />
      <MainContent />
      <RightSection />
      <DashboardLogic />
    </div>
  );
}

export default Dashboard;