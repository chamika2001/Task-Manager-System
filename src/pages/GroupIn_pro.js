import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faTasks, faReceipt, faChartLine, faMailBulk, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { getDatabase, ref, onValue, set, update } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import '../styles/completed.css'; 
import '../styles/modal.css';
import logo from '../assets/images/logo.png';


const firebaseConfig = {
    apiKey: "AIzaSyBubWYb40n-2cIv1TPNPLjSW1mRmfFo4uM",
    authDomain: "taskform-8c494.firebaseapp.com",
    databaseURL: "https://taskform-8c494-default-rtdb.firebaseio.com",
    projectId: "taskform-8c494",
    storageBucket: "taskform-8c494.appspot.com",
    messagingSenderId: "544113440895",
    appId: "1:544113440895:web:ff116c0ad3c4766338274a"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const InProgressTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [currentProject, setCurrentProject] = useState(localStorage.getItem('loggedInProject'));
    const [selectedImage, setSelectedImage] = useState(''); // State for the selected image

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
                    const filteredTasks = taskArray
                        .filter(task => task.status === 'in-progress')
                        .sort((a, b) => b.createdAt - a.createdAt); // No limitation on number of tasks
                    setTasks(filteredTasks);
                } else {
                    setTasks([]);
                }
            });
        };

        loadTasks();
    }, [currentProject]);

    const handleCompleteTask = async (taskId) => {
        try {
            await update(ref(db, `projects/${currentProject}/TaskSet/${taskId}`), { status: 'completed' });
            setTasks(tasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error("Error updating task status:", error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await set(ref(db, `projects/${currentProject}/TaskSet/${taskId}`), null);
            setTasks(tasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };
    const handleCloseImage = () => {
        setSelectedImage(''); // Clear the selected image URL
    };

    const handleViewImage = (imageUrl) => {
        setSelectedImage(imageUrl); // Set the selected image URL
    };

   

    return (
        <div className="container">
            <aside>
                <div className="toggle">
                    <div className="logo">
                    <img src={logo} alt="logo" />
                        <h2>
                            Task<span className="danger">Me</span>
                        </h2>
                    </div>
                    <div className="close" id="close-btn">
                        <span className="material-icons-sharp">close</span>
                    </div>
                </div>
                <div className="sidebar">
                    <Link to="/Group-dashboard">
                        <FontAwesomeIcon icon={faTachometerAlt} />
                        <h3>Dashboard</h3>
                    </Link>
                    <Link to="/GroupTasks">
                        <FontAwesomeIcon icon={faTasks} />
                        <h3>Tasks</h3>
                    </Link>
                    <Link to="/GroupCompleted">
                        <FontAwesomeIcon icon={faReceipt} />
                        <h3>Completed</h3>
                    </Link>
                    <Link to="/GroupIn_pro" className="active">
                        <FontAwesomeIcon icon={faChartLine} />
                        <h3>In Progress</h3>
                    </Link>
                    <Link to="/GroupTodo">
                        <FontAwesomeIcon icon={faMailBulk} />
                        <h3>To Do</h3>
                    </Link>
                    <Link to="/team">
                        <FontAwesomeIcon icon={faSignOutAlt} />
                        <h3>Logout</h3>
                    </Link>
                </div>
            </aside>
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Priority</th>
                            <th>Image</th>
                            <th>Complete task</th>
                            <th>Delete task</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task, index) => (
                            <tr key={task.id}>
                                <td className="task-number">{index + 1}</td>
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td>{task.name}</td>
                                <td>{task.date}</td>
                                <td>{task.priority}</td>
                                <td>
                                    {task.imageUrl ? (
                                        <button onClick={() => handleViewImage(task.imageUrl)}>View</button>
                                    ) : (
                                        'No image'
                                    )}
                                </td>
                                <td>
                                    <button onClick={() => handleCompleteTask(task.id)} className="complete-task">Complete</button>
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteTask(task.id)} className="delete-task">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {selectedImage && (
                <div className="modal">
                    <div className="modal-content">
                        <img src={selectedImage} alt="Task" />
                        <span onClick={handleCloseImage} className="close">&times;</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InProgressTasks;
