import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, set, onValue, update, remove } from 'firebase/database';
import Sidebar from '../components/Sidebar';
import GroupMainCon from '../components/GroupMainCon';
import GroupRightSec from '../components/GroupRightSec';


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

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function GroupDash() {
    const [tasks, setTasks] = useState([]);
    const [taskCounts, setTaskCounts] = useState({
        totalTasks: 0,
        tasksCompleted: 0,
        tasksInProgress: 0,
        toDoTasks: 0
    });

    useEffect(() => {
        const currentProject = localStorage.getItem('loggedInProject');
        
        if (currentProject) {
            const taskRef = ref(db, `projects/${currentProject}/TaskSet`);
            onValue(taskRef, (snapshot) => {
                if (snapshot.exists()) {
                    const tasksData = snapshot.val();
                    const taskArray = Object.keys(tasksData).map(key => ({ id: key, ...tasksData[key] }));
                    setTasks(taskArray);
                    updateTaskCounts(tasksData);
                }
            });
        }
    }, []);

    const updateTaskCounts = (tasksData) => {
        let totalTasks = 0;
        let tasksCompleted = 0;
        let tasksInProgress = 0;
        let toDoTasks = 0;

        Object.values(tasksData).forEach(task => {
            totalTasks++;
            if (task.status === 'completed') {
                tasksCompleted++;
            } else if (task.status === 'in-progress') {
                tasksInProgress++;
            } else if (task.status === 'to-do') {
                toDoTasks++;
            }
        });

        setTaskCounts({
            totalTasks,
            tasksCompleted,
            tasksInProgress,
            toDoTasks
        });
    };

    return (
        <div className="container">
            <Sidebar />
            <main>
                <GroupMainCon
                    tasks={tasks}
                    taskCounts={taskCounts}
                    updateTaskCounts={updateTaskCounts}
                />
            </main>
            <GroupRightSec />
        </div>
    );
}

export default GroupDash;
