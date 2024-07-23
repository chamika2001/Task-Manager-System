import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from '../src/pages/Dashboard';
import SignUpIn from '../src/pages/SignUpIn';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUpIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
      
      </Routes>
    </Router>
  );
};

export default App;
