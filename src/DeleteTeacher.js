import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function DeleteTeacher() {
  const [teachers, setTeachers] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = () => {
    axios.get('http://localhost:8081/api/teachers')
      .then(response => {
        setTeachers(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the teacher data!', error);
      });
  };

  const handleDelete = (teacherId) => {
    axios.delete(`http://localhost:8081/api/teachers/${teacherId}`)
      .then(response => {
        setMessage(response.data.message);
        fetchTeachers(); // Refresh the teacher list
      })
      .catch(error => {
        setMessage(error.response ? error.response.data.message : 'Error deleting teacher');
      });
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Delete Teacher</h2>
      <div className="d-flex justify-content-center mb-4">
        <button className="btn btn-secondary back-button" onClick={handleBack}>Back</button>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Teacher ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Gender</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map(teacher => (
            <tr key={teacher.teacher_id}>
              <td>{teacher.teacher_id}</td>
              <td>{teacher.name}</td>
              <td>{teacher.email}</td>
              <td>{teacher.ph_no}</td>
              <td>{teacher.address}</td>
              <td>{teacher.gender}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDelete(teacher.teacher_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {message && <div className="mt-3 alert alert-info">{message}</div>}
    </div>
  );
}

export default DeleteTeacher;
