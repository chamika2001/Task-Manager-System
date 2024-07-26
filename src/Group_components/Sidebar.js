import React from 'react';
import '../styles/dashboard.css';

const Sidebar = () => (
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
      <a href="#" className="active">
        <span className="material-icons-sharp">dashboard</span>
        <h3>Dashboard</h3>
      </a>
      <a href="/GROUP-PROJECT/pages/tasks.html">
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
      </a>
      <a href="/GROUP-PROJECT/pages/trash.html">
        <span className="material-icons-sharp">report_gmailerrorred</span>
        <h3>Trash</h3>
      </a>
      <a href="#">
        <span className="material-icons-sharp">logout</span>
        <h3>Logout</h3>
      </a>
    </div>
  </aside>
);

export default Sidebar;
