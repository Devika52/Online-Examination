import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';



function Registration() {
  return (
    <div className="background-image">
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="border p-4 registration-form">
          <h1 className="text-center mb-4">Teacher's Registration</h1>
          <Form>
            <Form.Group as={Col} controlId="formGridName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="name" placeholder="Enter your name" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control type="address" placeholder="address" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridGender">
              <Form.Label>Gender</Form.Label>
              <Form.Control type="gender" placeholder="gender" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="phone number" placeholder="Enter your phone number" />
            </Form.Group>

            <div className="d-grid">
              <div className="Button-row">
                <Button variant="outline-success">Submit</Button>{' '}
                <Button variant="outline-success">Reset</Button>{' '}
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Registration;