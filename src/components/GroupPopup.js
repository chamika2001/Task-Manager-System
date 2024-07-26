import React, { useState } from 'react';
import { ref, push, set } from 'firebase/database';
import { getDatabase } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import styles from '../styles/Popup.module.css'; // Import the CSS module

function Popup({ onClose }) {
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('low');
    const [status, setStatus] = useState('to-do');
    const [name, setName] = useState(''); // New state for name
    const [image, setImage] = useState(null); // State for image

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const currentProject = localStorage.getItem('loggedInProject');
        const userId = localStorage.getItem('loggedInUserId');
        const db = getDatabase();

        const newTaskRef = push(ref(db, `projects/${currentProject}/TaskSet`));
        
        const uploadImageAndSaveTask = async () => {
            try {
                let imageUrl = '';
                if (image) {
                    const storage = getStorage();
                    const imageRef = storageRef(storage, `images/${newTaskRef.key}/${image.name}`);
                    await uploadBytes(imageRef, image);
                    imageUrl = await getDownloadURL(imageRef);
                }

                await set(newTaskRef, {
                    userId,
                    name,
                    description: taskDescription,
                    date: dueDate,
                    priority,
                    status,
                    title: taskTitle,
                    createdAt: Date.now(),
                    imageUrl // Include image URL in the task data
                });
                alert("Task added successfully");
                onClose(); // Close the popup after successful task addition
            } catch (error) {
                alert("Unsuccessful: " + error);
            }
        };

        uploadImageAndSaveTask();
    };

    return (
        <div className={styles.popup}>
            <div className={styles.popupContent}>
                <button className={styles.closePopup} onClick={onClose}>Close</button>
                <h2>Task Details</h2>
                <form id="task-form" onSubmit={handleSubmit}>
                    <div className={styles.formContainer}>
                        <div className={styles.formSection}>
                            <div className={styles.inputField}>
                                <label htmlFor="task-title">Title:</label>
                                <input
                                    type="text"
                                    id="task-title"
                                    value={taskTitle}
                                    onChange={(e) => setTaskTitle(e.target.value)}
                                    required
                                />
                            </div>
                            <div className={styles.inputField}>
                                <label htmlFor="task-description">Description:</label>
                                <textarea
                                    id="task-description"
                                    value={taskDescription}
                                    onChange={(e) => setTaskDescription(e.target.value)}
                                ></textarea>
                            </div>
                            <div className={styles.inputField}>
                                <label htmlFor="due-date">Due Date:</label>
                                <input
                                    type="date"
                                    id="due-date"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    required
                                />
                            </div>
                            <div className={styles.inputField}>
                                <label htmlFor="priority">Priority:</label>
                                <select
                                    id="priority"
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value)}
                                    required
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.formSection}>
                            <div className={styles.inputField}>
                                <label htmlFor="status">Task Status:</label>
                                <select
                                    id="status"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    required
                                >
                                    <option value="to-do">To-Do</option>
                                    <option value="in-progress">In-progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>
                            <div className={styles.inputField}>
                                <label htmlFor="name">Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className={styles.inputField}>
                                <label htmlFor="task-image">Add image:</label>
                                <input
                                    type="file"
                                    id="task-image"
                                    onChange={handleImageChange}
                                />
                            </div>
                        </div>
                    </div>
                    <button type="submit" className={styles.submitButton}>Save Task</button>
                </form>
            </div>
        </div>
    );
}

export default Popup;
