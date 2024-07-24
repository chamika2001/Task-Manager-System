// src/components/useAuth.js
import { useState } from "react";
import { auth, db } from "../components/firebase-task";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

const useAuth = () => {
  const [message, setMessage] = useState("");

  const handleRegister = async (email, password, name, universityName, degreeName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userData = {
        email,
        name,
        universityName,
        degreeName,
      };
      await setDoc(doc(db, "users", user.uid), userData);
      setMessage("Account Created Successfully");
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setMessage('Email Address Already Exists !!!');
      } else {
        setMessage('Unable to create user');
      }
    }
  };

  const handleSignIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      localStorage.setItem('loggedInUserId', user.uid);
      setMessage('Login is successful');
      // Redirect to dashboard
      window.location.href = '/pages/dashboard.html';
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        setMessage('Invalid Email or Password');
      } else if (error.code === 'auth/user-not-found') {
        setMessage('Account does not Exist');
      } else {
        setMessage('Unable to log in');
      }
    }
  };

  return { message, handleRegister, handleSignIn };
};

export default useAuth;
