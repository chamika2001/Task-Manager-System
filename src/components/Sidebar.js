// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faTasks, faShoppingCart, faChartLine, faPlus, faQuestionCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
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
        <Link to="/dashboard" className="active">
          <FontAwesomeIcon icon={faTachometerAlt} />
          <h3>Dashboard</h3>
        </Link>
        <Link to="/tasks" >
          <FontAwesomeIcon icon={faTasks} />
          <h3>Task</h3>
        </Link>
        <Link to="/cart">
          <FontAwesomeIcon icon={faShoppingCart} />
          <h3>Completed</h3>
        </Link>
        <Link to="/analysis">
          <FontAwesomeIcon icon={faChartLine} />
          <h3>In Progress</h3>
        </Link>
        <Link to="/add-new">
          <FontAwesomeIcon icon={faPlus} />
          <h3>To Do</h3>
        </Link>
        <Link to="/support">
          <FontAwesomeIcon icon={faQuestionCircle} />
          <h3>Team</h3>
        </Link>
        <Link to="/support">
          <FontAwesomeIcon icon={faQuestionCircle} />
          <h3>Trash</h3>
        </Link>
        <Link to="/support">
          <FontAwesomeIcon icon={faQuestionCircle} />
          <h3>Setting</h3>
        </Link>
        <Link to="/logout">
          <FontAwesomeIcon icon={faSignOutAlt} />
          <h3>Logout</h3>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
