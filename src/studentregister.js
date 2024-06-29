import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios'; // Import Axios
import './studentregister.css';

function StudentRegistration() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    gender: 'male',
    dob: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:8081/student/register', formData);
      console.log(response.data); // Log the response from the server
      // Optionally, you can add further logic based on the response, e.g., show a success message
    } catch (error) {
      console.error('Error occurred:', error);
      // Handle error: show an error message or perform any necessary actions
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      gender: 'male',
      dob: '',
      address: ''
    });
  };

  return (
    <div className="container">
      <h2>Student Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
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

        <br />
        <button style={{ marginRight: '10px' }} type="submit">
          Submit
        </button>
        <button style={{ marginRight: '10px' }} type="button" onClick={handleReset}>
          Reset
        </button>
        <Link to="/teacher-register">
          <Button variant="secondary">Teacher Register</Button>
        </Link>
      </form>
    </div>
  );
}

export default StudentRegistration;
