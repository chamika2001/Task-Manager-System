import React, { useState } from 'react';
import { ref, push, set } from 'firebase/database';
import { getDatabase } from 'firebase/database';
import '../styles/task.css'; // Adjust path if needed

function Popup({ onClose }) {
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('low');
    const [status, setStatus] = useState('to-do');
    const [name, setName] = useState(''); // New state for name

    const handleSubmit = (e) => {
        e.preventDefault();
        const currentProject = localStorage.getItem('loggedInProject');
        const userId = localStorage.getItem('loggedInUserId');
        const db = getDatabase();

        const newTaskRef = push(ref(db, `projects/${currentProject}/TaskSet`));
        set(newTaskRef, {
            userId,
            name, // Include name in the task data
            description: taskDescription,
            date: dueDate,
            priority,
            status,
            title: taskTitle,
            createdAt: Date.now()
        }).then(() => {
            alert("Task added successfully");
            onClose(); // Close the popup after successful task addition
        }).catch((error) => {
            alert("Unsuccessful: " + error);
        });
    };

    return (
        <div id="popup" className="visible">
            <h2>Task Details</h2>
            <form id="task-form" onSubmit={handleSubmit}>
                <label htmlFor="task-title">Title:</label>
                <input
                    type="text"
                    id="task-title"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    required
                />
                <label htmlFor="task-description">Description:</label>
                <textarea
                    id="task-description"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                ></textarea>
                <label htmlFor="due-date">Due Date:</label>
                <input
                    type="date"
                    id="due-date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                />
                <label htmlFor="priority">Priority:</label>
                <select
                    id="priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    required
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <label htmlFor="status">Task Status:</label>
                <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                >
                    <option value="to-do">To-Do</option>
                    <option value="in-progress">In-progress</option>
                    <option value="completed">Completed</option>
                </select>
                <label htmlFor="name">Name:</label> {/* New name input field */}
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <button type="button">Add image</button>
                <button type="submit">Save Task</button>
            </form>
            <button id="close-popup" onClick={onClose}>Close</button>
        </div>
    );
}

export default Popup;
