import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import './YourStyles.css';
const StudentApproval = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Set the base URL for Axios
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:8081/api',
  });
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
};
  useEffect(() => {
    const fetchPendingStudents = async () => {
      try {
        const response = await axiosInstance.get('/users', {
          params: { role: 'student', status: 'pending' },
        });
        setStudents(response.data);
      } catch (err) {
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingStudents();
  }, []);

  const handleApprove = async (studentId) => {
    try {
      await axiosInstance.post(`/users/${studentId}/approve`);
      setStudents(students.filter(student => student.id !== studentId));
    } catch (err) {
      alert(`Error: ${err.response?.data?.error || err.message}`);
    }
  };

  const handleReject = async (studentId) => {
    try {
      await axiosInstance.post(`/users/${studentId}/reject`);
      setStudents(students.filter(student => student.id !== studentId));
    } catch (err) {
      alert(`Error: ${err.response?.data?.error || err.message}`);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container className="my-4">
      <div style={{ 
        backgroundColor: '#f9f9f9', 
        border: '1px solid #ccc', 
        padding: '20px', 
        borderRadius: '8px' 
      }}>
       <div className="d-flex justify-content-center mt-4">
          <Button variant="secondary"  onClick={handleBack}>Back</Button>
        </div>
        <h1>Pending Student Approvals</h1>
        {students.length === 0 ? (
          <p>No pending students found.</p>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Phone No</th>
                <th>Gender</th>
                <th>Address</th>
                <th>Date of Birth</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.first_name}</td>
                  <td>{student.last_name}</td>
                  <td>{student.email}</td>
                  <td>{student.role}</td>
                  <td>{student.phone_no}</td>
                  <td>{student.gender}</td>
                  <td>{student.address}</td>
                  <td>{new Date(student.date_of_birth).toLocaleDateString()}</td>
                  <td>
                    <Row>
                      <Col className="d-flex justify-content-between">
                        <Button variant="success" className="me-2" onClick={() => handleApprove(student.id)}>Approve</Button>
                        <Button variant="danger" onClick={() => handleReject(student.id)}>Reject</Button>
                      </Col>
                    </Row>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </Container>
  );
};

export default StudentApproval;
