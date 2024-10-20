import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getUser } from './hooks/useAuth'; // Import getUser to retrieve the current user

function Teacher() {
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  // Get the current user using getUser
  const user = getUser();

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await axios.get('http://localhost:8081/checkusers/status', {
          params: { user_id: user?.id },
        });
        if (response.data.status === 'pending') {
          setStatus('pending');
        } else if (response.data.status === 'approved') {
          setStatus('approved');
        }
      } catch (error) {
        console.error('Error checking status:', error);
      }
    };

    if (user) {
      checkStatus();
    } else {
      navigate('/'); // Redirect if no user data is available
    }
  }, [user, navigate]);

  const backgroundImageUrl = 'https://kristujayanti.edu.in/images/clg_history.jpg';
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const containerStyle = {
    padding: '60px',
    borderRadius: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    border: '1px solid rgba(0, 0, 0, 0.8)',
    color: '#000', // Change text color to black for better contrast
    width: '50%', // Adjusted width to accommodate side-by-side buttons
    textAlign: 'center',
  };

  const buttonStyle = {
    color: '#fff',
    margin: '5px',
  };

  const buttonContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',  // Wrap buttons if the screen is smaller
    justifyContent: 'center', // Center the buttons horizontally
    gap: '5px', // Add gap between buttons
  };

  if (status === 'pending') {
    return (
      <div style={backgroundStyle}>
        <div style={containerStyle}>
          <h1 style={{ color: '#000' }}>You have to be approved by the admin</h1> {/* Adjust text color */}
          <Link to="/"><Button style={buttonStyle} variant="outline-info">Back</Button></Link>
        </div>
      </div>
    );
  }

  if (status === 'approved') {
    return (
      <div style={backgroundStyle}>
        <div style={containerStyle}>
          <Link to="/"><Button style={buttonStyle} className="ms-2 mb-2" variant="secondary">Back</Button></Link>
          <h1 style={{ color: '#000' }}>Teacher</h1> {/* Adjust text color */}
          <div style={buttonContainerStyle}>
            <Link to="/update-student">
              <Button style={buttonStyle} variant="secondary">Update Student</Button>
            </Link>
            <Link to="/delete-student">
              <Button style={buttonStyle} variant="secondary">Delete Student</Button>
            </Link>
            <Link to="/student-list">
              <Button style={buttonStyle} variant="secondary">View Student List</Button>
            </Link>
            <Link to="/student-Approval">
              <Button style={buttonStyle} variant="secondary">Student Approval</Button>
            </Link>
            <Link to='/question-bank/add'>
              <Button style={buttonStyle} variant="secondary">Add Question</Button>
            </Link>
            <Link to='/question-bank/delete'>
              <Button style={buttonStyle} variant="secondary">Delete Question</Button>
            </Link>
            <Link to="/exam-results">
              <Button style={buttonStyle} variant="secondary">View Exam Result</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return null; // Or a loading indicator while checking the status
}

export default Teacher;
