import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css'; // Make sure to create this CSS file for styling

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://social-app-back.vercel.app/api/users');
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching users:', err);
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Admin Dashboard</h2>
      {loading ? (
        <div className="loading">Loading users...</div>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="user-grid">
          {users.map((user, index) => (
            <div key={index} className="user-card">
              <h3 className="user-name">{user.name}</h3>
              <p className="user-handle">@{user.socialHandle}</p>
              <div className="image-gallery">
                {user.images.length > 0 ? (
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
