import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function UpdateTeacher() {
  const [email, setEmail] = useState('');
  const [teacher, setTeacher] = useState(null);
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleCheck = (e) => {
    e.preventDefault();
  
    axios.get(`http://localhost:8081/api/teachers/${email}`)
      .then(response => {
        const fetchedTeacher = response.data;
        if (fetchedTeacher.date_of_birth) {
          // Ensure date format is compatible with <input type="date">
          fetchedTeacher.date_of_birth = new Date(fetchedTeacher.date_of_birth).toISOString().split('T')[0];
        }
        setTeacher(fetchedTeacher);
        setMessage('');
      })
      .catch(error => {
        setMessage(error.response ? error.response.data.message : 'Error fetching teacher details');
        setTeacher(null);
      });
  };
  
  const handleUpdate = (e) => {
    e.preventDefault();

    if (!teacher) return;

    axios.put('http://localhost:8081/api/updateteachers', {
      email: teacher.email,
      first_name: teacher.first_name,
      last_name: teacher.last_name,
      phone_no: teacher.phone_no,
      gender: teacher.gender,
      address: teacher.address,
      date_of_birth: teacher.date_of_birth
    })
    .then(response => {
      setMessage(response.data.message);
    })
    .catch(error => {
      setMessage(error.response ? error.response.data.message : 'Error updating teacher details');
    });
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const handleChange = (e) => {
    setTeacher({ ...teacher, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-5">
        <div className="d-flex justify-content-center mb-4">
        <button className="btn btn-secondary back-button" onClick={handleBack}>Back</button>
      </div>
      <h2 className="mb-4">Update Teacher Details</h2>
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
      {teacher && (
        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              name="first_name"
              value={teacher.first_name}
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
              value={teacher.last_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              className="form-control"
              name="phone_no"
              value={teacher.phone_no}
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
              value={teacher.gender}
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
              value={teacher.address}
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
              value={teacher.date_of_birth}
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

export default UpdateTeacher;
