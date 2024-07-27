import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faTasks, faReceipt, faChartLine, faMailBulk, faUsers, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import emailjs from 'emailjs-com';
import { database, ref, set, get } from '../components/firebase-project';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/team.module.css';

function Team() {
  const [activeForm, setActiveForm] = useState('loginForm');
  const [projectName, setProjectName] = useState('');
  const [projectDetails, setProjectDetails] = useState('');
  const [emailParams, setEmailParams] = useState({ name: '', to: '', pname: '' });
  const navigate = useNavigate();

  const toggleForm = (formId) => {
    setActiveForm(formId);
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();

    if (projectName.trim() === '') {
      toast.error('Please enter a project name');
      return;
    }

    const projectRef = ref(database, 'projects/' + projectName);
    try {
      const snapshot = await get(projectRef);
      if (snapshot.exists()) {
        toast.error('Project name already exists. Please choose another name.');
      } else {
        await set(projectRef, {
          projectName: projectName,
          details: projectDetails
        });
        toast.success('Project created successfully!');
        setProjectName('');
        setProjectDetails('');
      }
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error('Error creating project. Please try again later.');
    }
  };

  const handleProjectLogin = async (e) => {
    e.preventDefault();

    if (projectName.trim() === '') {
      toast.error('Please enter a project name');
      return;
    }

    const projectRef = ref(database, 'projects/' + projectName);
    try {
      const snapshot = await get(projectRef);
      if (snapshot.exists()) {
        toast.success('Access granted to project: ' + projectName);
        localStorage.setItem('loggedInProject', projectName);
        localStorage.setItem('projectDescription', snapshot.val().details);
        setTimeout(() => {
          navigate('/Group-dashboard');
        }, 5000); // 5 seconds delay
      } else {
        toast.error('Project does not exist. Please enter a valid project name.');
      }
    } catch (error) {
      console.error('Error accessing project:', error);
      toast.error('Error accessing project. Please try again later.');
    }
  };

  const sendMail = async (e) => {
    e.preventDefault();

    const serviceID = "service_iug25ol";
    const templateID = "template_k0kiqgj";

    try {
      await emailjs.send(serviceID, templateID, emailParams, 'tHLpli36-HDHgPev8');
      toast.success("Email sent successfully!");
      clearInputFields();
    } catch (error) {
      toast.error("Failed to send email. Error: " + JSON.stringify(error));
    }
  };

  const clearInputFields = () => {
    setEmailParams({ name: '', to: '', pname: '' });
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
            <span className="material-icons">close</span>
          </div>
        </div>
        <div className="sidebar">
          <Link to="/dashboard">
            <FontAwesomeIcon icon={faTachometerAlt} />
            <h3>Dashboard</h3>
          </Link>
          <Link to="/tasks">
            <FontAwesomeIcon icon={faTasks} />
            <h3>Tasks</h3>
          </Link>
          <Link to="/completed">
            <FontAwesomeIcon icon={faReceipt} />
            <h3>Completed</h3>
          </Link>
          <Link to="/in-progress">
            <FontAwesomeIcon icon={faChartLine} />
            <h3>In Progress</h3>
          </Link>
          <Link to="/to-do">
            <FontAwesomeIcon icon={faMailBulk} />
            <h3>To Do</h3>
          </Link>
          <Link to="/team" className="active">
            <FontAwesomeIcon icon={faUsers} />
            <h3>Team</h3>
          </Link>
          <Link to="/settings">
            <FontAwesomeIcon icon={faCog} />
            <h3>Settings</h3>
          </Link>
          <Link to="/logout">
            <FontAwesomeIcon icon={faSignOutAlt} />
            <h3>Logout</h3>
          </Link>
        </div>
      </aside>

      <div className={`${styles.formContainer} ${activeForm === 'loginForm' ? styles.formContainerActive : ''}`} id="loginForm">
        <h2 className={styles.formContainerHeading}>Login</h2>
        <form onSubmit={handleProjectLogin} className={styles.formContainerForm}>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Project name"
            required
            className={styles.formContainerInput}
          />
          <button type="submit" className={styles.formContainerButton}>Login</button>
        </form>
        <div className={styles.formSwitch}>
          <span>Don't have a project?</span> <a onClick={() => toggleForm('signupForm')} className={styles.formSwitchLink}>Create one</a>
        </div>
      </div>

      <div className={`${styles.formContainer} ${activeForm === 'signupForm' ? styles.formContainerActive : ''}`} id="signupForm">
        <h2 className={styles.formContainerHeading}>Create Project</h2>
        <form onSubmit={handleCreateProject} className={styles.formContainerForm}>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Project name"
            required
            className={styles.formContainerInput}
          />
          <input
            type="text"
            value={projectDetails}
            onChange={(e) => setProjectDetails(e.target.value)}
            placeholder="Description"
            required
            className={styles.formContainerInput}
          />
          <button type="submit" className={styles.formContainerButton}>Create Project</button>
        </form>
        <div className={styles.formSwitch}>
          <span>Already have a project?</span> <a onClick={() => toggleForm('loginForm')} className={styles.formSwitchLink}>Login</a>
        </div>
        <div className={styles.formSwitch}>
          <a onClick={() => toggleForm('emailadd')} className={styles.formSwitchLink}>ADD USERS TO PROJECT !!</a>
        </div>
      </div>

      <div className={`${styles.formContainer} ${activeForm === 'emailadd' ? styles.formContainerActive : ''}`} id="emailadd">
        <h2 className={styles.formContainerHeading}>Add Users</h2>
        <form onSubmit={sendMail} className={styles.formContainerForm}>
          <input
            type="text"
            value={emailParams.name}
            onChange={(e) => setEmailParams({ ...emailParams, name: e.target.value })}
            placeholder="User name"
            required
            className={styles.formContainerInput}
          />
          <input
            type="email"
            value={emailParams.to}
            onChange={(e) => setEmailParams({ ...emailParams, to: e.target.value })}
            placeholder="Email"
            required
            className={styles.formContainerInput}
          />
          <input
            type="text"
            value={emailParams.pname}
            onChange={(e) => setEmailParams({ ...emailParams, pname: e.target.value })}
            placeholder="Project name"
            required
            className={styles.formContainerInput}
          />
          <button type="submit" className={styles.formContainerButton}>Add User</button>
        </form>
        <div className={styles.formSwitch}>
          <span>Click <a onClick={() => toggleForm('loginForm')} className={styles.formSwitchLink}>Login</a></span>
        </div>
      </div>

    
      <ToastContainer autoClose={4000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
}

export default Team;
