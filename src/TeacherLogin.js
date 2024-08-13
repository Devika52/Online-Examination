import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Col, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { setUser } from './hooks/useAuth';  // Import setUser from the useAuth hook

function TeacherLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    setIsLoading(true);
    axios.post('http://localhost:8081/teacher-login', { email, password, role: 'Teacher' })
      .then((response) => {
        setIsLoading(false);
        if (response.data.success) {
          setUser(response.data.user);  // Use setUser to store the user data
          console.log("asdfasdf",response.data.user);
          console.log("user",response.data.success);
          navigate('/teacher');
        } else {
          setErrorMessage(response.data.message || 'Invalid credentials');
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setErrorMessage('An error occurred. Please try again.');
        console.error(error);
      });
  };

  return (
    <div className="background-image">
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="border p-4" style={{ backgroundColor: 'white', borderRadius: '10px' }}>
          <div className="d-flex justify-content-center mb-3">
            <Link to="/"><Button variant="secondary">Back</Button></Link>
          </div>
          <h1 className="text-center mb-4">Teacher's Login</h1>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
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
                  required
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
                  required
                />
              </Col>
            </Form.Group>

            <div className="d-grid">
              <Button type="submit" variant="primary" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Submit'}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default TeacherLogin;
