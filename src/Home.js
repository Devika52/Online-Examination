import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import './login.css';

function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleChange = (e) => {
    const selectedRole = e.target.value;
    if (selectedRole === '/student-register' || selectedRole === '/teacher-register') {
      window.location.href = selectedRole; // Redirect using window.location.href
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8081/admin_login', { username, password })
      .then(res => {
        console.log(username, password)
        if (res.data.success) {
          localStorage.setItem('isAdminLoggedIn', true);
          navigate('/admin'); // Redirect to admin page upon successful login
        } else {
          alert("Incorrect Login")
          console.log("Login failed:", res.data.message); // Log the error message
        }
      })
      .catch(err => {
        console.error("Error occurred:", err); // Log any network or server errors
      });
  };

  const handleReset = (event) => {
    event.preventDefault();
    setUsername('');
    setPassword('');
  };

  return (
    <div className="App">
      <div className="position-absolute top-0 end-0 p-4">
        <select defaultValue="" onChange={handleChange}>
          <option value="" disabled>Register as</option>
          <option value="/student-register">Student Register</option>
          <option value="/teacher-register">Teacher Register</option>
        </select>
      </div>
      <h1>Online Examination System</h1>
      <div className="login-container">
        <div className="text-center mb-4 p-50">
          <select>
            <option>Select..</option>
            <option>Student</option>
            <option>Admin</option>
            <option>Teacher</option>
          </select>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <Button type="submit" variant="outline-info">Submit</Button>{' '}
          <Button variant="warning" onClick={handleReset}>Reset</Button> {/* Use onClick to prevent default behavior */}
        </form>
      </div>
    </div>
  );
}

export default Home;
