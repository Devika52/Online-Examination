import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Admin() {
    const backgroundImageUrl = 'https://cdn.wallpapersafari.com/64/56/aFbhVw.jpg';

    // Styles for the background and container
    const backgroundStyle = {
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', // Fix the background image
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const containerStyle = {
        padding: '30px', // Adjust padding for smaller height
        borderRadius: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.3)', // White background with alpha 0.3 for transparency
        border: '1px solid rgba(0, 0, 0, 0.8)', // Border with slight transparency
        color: '#fff', // Set text color to white for the entire container
        width: '30%', // Adjust the width as per your design
        height: '99%', // Set a specific height for the container
        textAlign: 'center',
        // overflowY: 'auto' // Add scroll if content overflows
    };

    // Style for the buttons to make the text white
    const buttonStyle = {
        color: '#fff', // Set text color to white
    };

    return (
        <div style={backgroundStyle}>
            <div style={containerStyle}>
                <Link to="/"><Button style={buttonStyle} className="ms-2 mb-2" variant="outline-info">Back</Button></Link>
                <h1 style={{ color: '#fff' }}>Admin</h1>
                <div>
                    <Button style={buttonStyle} className="ms-2 mb-2" variant="outline-info">Student Approval</Button><br/>
                    <Link to="/update-student"><Button style={buttonStyle} className="ms-2 mb-2" variant="outline-info">Update Student</Button><br/></Link>
                    <Link to="/delete-student"><Button style={buttonStyle} className="ms-2 mb-2" variant="outline-info">Delete Student</Button><br/></Link>
                    <Link to="/student-list"><Button style={buttonStyle} className="ms-2 mb-2" variant="outline-info">View Student List</Button><br/></Link>

                    <Button style={buttonStyle} className="ms-2 mb-2" variant="outline-info">Teacher Approval</Button><br/>
                    <Link to="/update-teacher"><Button style={buttonStyle} className="ms-2 mb-2" variant="outline-info">Update Teacher</Button><br/></Link>
                    <Link to="/delete-teacher"><Button style={buttonStyle} className="ms-2 mb-2" variant="outline-info">Delete Teacher</Button><br/></Link>
                    <Link to="/teacher-list"><Button style={buttonStyle} className="ms-2 mb-2" variant="outline-info">View Teacher List</Button><br/></Link>
                    
                    <Link to='/question-bank/add'><Button style={buttonStyle}  className="ms-2 mb-2" variant="outline-info">Add Question</Button></Link><br/>
                    <Link to='/question-bank/view'><Button style={buttonStyle}  className="ms-2 mb-2" variant="outline-info">View Question</Button></Link><br/>
                    <Link to="/exam-results"><Button style={buttonStyle} className="ms-2 mb-2" variant="outline-info">View Exam Result</Button></Link>
                </div>
            </div>
        </div>
    );
}

export default Admin;
