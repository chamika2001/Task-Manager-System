import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faTasks, faReceipt, faChartLine, faMailBulk, faUsers, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../components/firebase-task'; // Adjust the path according to your project structure
import ImageModal from '../components/ImageModal'; // Import ImageModal component
import '../styles/completed.css';
import logo from '../assets/images/logo.png';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function Completed() {
  const [tasks, setTasks] = useState({});
  const [userId, setUserId] = useState(localStorage.getItem('loggedInUserId'));
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    if (!userId) {
      alert('User ID is missing. Please log in again.');
      return;
    }

    const taskRef = ref(db, `TaskSet/${userId}`);
    onValue(taskRef, (snapshot) => {
      if (snapshot.exists()) {
        const allTasks = snapshot.val();
        // filled only completed task only
        const completedTasks = Object.keys(allTasks)
          .filter(key => allTasks[key].status === 'completed')
          .reduce((obj, key) => {
            obj[key] = allTasks[key];
            return obj;
          }, {});
        setTasks(completedTasks);
      } else {
        setTasks({});
        console.log("No data available");
      }
    });
  }, [userId]);

  const deleteTask = async (taskId) => {
    try {
      await set(ref(db, `TaskSet/${userId}/${taskId}`), null);
      const newTasks = { ...tasks };
      delete newTasks[taskId];
      setTasks(newTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleViewImage = (imageUrl) => {
    setModalImage(imageUrl);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  const TaskRow = ({ task, index, onDelete, onViewImage }) => {
    const { title, description, date, priority, status, imageUrl } = task;

    return (
      <tr>
        <td>{index + 1}</td>
        <td>{title}</td>
        <td>{description}</td>
        <td>{date}</td>
        <td>{priority}</td>
        <td>{status}</td>
        <td>
          <button onClick={() => onViewImage(imageUrl || 'No Image')}>View</button>
        </td>
        <td>
          <button onClick={() => onDelete(task.id)}>Delete</button>
        </td>
      </tr>
    );
  };

  return (
    <div className="container">
      {/* Sidebar Section */}
      <aside>
        <div className="toggle">
          <div className="logo">
            <img src={logo} alt="logo" />
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
              <th>No</th>
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
            {Object.keys(tasks).map((key, index) => (
              <TaskRow
                key={key}
                task={{ id: key, ...tasks[key] }}
                index={index}
                onDelete={deleteTask}
                onViewImage={handleViewImage}
              />
            ))}
          </tbody>
        </table>
      </div>
      {modalImage && <ImageModal imageUrl={modalImage} onClose={closeModal} />}
    </div>
  );
}

export default Completed;
