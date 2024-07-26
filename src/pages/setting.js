// Details.js
import React, { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc } from '../components/useAuth';
import '../styles/settings.css';

const Details = () => {
  const [userDetails, setUserDetails] = useState(null);
  const userId = localStorage.getItem('loggedInUserId');

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (userId) {
        const db = getFirestore();
        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
          setUserDetails(userDoc.data());
        } else {
          console.error("No such user document!");
        }
      } else {
        console.error("User not logged in!");
      }
    };

    fetchUserDetails();
  }, [userId]);

  return (
    <div className="details-container">
      {userDetails ? (
        <div className="details-content">
          <h1>User Details</h1>
          <p><strong>Name:</strong> {userDetails.name}</p>
          <p><strong>Email:</strong> {userDetails.email}</p>
          <p><strong>University:</strong> {userDetails.universityName}</p>
          <p><strong>Degree:</strong> {userDetails.degreeName}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Details;
