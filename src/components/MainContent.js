import React from 'react';
import TaskTable from './TaskTable';
import '../styles/dashboard.css'; // Import the regular CSS file

const MainContent = () => {
  return (
    <main>
      <h1>DashBoard</h1>
      <div className="analyse">
        <div className="tasks">
          <div className="status">
            <div className="info">
              <h3>TOTAL TASKS</h3>
              <h1>34</h1>
            </div>
          </div>
        </div>

        <div className="tasks">
          <div className="status">
            <div className="info">
              <h3>COMPLETED TASKS</h3>
              <h1>34</h1>
            </div>
          </div>
        </div>

        <div className="tasks">
          <div className="status">
            <div className="info">
              <h3>IN-PROGRESS TASKS</h3>
              <h1>34</h1>
            </div>
          </div>
        </div>

        <div className="tasks">
          <div className="status">
            <div className="info">
              <h3>TO-DO TASKS</h3>
              <h1>34</h1>
            </div>
          </div>
        </div>

        {/* Add more analysis sections as needed */}
      </div>
      <div className="recent-tasks">
        <TaskTable />
        <a href="#">Show All</a>
      </div>
    </main>
  );
};

export default MainContent;
