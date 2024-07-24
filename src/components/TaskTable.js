import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../components/firebase-task'; // Adjust the path according to your project structure
import TaskRow from './TaskRow'; // Adjust the path according to your project structure
import '../styles/task.css';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const TaskTable = () => {
  const [tasks, setTasks] = useState({});
  const [userId, setUserId] = useState(localStorage.getItem('loggedInUserId'));

  useEffect(() => {
    if (!userId) {
      alert('User ID is missing. Please log in again.');
      return;
    }

    const taskRef = ref(db, `TaskSet/${userId}`);
    onValue(taskRef, (snapshot) => {
      if (snapshot.exists()) {
        setTasks(snapshot.val());
      } else {
        setTasks({});
        console.log("No data available");
      }
    }, {
      onlyOnce: false
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

  return (
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
          />
        ))}
      </tbody>
    </table>
  );
};

export default TaskTable;
