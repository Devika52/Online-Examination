import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../hooks/useAuth';
import { Button, Container, Row, Col, Form, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Results = () => {
    const [marks, setMarks] = useState(null);
    const [grade, setGrade] = useState(null);
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        feedback: '',
    });
    const current_user = getUser();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMarks = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/results/${current_user.id}`);
                if (response.data.success) {
                    setMarks(response.data.marks);
                    setGrade(response.data.grade);
                    console.log(response.data);
                } else {
                    console.error('Error fetching marks:', response.data.error);
                }
            } catch (error) {
                console.error('Error fetching marks:', error);
            }
        };

        fetchMarks();
    }, [current_user.id]);

    const handleBack = () => {
        navigate(-1); // Navigate back to the previous page
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8081/api/feedback', {
                id: current_user.id, // Send the corresponding user ID
                email: formData.email,
                phone: formData.phone,
                feedback: formData.feedback,
            });

            if (response.data.success) {
                alert('Feedback submitted successfully'); // Display success alert
                navigate('/'); // Navigate to the home page
            } else {
                console.log('Failed to submit feedback');
            }
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
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
            <Row className="justify-content-center text-center">
                <Col xs={12}>
                    <h3>Results</h3>
                </Col>
                <Col xs={12} className="mt-4">
                    {marks !== null ? (
                        <>
                            <h3>Your Marks: {marks}</h3>
                            <h3>Your Grade: {grade}</h3>
                        </>
                    ) : (
                        <p>Loading...</p>
                    )}
                </Col>
            </Row>
            <Row className="justify-content-center mt-5">
                <Col xs={12} md={16}>
                    <Card className="p-4 shadow-sm">
                        <Card.Body>
                            <h4 className="text-center">Submit Your Feedback</h4>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formPhone">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        name="phone"
                                        placeholder="Enter your phone number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formFeedback">
                                    <Form.Label>Feedback</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name="feedback"
                                        rows={3}
                                        placeholder="Enter your feedback"
                                        value={formData.feedback}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100">
                                    Submit Feedback
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Results;
