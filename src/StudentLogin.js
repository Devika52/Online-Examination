import React from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Registration.css';
function StudentLogin() {
  return (
    <div className="background-image">

    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="border p-4">
        <h1 className="text-center mb-4">Student Login</h1>
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="4">
              Username
            </Form.Label>
            <Col sm="8">
              <Form.Control type ="username" placeholder="username" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
            <Form.Label column sm="4">
              Password
            </Form.Label>
            <Col sm="8">
              <Form.Control type="password" placeholder="Password" />
            </Col>
          </Form.Group>

          <div className="d-grid">
          <button type="submit" className="btn btn-primary">Submit</button>
          </div>

        </Form>
      </div>
    </div>
    </div>
  );
}

export default StudentLogin;