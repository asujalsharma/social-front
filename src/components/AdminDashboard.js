import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css'; // Make sure to create this CSS file for styling

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(''); // Track errors

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://social-back-hazel.vercel.app/api/users');
      console.log(response.data); // Debug to check the structure

      // Ensure response.data is an array
      if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else {
        setError('Invalid data format received');
        setUsers([]);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Admin Dashboard</h2>

      {loading ? (
        <div className="loading">Loading users...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="user-grid">
          {users.map((user, index) => (
            <div key={index} className="user-card">
              <h3 className="user-name">{user.name}</h3>
              <p className="user-handle">@{user.socialHandle}</p>
              <div className="image-gallery">
                {user.images && user.images.length > 0 ? (
                  user.images.map((image, idx) => (
                    <img
                      height={200}
                      width={200}
                      key={idx}
                      src={`https://social-back-hazel.vercel.app/uploads/${image}`}
                      alt={`Uploaded by ${user.name}`}
                      className="thumbnail"
                    />
                  ))
                ) : (
                  <p>No images available.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
