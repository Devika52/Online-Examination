import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const ViewFeedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get('http://localhost:8081/feedback');
                if (response.data.success) {
                    setFeedbacks(response.data.feedbacks);
                } else {
                    console.error('Error fetching feedback:', response.data.error);
                }
            } catch (error) {
                console.error('Error fetching feedback:', error);
            }
        };

        fetchFeedbacks();
    }, []);

    const handleBack = () => {
        navigate(-1); // Navigate back to the previous page
    };

    return (
        <Container className="my-5">
            <Row className="justify-content-center mb-4">
                <Col xs="auto">
                    <Button variant="secondary" onClick={handleBack}>
                        Back
                    </Button>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xs={12}>
                    <h3 className="text-center">Feedbacks</h3>
                    <Table striped bordered hover className="mt-4">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Feedback</th>
                            </tr>
                        </thead>
                        <tbody>
                            {feedbacks.length > 0 ? (
                                feedbacks.map((feedback) => (
                                    <tr key={feedback.id}>
                                        <td>{feedback.id}</td>
                                        <td>{feedback.email}</td>
                                        <td>{feedback.ph_no}</td>
                                        <td>{feedback.feedback}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center">
                                        No feedback available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default ViewFeedback;
