import React from 'react';
import '../styles/groupDash.css'; // Adjust path if needed

function GroupRightSec() {
    return (
        <div className="right-section">
            <div className="nav">
                <button id="menu-btn">
                    <span className="material-icons-sharp">menu</span>
                </button>
                <div className="dark-mode">
                    <span className="material-icons-sharp active">light_mode</span>
                    <span className="material-icons-sharp">dark_mode</span>
                </div>
            </div>
            <div className="user-profile">
                <div className="logo">
                    <h2>Project Name:</h2>
                    <h2 id="projectName">{localStorage.getItem('loggedInProject')}</h2>
                    <br />
                    <h2>Description:</h2>
                    <h2 id="projectDescription">{localStorage.getItem('projectDescription')}</h2>
                </div>
            </div>
            <div className="reminders">
                <div className="header">
                    <h2>Reminders</h2>
                    <span className="material-icons-sharp">notifications_none</span>
                </div>
                {/* Add reminders here */}
                <div className="notification add-reminder">
                    <div>
                        <span className="material-icons-sharp">add</span>
                        <h3>Add Reminder</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GroupRightSec;
