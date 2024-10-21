import React, { useState } from 'react';
import { Button, Col, Form, Row, Container } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Registration.css'; // Import the custom CSS
import { Link } from 'react-router-dom';

function Registration() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName:'',
    email: '',
    address: '',
    gender: 'Male',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    dob:''
  });

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      setMessageType('error');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8081/teacher/register', formData);
      setMessage(response.data.message); // Assuming the backend sends a message in response
      setMessageType('success');
    } catch (error) {
      setMessage('Error occurred during registration');
      setMessageType('error');
    }
  };

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName:'',
      email: '',
      address: '',
      gender: 'Male',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      dob:''
    });
    setMessage('');
    setMessageType('');
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="registration-form mt-5">
        <div className="text-center mb-4 ">
          <Link to="/">
            <Button variant="secondary">Back</Button>
          </Link>
        </div>
        <h1 className="text-center">Teacher's Registration</h1>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Form.Group as={Col} controlId="formGridName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Your First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="formGridName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} controlId="formGridAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} controlId="formGridGender">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as="select"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Control>
            </Form.Group>
          </Row>

          <Row>
          <Form.Group as={Col} controlId="formGridPhoneNumber">
  <Form.Label>Phone Number</Form.Label>
  <Form.Control
    type="text"
    placeholder="Enter your phone number"
    name="phoneNumber"
    value={formData.phoneNumber}
    onChange={handleChange}
    required
    maxLength="10" // Max 10 digits
    minLength="10" // Min 10 digits
    onInput={(e) => e.target.value = e.target.value.slice(0, 10)} // Prevents entering more than 10 digits
  />
</Form.Group>
          </Row>
          <Row>
  <Form.Group as={Col} controlId="formGridDob">
    <Form.Label>Date of Birth</Form.Label>
    <Form.Control
      type="date"
      placeholder="Enter your date of birth"
      name="dob"
      value={formData.dob}
      onChange={handleChange}
      required
    />
  </Form.Group>
</Row>

<Row>
  <Form.Group as={Col} controlId="formGridPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control
      type="password"
      placeholder="Enter password"
      name="password"
      value={formData.password}
      onChange={handleChange}
      required
      minLength="5" // Minimum 5 characters for password
    />
  </Form.Group>
</Row>

<Row>
  <Form.Group as={Col} controlId="formGridConfirmPassword">
    <Form.Label>Confirm Password</Form.Label>
    <Form.Control
      type="password"
      placeholder="Confirm password"
      name="confirmPassword"
      value={formData.confirmPassword}
      onChange={handleChange}
      required
      minLength="5" // Minimum 5 characters for confirm password
    />
  </Form.Group>
</Row>
          <br/>
          <div className="d-grid gap-2">
            <div className="Button-row">
              <Button variant="outline-success" type="submit">Submit</Button>
              <Button variant="outline-success" type="button" onClick={handleReset}>Reset</Button>
            </div>
          </div>
        </Form>
        {message && (
          <div className={messageType === 'success' ? 'success-message' : 'error-message'}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default Registration;
