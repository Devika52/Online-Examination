import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function DeleteStudent() {
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios.get('http://localhost:8081/api/students')
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the student data!', error);
      });
  };

  const handleDelete = (studentId) => {
    axios.delete(`http://localhost:8081/api/students/${studentId}`)
      .then(response => {
        setMessage(response.data.message);
        fetchStudents(); // Refresh the student list
      })
      .catch(error => {
        setMessage(error.response ? error.response.data.message : 'Error deleting student');
      });
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Delete Student</h2>
      <div className="d-flex justify-content-center mb-4">
        <button className="btn btn-secondary back-button" onClick={handleBack}>Back</button>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Gender</th>
            <th>Date of Birth</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.student_id}>
              <td>{student.student_id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.ph_no}</td>
              <td>{student.address}</td>
              <td>{student.gender}</td>
              <td>{student.dob}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDelete(student.student_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {message && <div className="mt-3 alert alert-info">{message}</div>}
    </div>
  );
}

export default DeleteStudent;
