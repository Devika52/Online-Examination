import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Registration.css';
import axios from 'axios';

function TeacherLogin() {
  const [role, setRole] = useState('Teacher'); // Default role set to Teacher
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);

    // Redirect based on the selected role
    if (selectedRole === 'Student') {
      navigate('/student-login');
    } else if (selectedRole === 'Admin') {
      navigate('/');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8081/teacher-login', { email, password, role })
      .then((response) => {
        if (response.data.success) {
          navigate('/teacher');
        } else {
          alert('Invalid credentials');
        }
      })
      .catch((error) => {
        alert('An error occurred');
        console.error(error);
      });
  };

  return (
    <div className="background-image">
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="border p-4" style={{ backgroundColor: 'white', borderRadius: '10px' }}>
          <div className="text-center mb-4">
            <select value={role} onChange={handleRoleChange} className="form-select">
              <option value="Student">Student</option>
              <option value="Admin">Admin</option>
              <option value="Teacher">Teacher</option>
            </select>
          </div>
          <h1 className="text-center mb-4">Teacher's Login</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
              <Form.Label column sm="4">
                Email
              </Form.Label>
              <Col sm="8">
                <Form.Control 
                  type="email" 
                  placeholder="Email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
              <Form.Label column sm="4">
                Password
              </Form.Label>
              <Col sm="8">
                <Form.Control 
                  type="password" 
                  placeholder="Password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                />
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

export default TeacherLogin;
