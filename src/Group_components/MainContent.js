import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import Sidebar from '..';
import TaskFormPopup from './TaskFormPopup';
import '../styles/dashboard.css';

const MainContent = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskCounts, setTaskCounts] = useState({
    totalTasks: 0,
    tasksCompleted: 0,
    tasksInProgress: 0,
    toDoTasks: 0
  });
  const currentProject = localStorage.getItem('loggedInProject');
  const projectDescription = localStorage.getItem('projectDescription');

  useEffect(() => {
    loadTasks();
    updateTaskCounts();
  }, []);

  const togglePopup = () => {
    setPopupVisible(!popupVisible);
  };

  const loadTasks = () => {
    const db = getDatabase();
    const taskRef = ref(db, `projects/${currentProject}/TaskSet`);
    onValue(taskRef, (snapshot) => {
      if (snapshot.exists()) {
        const tasks = snapshot.val();
        setTasks(Object.entries(tasks).map(([id, task]) => ({ id, ...task })));
        updateTaskCounts();
      } else {
        setTasks([]);
      }
    }, { onlyOnce: false });
  };

  const updateTaskCounts = () => {
    const db = getDatabase();
    const taskRef = ref(db, `projects/${currentProject}/TaskSet`);
    onValue(taskRef, (snapshot) => {
      if (snapshot.exists()) {
        const tasks = snapshot.val();
        let totalTasks = 0;
        let tasksCompleted = 0;
        let tasksInProgress = 0;
        let toDoTasks = 0;

        Object.values(tasks).forEach(task => {
          totalTasks++;
          if (task.status === 'completed') {
            tasksCompleted++;
          } else if (task.status === 'in-progress') {
            tasksInProgress++;
          } else if (task.status === 'to-do') {
            toDoTasks++;
          }
        });

        setTaskCounts({ totalTasks, tasksCompleted, tasksInProgress, toDoTasks });
        set(ref(db, `projects/${currentProject}`), { totalTasks, tasksCompleted, tasksInProgress, toDoTasks });
      }
    });
  };

  return (
    <div className="container">
      <Sidebar />
      <main>
        <h1>Dashboard</h1>
        <div className="analyse">
          <div className="card">
            <h3>{currentProject}</h3>
            <p>{projectDescription}</p>
          </div>
          <div className="card">
            <h3>Total Tasks</h3>
            <p>{taskCounts.totalTasks}</p>
          </div>
          <div className="card">
            <h3>Completed Tasks</h3>
            <p>{taskCounts.tasksCompleted}</p>
          </div>
          <div className="card">
            <h3>In-Progress Tasks</h3>
            <p>{taskCounts.tasksInProgress}</p>
          </div>
          <div className="card">
            <h3>To-Do Tasks</h3>
            <p>{taskCounts.toDoTasks}</p>
          </div>
        </div>
        <button onClick={togglePopup}>Add Task</button>
        {popupVisible && <TaskFormPopup togglePopup={togglePopup} loadTasks={loadTasks} currentProject={currentProject} />}
      </main>
    </div>
  );
};

export default MainContent;
