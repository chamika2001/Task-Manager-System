import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import '../styles/tasks.css'; // Adjust path if needed

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBubWYb40n-2cIv1TPNPLjSW1mRmfFo4uM",
    authDomain: "taskform-8c494.firebaseapp.com",
    databaseURL: "https://taskform-8c494-default-rtdb.firebaseio.com",
    projectId: "taskform-8c494",
    storageBucket: "taskform-8c494.appspot.com",
    messagingSenderId: "544113440895",
    appId: "1:544113440895:web:ff116c0ad3c4766338274a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const currentProject = localStorage.getItem('loggedInProject');

    useEffect(() => {
        if (!currentProject) {
            alert("Please log into a project first.");
            window.location.href = 'index.html'; // Redirect to login page
            return;
        }

        const loadTasks = () => {
            const taskRef = ref(db, `projects/${currentProject}/TaskSet`);
            onValue(taskRef, (snapshot) => {
                if (snapshot.exists()) {
                    const tasksData = snapshot.val();
                    const taskArray = Object.keys(tasksData).map(key => ({ id: key, ...tasksData[key] }));
                    const sortedTasks = taskArray
                        .sort((a, b) => b.createdAt - a.createdAt);
                    setTasks(sortedTasks);
                } else {
                    setTasks([]);
                }
            });
        };

        loadTasks();
    }, [currentProject]);

    const handleDeleteTask = async (taskId) => {
        try {
            await set(ref(db, `projects/${currentProject}/TaskSet/${taskId}`), null);
            setTasks(tasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    return (
        <div className="container">
            <aside>
                <div className="toggle">
                    <div className="logo">
                        <img src="/assets/images/logo.png" alt="Logo" />
                        <h2>Task<span className="danger">Me</span></h2>
                    </div>
                    <div className="close" id="close-btn">
                        <span className="material-icons-sharp">close</span>
                    </div>
                </div>
                <div className="sidebar">
                    <a href="/GROUP-PROJECT/pages/dashboard.html">
                        <span className="material-icons-sharp">dashboard</span>
                        <h3>Dashboard</h3>
                    </a>
                    <a href="#" className="active">
                        <span className="material-icons-sharp">person_outline</span>
                        <h3>Tasks</h3>
                    </a>
                    <a href="/GROUP-PROJECT/pages/completed.html">
                        <span className="material-icons-sharp">receipt_long</span>
                        <h3>Completed</h3>
                    </a>
                    <a href="/GROUP-PROJECT/pages/in-progress.html">
                        <span className="material-icons-sharp">insights</span>
                        <h3>In Progress</h3>
                    </a>
                    <a href="/GROUP-PROJECT/pages/to-do.html">
                        <span className="material-icons-sharp">mail_outline</span>
                        <h3>To Do</h3>
                        <span className="message-count">27</span>
                    </a>
                    <a href="/GROUP-PROJECT/pages/team.html">
                        <span className="material-icons-sharp">person_outline</span>
                        <h3>Team</h3>
                    </a>
                    <a href="/GROUP-PROJECT/pages/trash.html">
                        <span className="material-icons-sharp">report_gmailerrorred</span>
                        <h3>Trash</h3>
                    </a>
                    <a href="/GROUP-PROJECT/pages/settings.html">
                        <span className="material-icons-sharp">settings</span>
                        <h3>Settings</h3>
                    </a>
                    <a href="#">
                        <span className="material-icons-sharp">logout</span>
                        <h3>Logout</h3>
                    </a>
                </div>
            </aside>
            <div className="table-container">
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
                        {tasks.map((task, index) => (
                            <tr key={task.id}>
                                <td className="task-number">{index + 1}</td>
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td>{task.date}</td>
                                <td>{task.priority}</td>
                                <td>{task.status}</td>
                                <td><button>Upload Image</button></td>
                                <td>
                                    <button
                                        className="delete-task"
                                        onClick={() => handleDeleteTask(task.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Tasks;
