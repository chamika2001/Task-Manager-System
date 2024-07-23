import React, { useState } from 'react';
import { db } from '../components/firebase-task';
import { ref, push, set } from 'firebase/database';
import '../styles/task.css';

const TaskFormPopup = ({ togglePopup }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('low');
  const [status, setStatus] = useState('to-do');

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('loggedInUserId'); // Assuming user ID is stored in localStorage
    const newTaskRef = push(ref(db, `TaskSet/${userId}`));

    set(newTaskRef, {
      title: taskTitle,
      description: taskDescription,
      date: dueDate,
      priority: priority,
      status: status,
      createdAt: Date.now() // Add timestamp
    }).then(() => {
      alert("Data added successfully");
      togglePopup(); // Close the popup after successful submission
    }).catch((error) => {
      alert("Unsuccessful: " + error);
    });
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
          <button type="button">Add image</button>
          <button type="submit">Save Task</button>
        </form>
        <button id="close-popup" onClick={togglePopup}>Close</button>
      </div>
    </div>
  );
};

export default TaskFormPopup;
