import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios'; // Import Axios
import './studentregister.css';

function StudentRegistration() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gender: 'male',
    dob: '',
    address: '',
    password: '',
    confirmPassword: '',
    phno: '',
    subject: 'Networks' // Add subject field with a default value
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
      setMessage("Passwords do not match");
      setMessageType('error');
      return;
    }

    try {
      console.log(formData)
      const response = await axios.post('http://localhost:8081/student/register', formData);
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
      lastName: '',
      email: '',
      gender: 'male',
      dob: '',
      address: '',
      password: '',
      confirmPassword: '',
      phno: '',
      subject: 'Networks' // Reset subject to default
    });
    setMessage('');
    setMessageType('');
  };

  return (
    <div className="container">
      <div className="text-center mb-4">
        <Link to="/">
          <Button variant="secondary">Back</Button>
        </Link>
      </div>
      <h2 className="text-center">Student Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

<label htmlFor="phno">Phone number</label>
<input
  type="number"
  id="phno"
  name="phno"
  value={formData.phno}
  onChange={handleChange}
  required
  minLength="10"
  maxLength="10"
  onInput={(e) => e.target.value = e.target.value.slice(0, 10)} // Prevents exceeding 10 digits
/>
          <label htmlFor="subject">Subject</label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
        >
          <option value="Networks">Networks</option>
          <option value="Data_structure">Data structure</option>
          <option value="Operating_System">Operating System</option>
        </select>
        <label htmlFor="gender">Gender</label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <label htmlFor="dob">Date of Birth</label>
        <input
          type="date"
          id="dob"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
        />

        <label htmlFor="address">Address</label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          rows="4"
          required
        ></textarea>

      

<label htmlFor="password">Password</label>
<input
  type="password"
  id="password"
  name="password"
  value={formData.password}
  onChange={handleChange}
  required
  minLength="5" // Minimum 5 characters for password
/>

<label htmlFor="confirmPassword">Confirm Password</label>
<input
  type="password"
  id="confirmPassword"
  name="confirmPassword"
  value={formData.confirmPassword}
  onChange={handleChange}
  required
  minLength="5" // Minimum 5 characters for password
/>

        <br />
        <br />
        <Button variant="outline-info" type="submit">Submit</Button>{' '}
        <Button variant="warning" type="button" onClick={handleReset}>Reset</Button>
      </form>
      {message && (
        <div className={messageType === 'success' ? 'success-message' : 'error-message'}>
          {message}
        </div>
      )}
    </div>
  );
}

export default StudentRegistration;
