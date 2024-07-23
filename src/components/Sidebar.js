// src/components/Sidebar.js
import React from 'react';
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
        <a href="#" className="active">
          <FontAwesomeIcon icon={faTachometerAlt} />
          <h3>Dashboard</h3>
        </a>
        <a href="#">
          <FontAwesomeIcon icon={faTasks} />
          <h3>Task</h3>
        </a>
        <a href="#">
          <FontAwesomeIcon icon={faShoppingCart} />
          <h3>Cart</h3>
        </a>
        <a href="#">
          <FontAwesomeIcon icon={faChartLine} />
          <h3>Analysis</h3>
        </a>
        <a href="#">
          <FontAwesomeIcon icon={faPlus} />
          <h3>Add New</h3>
        </a>
        <a href="#">
          <FontAwesomeIcon icon={faQuestionCircle} />
          <h3>Support</h3>
        </a>
        <a href="#">
          <FontAwesomeIcon icon={faSignOutAlt} />
          <h3>Logout</h3>
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
