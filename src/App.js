// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UserForm from './components/UserForm';
import AdminDashboard from './components/AdminDashboard';
import NavBar from './components/NavBar';
import AdminLogin from './components/Adminlogin';

const App = () => {
  return (
    <Router>
      {/* <nav>
        <Link to="/">User Form</Link> | <Link to="/dashboard">Admin Dashboard</Link>
      </nav> */}

      <NavBar />
      <Routes>
        <Route path="/adminlogin" element = {<AdminLogin />} />
        <Route path="/" element={<UserForm />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
