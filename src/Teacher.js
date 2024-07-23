
import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';



function Teacher() {
    const backgroundImageUrl = 'https://img.freepik.com/free-photo/2d-graphic-colorful-wallpaper-with-grainy-gradients_23-2151001571.jpg?t=st=1720328601~exp=1720332201~hmac=3f6029e17fbdc4be63e68c9e2ee7675a222d7e156aafc71538dccb540ac0d561&w=900';
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
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // White background with alpha 0.3 for transparency
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
                <h1 style={{ color: '#fff' }}>Teacher</h1>
                
                <div>
    
    <Link to="/update-student"><Button style={buttonStyle} className="ms-2 mb-2" variant="outline-info">Update Student</Button><br/></Link>
    <Link to="/delete-student"><Button style={buttonStyle} className="ms-2 mb-2" variant="outline-info">Delete student</Button><br/></Link>
    <Link to="/student-list"><Button style={buttonStyle} className="ms-2 mb-2" variant="outline-info">View Student list</Button><br/></Link>
    <Button style={buttonStyle} className="ms-2 mb-2" variant="outline-info">Approval</Button><br/>
    <Link to="/exam-results"><Button style={buttonStyle} className="ms-2 mb-2" variant="outline-info">View exam result</Button></Link>
</div>

               
              
               
            </div>
        </div>
    );
}

export default Teacher;
