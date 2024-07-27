import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faTasks, faReceipt, faChartLine, faMailBulk, faUsers, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { getAuth } from '../components/useAuth';
import { getDatabase, ref, get, set } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import '../styles/settings.css';
import logo from '../assets/images/logo.png';


const Settings = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const db = getDatabase();
        const userRef = ref(db, 'userDetails/' + user.uid);

        try {
          const snapshot = await get(userRef);
          if (snapshot.exists()) {
            setUserDetails(snapshot.val());
          } else {
            console.log('No user data found');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
      setLoading(false);
    };

    fetchUserDetails();
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user && profileImage) {
      const storage = getStorage();
      const imageRef = storageRef(storage, `profileImages/${user.uid}/${profileImage.name}`);
      try {
        await uploadBytes(imageRef, profileImage);
        const imageUrl = await getDownloadURL(imageRef);

        const db = getDatabase();
        const userRef = ref(db, 'userDetails/' + user.uid);
        await set(userRef, { ...userDetails, profileImage: imageUrl });

        setUserDetails({ ...userDetails, profileImage: imageUrl });
        alert('Profile picture updated successfully');
      } catch (error) {
        console.error('Error uploading profile picture:', error);
        alert('Failed to upload profile picture');
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!userDetails) {
    return <p>No user details available.</p>;
  }

  return (
    <div className='container'>
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
          <Link to="/team">
            <FontAwesomeIcon icon={faUsers} />
            <h3>Team</h3>
          </Link>
          <Link to="/settings" className="active">
            <FontAwesomeIcon icon={faCog} />
            <h3>Settings</h3>
          </Link>
          <Link to="/">
            <FontAwesomeIcon icon={faSignOutAlt} />
            <h3>Logout</h3>
          </Link>
        </div>
      </aside>
      <div className="settings-container">
        <h1>User Details</h1>
        <div className="user-details">
          <p><strong>Name:</strong> {userDetails.name}</p>
          <p><strong>Email:</strong> {userDetails.email}</p>
          <p><strong>University:</strong> {userDetails.universityName}</p>
          <p><strong>Degree:</strong> {userDetails.degreeName}</p>
        </div>
        
      </div>
      <div className='profileSender'>
      <div className="upload-container">
          <h2>Update Profile Picture</h2>
          <br></br>
          <input type="file" onChange={handleImageChange} />
          <button onClick={handleUpload}>Upload Profile Picture</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
