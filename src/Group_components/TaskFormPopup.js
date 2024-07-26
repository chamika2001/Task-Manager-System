import React, { useState } from 'react';
import { getDatabase, ref, push, set, onValue } from 'firebase/database';
import '../styles/dashboard.css';

const TaskFormPopup = ({ togglePopup, loadTasks, currentProject }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('low');
  const [status, setStatus] = useState('to-do');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('loggedInUserId');

    if (!userId) {
      alert('User ID is missing. Please log in again.');
      return;
    }

    const db = getDatabase();
    const newTaskRef = push(ref(db, `projects/${currentProject}/TaskSet`));

    try {
      await set(newTaskRef, {
        userId,
        description: taskDescription,
        date: dueDate,
        priority,
        status,
        title: taskTitle,
        createdAt: Date.now()
      });

      alert("Task added successfully");
      loadTasks();
      updateTaskCounts(userId);
      togglePopup();
    } catch (error) {
      alert("Unsuccessful: " + error.message);
    }
  };

  const updateTaskCounts = async (userId) => {
    try {
      const taskRef = ref(getDatabase(), `projects/${currentProject}/TaskSet`);
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

      await set(ref(getDatabase(), `projects/${currentProject}`), counts);
    } catch (error) {
      console.error("Error updating task counts:", error);
    }
  };

  return (
    <div className="popup visible">
      <div className="popup-inner">
        <h2>Task Details</h2>
        <form id="task-form" onSubmit={handleSubmit}>
          <label htmlFor="task-title">Title:</label>
          <input type="text" id="task-title" name="title" required value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
          <label htmlFor="task-description">Description:</label>
          <textarea id="task-description" name="description" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)}></textarea>
          <label htmlFor="due-date">Due Date:</label>
          <input type="date" id="due-date" name="dueDate" required value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          <label htmlFor="priority">Priority:</label>
          <select id="priority" name="priority" required value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <label htmlFor="status">Task Status:</label>
          <select id="status" name="status" required value={status} onChange={(e) => setStatus(e.target.value)}>
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
