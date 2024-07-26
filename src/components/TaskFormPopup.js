import React, { useState } from 'react';
import { getDatabase, ref, push, set, onValue } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import '../styles/task.css';

const TaskFormPopup = ({ togglePopup }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('low');
  const [status, setStatus] = useState('to-do');
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('loggedInUserId'); // Retrieve user ID from localStorage

    if (!userId) {
      alert('User ID is missing. Please log in again.');
      return;
    }

    const db = getDatabase();
    const newTaskRef = push(ref(db, `TaskSet/${userId}`));

    try {
      let uploadedImageUrl = '';

      if (imageFile) {
        uploadedImageUrl = await handleImageUpload(imageFile, userId);
      }

      // Add new task
      await set(newTaskRef, {
        title: taskTitle,
        description: taskDescription,
        date: dueDate,
        priority: priority,
        status: status,
        createdAt: Date.now(), // Add timestamp
        imageUrl: uploadedImageUrl
      });

      // Update task counts
      await updateTaskCounts(userId);

      alert("Data added successfully");
      togglePopup(); // Close the popup after successful submission
    } catch (error) {
      alert("Unsuccessful: " + error.message);
    }
  };

  const handleImageUpload = async (file, userId) => {
    const storage = getStorage();
    const fileRef = storageRef(storage, `images/${userId}/${file.name}`);
    await uploadBytes(fileRef, file);
    const downloadURL = await getDownloadURL(fileRef);
    return downloadURL;
  };

  const updateTaskCounts = async (userId) => {
    try {
      const taskRef = ref(getDatabase(), `TaskSet/${userId}`);
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
      await set(ref(getDatabase(), `TaskCount/${userId}`), counts);
    } catch (error) {
      console.error("Error updating task counts:", error);
    }
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  return (
    <div className="popup visible">
      <div className="popup-inner">
        <h2>Task Details</h2>
        <form id="task-form" onSubmit={handleSubmit}>
          <label htmlFor="task-title">Title:</label>
          <input 
            type="text" 
            id="task-title" 
            name="title" 
            required 
            value={taskTitle} 
            onChange={(e) => setTaskTitle(e.target.value)} 
          />
          <label htmlFor="task-description">Description:</label>
          <textarea 
            id="task-description" 
            name="description" 
            value={taskDescription} 
            onChange={(e) => setTaskDescription(e.target.value)}
          ></textarea>
          <label htmlFor="due-date">Due Date:</label>
          <input 
            type="date" 
            id="due-date" 
            name="dueDate" 
            required 
            value={dueDate} 
            onChange={(e) => setDueDate(e.target.value)}
          />
          <label htmlFor="priority">Priority:</label>
          <select 
            id="priority" 
            name="priority" 
            required 
            value={priority} 
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <label htmlFor="status">Task Status:</label>
          <select 
            id="status" 
            name="status" 
            required 
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="to-do">To-Do</option>
            <option value="in-progress">In-progress</option>
            <option value="completed">Completed</option>
          </select>
          <label htmlFor="task-image">Add Image:</label>
          <input 
            type="file" 
            id="task-image" 
            name="task-image" 
            onChange={handleFileChange} 
          />
          <button type="submit">Save Task</button>
        </form>
        <button id="close-popup" onClick={togglePopup}>Close</button>
      </div>
    </div>
  );
};

export default TaskFormPopup;
