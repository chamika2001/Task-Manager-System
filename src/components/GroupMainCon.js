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

    // Filter tasks to show only high-priority tasks with status 'to-do' or 'in-progress'
    const highPriorityTasks = tasks
        .filter(task =>
            task.priority === 'high' && (task.status === 'to-do' || task.status === 'in-progress')
        )
        .sort((a, b) => b.createdAt - a.createdAt) // Sort tasks by createdAt in descending order
        .slice(0, 4); // Get the latest 4 tasks

    return (
        <>
            <h1>Dashboard</h1>
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
                <h2>High Priority Tasks</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Priority</th>
                            <th>Name</th>
                            <th>Due Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {highPriorityTasks.map(task => (
                            <tr key={task.id}>
                                <td>{task.title}</td> {/* Changed 'task.name' to 'task.title' */}
                                <td>{task.status}</td>
                                <td>{task.priority}</td>
                                <td>{task.name}</td>
                                <td>{task.date}</td> {/* Changed 'task.dueDate' to 'task.date' */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default GroupMainCon;
