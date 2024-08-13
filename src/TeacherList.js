import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8081/api/teachers')
      .then(response => {
        setTeachers(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the teacher data!', error);
      });
  }, []);

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Teacher List</h2>
      <div className="d-flex justify-content-center mb-4">
        <button className="btn btn-secondary back-button" onClick={handleBack}>Back</button>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Teacher ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Gender</th>
            <th>Date of Birth</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map(teacher => (
            <tr key={teacher.id}>
              <td>{teacher.id}</td>
              <td>{teacher.first_name}</td>
              <td>{teacher.last_name}</td>
              <td>{teacher.email}</td>
              <td>{teacher.phone_no}</td>
              <td>{teacher.gender}</td>
              <td>{teacher.date_of_birth}</td>
              <td>{teacher.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TeacherList;
