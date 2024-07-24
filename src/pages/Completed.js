import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faTasks, faReceipt, faChartLine, faMailBulk, faUsers, faTrashAlt, faCog, faSignOutAlt,} from '@fortawesome/free-solid-svg-icons';
import '../styles/completed.css';

function Completed() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch completed tasks from the server or database
    const fetchCompletedTasks = async () => {
      // Replace with actual fetch logic
      const response = await fetch('/api/completed-tasks');
      const data = await response.json();
      setTasks(data);
    };

    fetchCompletedTasks();
  }, []);

  const handleDelete = (taskId) => {
    // Add delete logic here
    console.log('Deleting task with id:', taskId);
  };

  return (
    <div className="container">
      {/* Sidebar Section */}
      <aside>
        <div className="toggle">
          <div className="logo">
            <img src="/assets/images/logo.png" alt="Logo" />
            <h2>
              Task<span className="danger">Me</span>
            </h2>
          </div>
          <div className="close" id="close-btn">
            <span className="material-icons-sharp">close</span>
          </div>
        </div>
        <div className="sidebar">
          <Link to="/dashboard">
            <FontAwesomeIcon icon={faTachometerAlt} />
            <h3>Dashboard</h3>
          </Link>
          <Link to="/tasks">
            <FontAwesomeIcon icon={faTasks} />
            <h3>Tasks</h3>
          </Link>
          <Link to="/completed" className="active">
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
      {/* End of Sidebar Section */}

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>No</th> {/* Task number column */}
              <th>Title</th>
              <th>Description</th>
              <th>Date</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Image</th>
              <th>Delete task</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={task.id}>
                <td>{index + 1}</td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.date}</td>
                <td>{task.priority}</td>
                <td>{task.status}</td>
                <td>
                  <img src={task.image} alt="Task" />
                </td>
                <td>
                  <button onClick={() => handleDelete(task.id)}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Completed;
