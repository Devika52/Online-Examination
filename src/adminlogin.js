import React, { useState } from 'react';
import './adminlogin.css';

function AdminLogin() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate the username and password
    if (formData.username === 'admin' && formData.password === 'admin123') {
      alert('Login successful!');
      // Redirect or perform further actions for logged in admin
    } else {
      alert('Invalid username or password');
    }
  };

  const handleReset = () => {
    setFormData({
      username: '',
      password: ''
    });
  };

  return (
    <div className="background">
    <div className="container">
      <h2 className="title">Admin Login</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="username" className="label">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="label">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <div className="button-group">
          <button type="submit" className="button">Login</button>
          <button type="button" onClick={handleReset} className="button">Reset</button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default AdminLogin;
