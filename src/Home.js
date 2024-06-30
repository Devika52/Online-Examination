import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import './login.css';

function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Admin'); // Default role set to Admin
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);

    // Redirect based on the selected role
    if (selectedRole === 'Student') {
      navigate('/student-login');
    } else if (selectedRole === 'Teacher') {
      navigate('/teacher-login');
    }
  };

  const handleRegisterChange = (e) => {
    const selectedRegisterRole = e.target.value;
    window.location.href = selectedRegisterRole; // Redirect using window.location.href
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8081/admin_login', { username, password })
      .then(res => {
        console.log(username, password);
        if (res.data.success) {
          localStorage.setItem('isAdminLoggedIn', true);
          navigate('/admin'); // Redirect to admin page upon successful login
        } else {
          alert("Incorrect Login");
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
        <select defaultValue="" onChange={handleRegisterChange} className="form-select">
          <option value="" disabled>Register as</option>
          <option value="/student-register">Student Register</option>
          <option value="/teacher-register">Teacher Register</option>
        </select>
      </div>
      <div className="login-container">
        <div className="text-center mb-4">
          <select value={role} onChange={handleRoleChange} className="form-select">
            <option value="Student">Student</option>
            <option value="Admin">Admin</option>
            <option value="Teacher">Teacher</option>
          </select>
        </div>
        <h1 className="text-center mb-4">Online Examination System</h1>
        {role === 'Admin' && (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
              />
            </div>
            <Button type="submit" variant="outline-info" className="mt-2">Submit</Button>{' '}
            <Button variant="warning" onClick={handleReset} className="mt-2">Reset</Button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Home;
