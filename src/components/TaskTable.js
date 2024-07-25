import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../components/firebase-task'; // Adjust the path according to your project structure
import TaskRow from '../components/TaskRow'; // Adjust the path according to your project structure
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

  const updateTaskCount = async (userId) => {
    try {
      const taskRef = ref(db, `TaskSet/${userId}`);
      const snapshot = await new Promise((resolve) => onValue(taskRef, resolve, { onlyOnce: true }));

      const tasks = snapshot.val();
      const counts = {
        total: 0,
        todo: 0,
        inProgress: 0,
        completed: 0
      };

      if (tasks) {
        counts.total = Object.keys(tasks).length;
        counts.todo = Object.values(tasks).filter(task => task.status === 'to-do').length;
        counts.inProgress = Object.values(tasks).filter(task => task.status === 'in-progress').length;
        counts.completed = Object.values(tasks).filter(task => task.status === 'completed').length;
      }

      // Update counts in the database
      await set(ref(db, `TaskCount/${userId}`), counts);
    } catch (error) {
      console.error("Error updating task counts:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await set(ref(db, `TaskSet/${userId}/${taskId}`), null);
      const newTasks = { ...tasks };
      delete newTasks[taskId];
      setTasks(newTasks);
      
      // Update task count
      await updateTaskCount(userId);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <table className="a-table">
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
