import React from 'react';

const TaskFormPopup = ({ togglePopup }) => {
  return (
    <div id="popup">
      <h2>Task Details</h2>
      <form id="task-form">
        <label htmlFor="task-title">Title:</label>
        <input type="text" id="task-title" name="title" required />
        <label htmlFor="task-description">Description:</label>
        <textarea id="task-description" name="description"></textarea>
        <label htmlFor="due-date">Due Date:</label>
        <input type="date" id="due-date" name="dueDate" required />
        <label htmlFor="priority">Priority:</label>
        <select id="priority" name="priority" required>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <label htmlFor="status">Task Status:</label>
        <select id="status" name="status" required>
          <option value="to-do">To-Do</option>
          <option value="in-progress">In-progress</option>
          <option value="completed">Completed</option>
        </select>
        <button type="button">Add image</button>
        <button type="submit">Save Task</button>
      </form>
      <button id="close-popup" onClick={togglePopup}>Close</button>
    </div>
  );
};

export default TaskFormPopup;
