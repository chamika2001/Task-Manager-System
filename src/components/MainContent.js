import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../components/firebase-task'; // Adjust the path according to your project structure
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
  const [tasks, setTasks] = useState([]);
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

    const tasksRef = ref(db, `TaskSet/${userId}`);
    onValue(tasksRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const taskList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setTasks(taskList);
        console.log('Tasks fetched from database:', taskList); // Log the fetched tasks
      } else {
        setTasks([]);
        console.log("No tasks available");
      }
    }, {
      onlyOnce: false
    });
  }, [userId]);

  // Filter tasks for the latest four high-priority tasks with status 'in-progress' or 'to-do'
  const filteredTasks = tasks
    .filter(task => (task.status === 'in-progress' || task.status === 'to-do') && task.priority === 'high')
    .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by due date (latest first)
    .slice(0, 4); // Get the latest four tasks

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
      </div>
      <br></br><br></br>
      <div className="recent-tasks">
        <h2>High Priority Tasks</h2>
        <table>
          <thead>
            <tr>
              
              <th>Title</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map(task => (
              <tr key={task.id}>
                <td>{task.title}</td> {/* Changed 'task.name' to 'task.title' */}
                <td>{task.status}</td>
                <td>{task.priority}</td>
                <td>{task.date}</td> {/* Changed 'task.dueDate' to 'task.date' */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default MainContent;
