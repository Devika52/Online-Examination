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
      console.log("asdf",user)
    } else {
      navigate('/'); // Redirect if no user data is available
    }
  }, [user, navigate]);

  const backgroundImageUrl = 'https://img.freepik.com/free-photo/2d-graphic-colorful-wallpaper-with-grainy-gradients_23-2151001571.jpg?t=st=1720328601~exp=1720332201~hmac=3f6029e17fbdc4be63e68c9e2ee7675a222d7e156aafc71538dccb540ac0d561&w=900';
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
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    border: '1px solid rgba(0, 0, 0, 0.8)',
    color: '#fff',
    width: '30%',
    textAlign: 'center',
  };

  const buttonStyle = {
    color: '#fff',
  };

  if (status === 'pending') {
    return (
      <div style={backgroundStyle}>
        <div style={containerStyle}>
          <h1 style={{ color: '#fff' }}>You have to be approved by the admin</h1>
          <Link to="/"><Button style={buttonStyle} variant="outline-info">Back</Button></Link>
        </div>
      </div>
    );
  }

  if (status === 'approved') {
    return (
      <div style={backgroundStyle}>
        <div style={containerStyle}>
          <Link to="/"><Button style={buttonStyle} className="ms-2 mb-2" variant="outline-info">Back</Button></Link>
          <h1 style={{ color: '#fff' }}>Teacher</h1>
          <div>
            <Link to="/update-student"><Button style={buttonStyle} className="ms-2 mb-2" variant="outline-info">Update Student</Button><br /></Link>
            <Link to="/delete-student"><Button style={buttonStyle} className="ms-2 mb-2" variant="outline-info">Delete student</Button><br /></Link>
            <Link to="/student-list"><Button style={buttonStyle} className="ms-2 mb-2" variant="outline-info">View Student list</Button><br /></Link>
            <Button style={buttonStyle} className="ms-2 mb-2" variant="outline-info">Approval</Button><br />
            <Link to="/exam-results"><Button style={buttonStyle} className="ms-2 mb-2" variant="outline-info">View exam result</Button></Link>
          </div>
        </div>
      </div>
    );
  }

  return null; // Or a loading indicator while checking the status
}

export default Teacher;
