import React, { useState } from 'react';
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
        setStudent(response.data);
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

    axios.put('http://localhost:8081/api/students', {
      email: student.email,
      name: student.name,
      ph_no: student.ph_no,
      address: student.address,
      gender: student.gender,
      dob: student.dob,
    })
    .then(response => {
      setMessage(response.data.message);
    })
    .catch(error => {
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
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={student.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              className="form-control"
              name="ph_no"
              value={student.ph_no}
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
              name="dob"
              value={student.dob}
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
