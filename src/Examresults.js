import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

const ViewExamResults = () => {
    const [results, setResults] = useState([]);
    const [subject, setSubject] = useState(''); // Subject selection state
    const navigate = useNavigate();

    useEffect(() => {
        if (subject) {
            const fetchResults = async () => {
                try {
                    const response = await axios.get(`http://localhost:8081/exam-results?subject=${subject}`);
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
        }
    }, [subject]);

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
                <Col xs="auto" className="mb-4">
                    <Form.Select onChange={(e) => setSubject(e.target.value)} value={subject}>
                        <option value="">Choose Subject</option>
                        <option value="data_structure">Data Structure</option>
                        <option value="operating_system">Operating System</option>
                        <option value="networks">Networks</option>
                    </Form.Select>
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
                                    <td colSpan="5" className="text-center">No results found</td>
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
