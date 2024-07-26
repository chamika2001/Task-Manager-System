import React, { useState } from 'react';
import Popup from '../components/GroupPopup';
import '../styles/groupDash.css'; // Adjust path if needed

function GroupMainCon({ tasks, taskCounts, updateTaskCounts }) {
    const [isPopupVisible, setPopupVisible] = useState(false);

    const handleAddTaskClick = () => {
        setPopupVisible(true);
    };

    const handleClosePopup = () => {
        setPopupVisible(false);
    };

    return (
        <>
            <h1>DashBoard</h1>
            <div className="analyse">
                <div className="tasks">
                    <div className="status">
                        <div className="info">
                            <h3>TOTAL TASKS</h3>
                            <h1 id="totalTasks">{taskCounts.totalTasks}</h1>
                        </div>
                    </div>
                    
                </div>
                <div className="tasks">
                    <div className="status">
                        <div className="info">
                            <h3>COMPLETED TASKS</h3>
                            <h1 id="tasksCompleted">{taskCounts.tasksCompleted}</h1>
                        </div>
                    </div>
                    
                </div>
                <div className="tasks">
                    <div className="status">
                        <div className="info">
                            <h3>IN-PROGRESS TASKS</h3>
                            <h1 id="tasksInProgress">{taskCounts.tasksInProgress}</h1>
                        </div>
                    </div>
                    
                </div>
                <div className="tasks">
                    <div className="status">
                        <div className="info">
                            <h3>TO-DO TASKS</h3>
                            <h1 id="toDoTasks">{taskCounts.toDoTasks}</h1>
                        </div>
                    </div>
                    
                </div>
            </div>
            <button id="open-popup" onClick={handleAddTaskClick}>Add Task</button>
            {isPopupVisible && <Popup onClose={handleClosePopup} />}
            <div className="recent-tasks">
                <h2>Recent Tasks</h2>
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
                            <th></th>
                            <th>Delete</th>
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
                                <td><button className="delete-task" data-id={task.id}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default GroupMainCon;
