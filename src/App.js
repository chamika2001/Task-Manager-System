import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from '../src/pages/Dashboard';
import SignUpIn from '../src/pages/SignUpIn';
import Task from '../src/pages/Task'
import Completed from '../src/pages/Completed'
import Team from '../src/pages/Team'
import ToDo from './pages/To-do';
import Inprogress from './pages/In_progress';
import GroupDash from './pages/GroupDash';
import InProgressTasks  from './pages/GroupIn_pro';
import GroupTodo from './pages/Group_todo';
import GroupTasks from './pages/Group_task';
import GroupCompleted from './pages/Group_completed';
import Settings from './pages/setting';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUpIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<Task />} />
        <Route path="/completed" element={<Completed />} />
        <Route path="/team" element={<Team />} />
        <Route path="/to-do" element={<ToDo />} />
        <Route path="/in-progress" element={<Inprogress />} />
        <Route path="/Group-dashboard" element={<GroupDash />} />
        <Route path="/GroupIn_pro" element={<InProgressTasks />} />
        <Route path="/GroupTodo" element={< GroupTodo />} />
        <Route path="/GroupTasks" element={< GroupTasks />} />
        <Route path="/GroupCompleted" element={< GroupCompleted />} />
        <Route path="/Settings" element={<Settings />} />
      
      </Routes>
    </Router>
  );
};

export default App;
