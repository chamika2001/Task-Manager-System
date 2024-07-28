import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../components/firebase-task'; // Adjust the path according to your project structure
import '../styles/task.css';
import ImageModal from '../components/ImageModal'; // Import ImageModal component

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const TaskTable = () => {
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

  const handleViewImage = (imageUrl) => {
    setModalImage(imageUrl);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <>
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
            <tr key={key}>
              <td>{index + 1}</td>
              <td>{tasks[key].title}</td>
              <td>{tasks[key].description}</td>
              <td>{tasks[key].date}</td>
              <td>{tasks[key].priority}</td>
              <td>{tasks[key].status}</td>
              <td>
                <button onClick={() => handleViewImage(tasks[key].imageUrl || 'No Image')}>View</button>
              </td>
              <td>
                <button onClick={() => deleteTask(key)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modalImage && <ImageModal imageUrl={modalImage} onClose={closeModal} />}
    </>
  );
};

export default TaskTable;
