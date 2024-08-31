import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Admin() {
    const backgroundImageUrl = 'https://kristujayanti.edu.in/images/clg_history.jpg';

    const backgroundStyle = {
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const containerStyle = {
        padding: '30px',
        borderRadius: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        border: '1px solid rgba(0, 0, 0, 0.8)',
        color: '#fff',
        width: '40%',
        height: 'auto',
        textAlign: 'center',
    };

    const buttonContainerStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)', // Two columns
        gap: '10px', // Space between buttons
    };

    const buttonStyle = {
        color: '#fff',
        width: '100%', // Make the button take full width within its grid cell
    };

    return (
        <div style={backgroundStyle}>
            <div style={containerStyle}>
                <Link to="/"><Button  className="ms-2 mb-2" variant="secondary">Back</Button></Link>
                <h1 style={{ color: 'black' }}>Admin</h1>
                <div style={buttonContainerStyle}>
                    <Link to="/student-Approval"><Button style={buttonStyle} variant="secondary">Student Approval</Button></Link>
                    <Link to="/update-student"><Button style={buttonStyle} variant="secondary">Update Student</Button></Link>
                    <Link to="/delete-student"><Button style={buttonStyle} variant="secondary">Delete Student</Button></Link>
                    <Link to="/student-list"><Button style={buttonStyle} variant="secondary">View Student List</Button></Link>

                    <Link to="/teacher-Approval"><Button style={buttonStyle} variant="secondary">Teacher Approval</Button></Link>
                    <Link to="/update-teacher"><Button style={buttonStyle} variant="secondary">Update Teacher</Button></Link>
                    <Link to="/delete-teacher"><Button style={buttonStyle} variant="secondary">Delete Teacher</Button></Link>
                    <Link to="/teacher-list"><Button style={buttonStyle} variant="secondary">View Teacher List</Button></Link>
                    
                    <Link to='/question-bank/add'><Button style={buttonStyle} variant="secondary">Add Question</Button></Link>
                    <Link to='/question-bank/view'><Button style={buttonStyle} variant="secondary">View Question</Button></Link>
                    <Link to="/exam-results"><Button style={buttonStyle} variant="secondary">View Exam Result</Button></Link>
                    <Link to="/feedback"><Button style={buttonStyle} variant="secondary">View Feedback</Button></Link>
                </div>
            </div>
        </div>
    );
}

export default Admin;
