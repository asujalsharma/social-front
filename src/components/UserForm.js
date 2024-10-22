import React, { useState } from 'react';
import axios from 'axios';
import "./UserForm.css";

const UserForm = () => {
  const [name, setName] = useState('');
  const [socialHandle, setSocialHandle] = useState('');
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('socialHandle', socialHandle);

    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    try {
      await axios.post('https://social-back-hazel.vercel.app/api/users', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Submission successful!');
      setName('');
      setSocialHandle('');
      setImages([]);
    } catch (err) {
      console.error(err);
      alert('Error submitting the form!');
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">User Submission Form</h2>
      <form onSubmit={handleSubmit} className="form-content">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Social Media Handle:</label>
          <input
            type="text"
            value={socialHandle}
            onChange={(e) => setSocialHandle(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Upload Images:</label>
          <input type="file" multiple onChange={handleImageChange} className="form-input-file" />
          {images.length > 0 && (
            <div className="file-names">
              {Array.from(images).map((file, index) => (
                <span key={index} className="file-name">{file.name}</span>
              ))}
            </div>
          )}
        </div>

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
