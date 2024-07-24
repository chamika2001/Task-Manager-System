import React, { useState } from 'react';
import TaskFormPopup from '../components/TaskFormPopup';
import TaskTable from '../components/TaskTable';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faTasks, faReceipt, faChartLine, faMailBulk, faUsers, faTrashAlt, faCog, faSignOutAlt,} from '@fortawesome/free-solid-svg-icons';

import '../styles/dashboard.css';
import '../styles/task.css';

function Task() {
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
          <Link to="/dashboard">
            <FontAwesomeIcon icon={faTachometerAlt} />
            <h3>Dashboard</h3>
          </Link>
          <Link to="/tasks" className="active">
            <FontAwesomeIcon icon={faTasks} />
            <h3>Tasks</h3>
          </Link>
          <Link to="/completed">
            <FontAwesomeIcon icon={faReceipt} />
            <h3>Completed</h3>
          </Link>
          <Link to="/in-progress">
            <FontAwesomeIcon icon={faChartLine} />
            <h3>In Progress</h3>
          </Link>
          <Link to="/to-do">
            <FontAwesomeIcon icon={faMailBulk} />
            <h3>To Do</h3>
          </Link>
          <Link to="/team">
            <FontAwesomeIcon icon={faUsers} />
            <h3>Team</h3>
          </Link>
          <Link to="/trash">
            <FontAwesomeIcon icon={faTrashAlt} />
            <h3>Trash</h3>
          </Link>
          <Link to="/settings">
            <FontAwesomeIcon icon={faCog} />
            <h3>Settings</h3>
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
