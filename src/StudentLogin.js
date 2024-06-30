import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Registration.css';

function StudentLogin() {
  const [role, setRole] = useState('Student'); // Default role set to Student
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
          <h1 className="text-center mb-4">Student Login</h1>
          <Form style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
              <Form.Label column sm="4">
                Username
              </Form.Label>
              <Col sm="8">
                <Form.Control type="text" placeholder="Username" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
              <Form.Label column sm="4">
                Password
              </Form.Label>
              <Col sm="8">
                <Form.Control type="password" placeholder="Password" />
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
