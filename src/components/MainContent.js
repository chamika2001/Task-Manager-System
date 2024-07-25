import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../components/firebase-task'; // Adjust the path according to your project structure
import TaskTable from './TaskTable';
import '../styles/dashboard.css'; // Import the regular CSS file

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const MainContent = () => {
  const [taskCounts, setTaskCounts] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    todo: 0
  });
  const [userId, setUserId] = useState(localStorage.getItem('loggedInUserId'));

  useEffect(() => {
    if (!userId) {
      alert('User ID is missing. Please log in again.');
      return;
    }

    const taskCountRef = ref(db, `TaskCount/${userId}`);
    onValue(taskCountRef, (snapshot) => {
      if (snapshot.exists()) {
        setTaskCounts(snapshot.val());
      } else {
        setTaskCounts({
          total: 0,
          completed: 0,
          inProgress: 0,
          todo: 0
        });
        console.log("No data available");
      }
    }, {
      onlyOnce: false
    });
  }, [userId]);

  return (
    <main>
      <h1>DashBoard</h1>
      <div className="analyse">
        <div className="tasks">
          <div className="status">
            <div className="info">
              <h3>TOTAL TASKS</h3>
              <h1>{taskCounts.total}</h1>
            </div>
          </div>
        </div>

        <div className="tasks">
          <div className="status">
            <div className="info">
              <h3>COMPLETED TASKS</h3>
              <h1>{taskCounts.completed}</h1>
            </div>
          </div>
        </div>

        <div className="tasks">
          <div className="status">
            <div className="info">
              <h3>IN-PROGRESS TASKS</h3>
              <h1>{taskCounts.inProgress}</h1>
            </div>
          </div>
        </div>

        <div className="tasks">
          <div className="status">
            <div className="info">
              <h3>TO-DO TASKS</h3>
              <h1>{taskCounts.todo}</h1>
            </div>
          </div>
        </div>

        {/* Add more analysis sections as needed */}
      </div>
      <div className="recent-tasks">
        <TaskTable />
        <a href="#">Show All</a>
      </div>
    </main>
  );
};

export default MainContent;
