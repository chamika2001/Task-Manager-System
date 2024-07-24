import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from '../src/pages/Dashboard';
import SignUpIn from '../src/pages/SignUpIn';
import Task from '../src/pages/Task'
import Completed from '../src/pages/Completed'



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUpIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<Task />} />
        <Route path="/completed" element={<Completed />} />
      
      </Routes>
    </Router>
  );
};

export default App;
