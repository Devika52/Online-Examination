import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function UpdateStudent() {
  const [email, setEmail] = useState('');
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleCheck = (e) => {
    e.preventDefault();

    axios.get(`http://localhost:8081/api/students/${email}`)
      .then(response => {
        const fetchedStudent = response.data;
        if (fetchedStudent.date_of_birth) {
          // Ensure date format is compatible with <input type="date">
          fetchedStudent.date_of_birth = new Date(fetchedStudent.date_of_birth).toISOString().split('T')[0];
        }
        setStudent(fetchedStudent);
        setMessage('');
      })
      .catch(error => {
        setMessage(error.response ? error.response.data.message : 'Error fetching student details');
        setStudent(null);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
  
    if (!student) return;
  
    const updateData = {
      email: student.email,
      firstname: student.first_name,
      lastname: student.last_name,
      ph_no: student.phone_no,  // Ensure this field is correct
      address: student.address,
      gender: student.gender,
      dob: student.date_of_birth,  // Ensure this is in the correct format
    };
    console.log("firstname",student.first_name);
    console.log('Update data:', updateData);  // Debugging data
  
    axios.put('http://localhost:8081/apii/students', updateData)
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('Update error:', error);  // Detailed error logging
        setMessage(error.response ? error.response.data.message : 'Error updating student details');
      });
  };
  
  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center mb-4">
        <button className="btn btn-secondary back-button" onClick={handleBack}>Back</button>
      </div>
      <h2 className="mb-4">Update Student Details</h2>
      <form onSubmit={handleCheck}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Check</button>
      </form>
      {student && (
        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              name="first_name"
              value={student.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              name="last_name"
              value={student.last_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="number"
              className="form-control"
              name="phone_no"
              value={student.phone_no}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              name="address"
              value={student.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Gender</label>
            <input
              type="text"
              className="form-control"
              name="gender"
              value={student.gender}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Date of Birth</label>
            <input
              type="date"
              className="form-control"
              name="date_of_birth"
              value={student.date_of_birth}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Update</button>
        </form>
      )}
      {message && <div className="mt-3 alert alert-info">{message}</div>}
    </div>
  );
}

export default UpdateStudent;
