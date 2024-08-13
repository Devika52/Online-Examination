import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
function StudentList() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8081/api/students')
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the student data!', error);
      });
  }, []);

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Student List</h2>
      <div className="d-flex justify-content-center mb-4">
      <Button variant="secondary" onClick={handleBack}>Back</Button>{' '}
      
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Gender</th>
            <th>Date of Birth</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.first_name}</td>
              <td>{student.last_name}</td>
              <td>{student.email}</td>
              <td>{student.phone_no}</td>
              <td>{student.address}</td>
              <td>{student.gender}</td>
              <td>{student.date_of_birth}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;
