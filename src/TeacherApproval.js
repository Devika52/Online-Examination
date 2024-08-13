import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TeacherApproval = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/teacherusers', {
          params: { role: 'teacher', status: 'pending' },
        });
        setTeachers(response.data);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };                                    
                                        
    fetchTeachers();
  }, []);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const handleApprove = async (id) => {
    try {
      await axios.post(`http://localhost:8081/api/teacherusers/${id}/approve`);
      setTeachers(teachers.filter((teacher) => teacher.id !== id));
    } catch (error) {
      console.error('Error approving teacher:', error);
    }
  };
                                            
  const handleReject = async (id) => {
    try {
      await axios.post(`http://localhost:8081/api/teacherusers/${id}/reject`);
      setTeachers(teachers.filter((teacher) => teacher.id !== id));
    } catch (error) {
      console.error('Error rejecting teacher:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-CA'); // This formats the date as 'YYYY-MM-DD'
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center mt-4">
        <Button variant="secondary" onClick={handleBack}>Back</Button>
      </div>
      <h2 className="text-center my-4">Teacher Approval</h2>
      <Table bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Phone Number</th>
            <th>Gender</th>
            <th>Address</th>
            <th>Date of Birth</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id}>
              <td>{teacher.first_name}</td>
              <td>{teacher.last_name}</td>
              <td>{teacher.email}</td>
              <td>{teacher.role}</td>
              <td>{teacher.phone_no}</td>
              <td>{teacher.gender}</td>
              <td>{teacher.address}</td>
              <td>{formatDate(teacher.date_of_birth)}</td> {/* Format the date here */}
              <td>
                <div className="d-flex justify-content-between">
                  <Button variant="success" onClick={() => handleApprove(teacher.id)} className="me-2">Approve</Button>
                  <Button variant="danger" onClick={() => handleReject(teacher.id)}>Reject</Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TeacherApproval;
