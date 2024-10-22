import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css'; // Make sure to create this CSS file

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true when the request is made
    
    try {
      const response = await axios.post('https://social-back-hazel.vercel.app/api/auth/login', {
        username,
        password,
      });

      if (response.status === 200) {
        setError('');
        setLoggedIn(true);
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      console.error('Login error', err);
      setError('Invalid Credentials');
    } finally {
      setLoading(false); // Set loading to false after request is complete
    }
  };

  return (
    <div className='login-container'>
      <form onSubmit={handleSubmit} className='login-form'>
        <h2 className='login-title'>Admin Login</h2>

        {error && <p className='error-message'>{error}</p>}

        <div className='input-group'>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className='input-field'
          />
        </div>

        <div className='input-group'>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='input-field'
          />
        </div>

        <button type="submit" className='login-button' disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
