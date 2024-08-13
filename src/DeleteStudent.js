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
        // Format date of birth for each student
        const formattedStudents = response.data.map(student => {
          let formattedDateOfBirth = '';
          if (student.date_of_birth) {
            const date = new Date(student.date_of_birth);
            // Check if the date is valid
            if (!isNaN(date.getTime())) {
              formattedDateOfBirth = date.toISOString().split('T')[0];
            } else {
              console.error('Invalid date:', student.date_of_birth);
            }
          }
          return {
            ...student,
            date_of_birth: formattedDateOfBirth
          };
        });
        setStudents(formattedStudents);
        console.log("Formatted students:", formattedStudents);
      })
      .catch(error => {
        console.error('There was an error fetching the student data!', error);
      });
  };
  
  const handleDelete = (studentId) => {
    console.log(studentId)
    axios.delete(`http://localhost:8081/api/deletestudents/${studentId}`)
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
            <th>First Name</th>
            <th>Last Name</th>
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
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.first_name}</td>
              <td>{student.last_name}</td>
              <td>{student.email}</td>
              <td>{student.phone_no}</td>
              <td>{student.address}</td>
              <td>{student.gender}</td>
              <td>{student.date_of_birth}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDelete(student.id)}>Delete</button>
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
