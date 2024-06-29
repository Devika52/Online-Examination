
import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';



function Admin() {
    const backgroundImageUrl = 'https://img.freepik.com/premium-photo/3d-abstract-colorful-curvy-waves-texture-background_608451-464.jpg';
    // const navigate = useNavigate();
    // Styles for the background and container
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
        backgroundColor: 'rgba(255, 255, 255, 0.3)', // White background with alpha 0.3 for transparency
        border: '1px solid rgba(0, 0, 0, 0.8)', // Border with slight transparency
        color: '#fff', // Set text color to white for the entire container
        width: '30%', // Adjust the width as per your design
        textAlign: 'center',
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
    <Button style={buttonStyle} className="ms-2 mb-2" variant="outline-info">Add Student</Button><br/>
    <Button style={buttonStyle} className="ms-2 mb-2" variant="outline-info">Update Student</Button><br/>
    <Button style={buttonStyle} className="ms-2 mb-2" variant="outline-info">Delete student</Button><br/>
    <Button style={buttonStyle} className="ms-2 mb-2" variant="outline-info">View Student list</Button><br/>
    <Button style={buttonStyle} className="ms-2 mb-2" variant="outline-info">Add Teacher</Button><br/>
    <Button style={buttonStyle} className="ms-2 mb-2" variant="outline-info">Update Teacher</Button><br/>
    <Button style={buttonStyle} className="ms-2 mb-2" variant="outline-info">Delete Teacher</Button><br/>
    <Button style={buttonStyle} className="ms-2 mb-2" variant="outline-info">View Teacher list</Button><br/>
    <Button style={buttonStyle} className="ms-2 mb-2" variant="outline-info">Student Approval</Button><br/>
    <Button style={buttonStyle} className="ms-2 mb-2" variant="outline-info">Teacher Approval</Button><br/>
    <Button style={buttonStyle} className="ms-2 mb-2" variant="outline-info">View exam result</Button>
</div>

               
              
               
            </div>
        </div>
    );
}

export default Admin;
