// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt,
  faTasks,
  faReceipt,
  faChartLine,
  faMailBulk,
  faUsers,
  faTrashAlt,
  faCog,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import '../styles/dashboard.css'; // Import the regular CSS file

const Sidebar = () => {
  return (
    <aside>
      <div className="toggle">
        <div className="logo">
          <img src="/assets/images/logo.png" alt="Logo" />
          <h2>Task<span className="danger">Me</span></h2>
        </div>
        <div className="close" id="close-btn">
          <span className="material-icons">close</span>
        </div>
      </div>
      <div className="sidebar">
          <Link to="/Group-dashboard" className="active">
            <FontAwesomeIcon icon={faTachometerAlt} />
            <h3>Dashboard</h3>
          </Link>
          <Link to="/GroupTasks">
            <FontAwesomeIcon icon={faTasks} />
            <h3>Tasks</h3>
          </Link>
          <Link to="/GroupCompleted">
            <FontAwesomeIcon icon={faReceipt} />
            <h3>Completed</h3>
          </Link>
          <Link to="/GroupIn_pro">
            <FontAwesomeIcon icon={faChartLine} />
            <h3>In Progress</h3>
          </Link>
          <Link to="/GroupTodo">
            <FontAwesomeIcon icon={faMailBulk} />
            <h3>To Do</h3>
          </Link>
          <Link to="/team">
            <FontAwesomeIcon icon={faSignOutAlt} />
            <h3>Logout</h3>
          </Link>
        </div>
    </aside>
  );
};

export default Sidebar;
