import React, { useState } from 'react';
import TaskFormPopup from '../components/TaskFormPopup';
import TaskTable from '../components/TaskTable';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faTasks, faShoppingCart, faChartLine, faPlus, faQuestionCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import  '../styles/dashboard.css';

function Task(){

        const [showPopup, setShowPopup] = useState(false);
      
        const togglePopup = () => {
          setShowPopup(!showPopup);
        }
        
  return (
    <div className="container">
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
      <Link to="/dashboard" >
        <FontAwesomeIcon icon={faTachometerAlt} />
        <h3>Dashboard</h3>
      </Link>
      <Link to="/tasks" className="active">
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
    <div className="table-container">
        <TaskTable />
        <button id="open-popup" onClick={togglePopup}>Add Task</button>
      </div>
      {showPopup && <TaskFormPopup togglePopup={togglePopup} />}

    </div>
  );
}

export default Task;