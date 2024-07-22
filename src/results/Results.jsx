import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { getUser } from '../hooks/useAuth';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

const Results = () => {
    const [marks, setMarks] = useState(null);
    const [grade, setGrade] = useState(null);
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
        </Container>
    );
};

export default Results;
