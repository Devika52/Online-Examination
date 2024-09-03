import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

const ViewExamResults = () => {
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get('http://localhost:8081/exam-results');
                if (response.data.success) {
                    setResults(response.data.results);
                } else {
                    console.error('Error fetching results:', response.data.error);
                }
            } catch (error) {
                console.error('Error fetching results:', error);
            }
        };

        fetchResults();
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
            <Row>
                <Col>
                    <h3 className="text-center">Exam Results</h3>
                    <Table striped bordered hover className="mt-4">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Student Name</th>
                                <th>Student Email</th>
                                <th>Grade</th>
                                <th>Marks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.length > 0 ? (
                                results.map((result, index) => (
                                    <tr key={result.id}>
                                        <td>{index + 1}</td>
                                        <td>{result.student_name}</td>
                                        <td>{result.student_email}</td>
                                        <td>{result.grade}</td>
                                        <td>{result.marks}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center">No results found</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default ViewExamResults;
