import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Registration.css';
import { setUser } from './hooks/useAuth';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
function StudentLogin() {
  const [role, setRole] = useState('Student'); // Default role set to Student
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);

    // Redirect based on the selected role
    if (selectedRole === 'Admin') {
      navigate('/');
    } else if (selectedRole === 'Teacher') {
      navigate('/teacher-login');
    }
  };

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8081/login', { username, password })
      .then(res => {
        
        if (res.data.success) {
          console.log(res.data.data);
          const user = res.data.data
          setUser(user)
          navigate('/question-bank/view'); // Redirect to admin page upon successful login
        } else {
          alert("Incorrect Login");
          console.log("Login failed:", res.data.message); // Log the error message
        }
      })
      .catch(err => {
        console.error("Error occurred:", err); // Log any network or server errors
      });
  };

  return (
    <div className="background-image">
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="border p-4" style={{ backgroundColor: 'white', borderRadius: '10px' }}>
        <div className="d-flex justify-content-center mb-3">
          <Link to="/"><Button variant="secondary">Back</Button></Link>
        </div>
          <div className="text-center mb-4">
            <select value={role} onChange={handleRoleChange} className="form-select">
              <option value="Student">Student</option>
              <option value="Admin">Admin</option>
              <option value="Teacher">Teacher</option>
            </select>
          </div>
          
          <h1 className="text-center mb-4">Student Login</h1>
          <Form onSubmit={handleLogin} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
              <Form.Label column sm="4">
                Email
              </Form.Label>
              <Col sm="8">
                <Form.Control type="text" placeholder="username" value={username} onChange={handleUsernameChange} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
              <Form.Label column sm="4">
                Password
              </Form.Label>
              <Col sm="8">
                <Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
              </Col>
            </Form.Group>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default StudentLogin;
