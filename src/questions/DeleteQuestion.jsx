import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const DeleteQuestion = () => {
  const [subject, setSubject] = useState(''); // To store selected subject
  const [questions, setQuestions] = useState([]); // To store fetched questions
  const [message, setMessage] = useState(''); // To show success or error message
    const navigate=useNavigate();
  // Function to handle subject change and fetch questions
  const handleSubjectChange = async (e) => {
    const selectedSubject = e.target.value;
    setSubject(selectedSubject);
    setMessage(''); // Reset message when changing subject

    if (selectedSubject !== '') {
      try {
        const response = await axios.get(`http://localhost:8081/questions/${selectedSubject}`);
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setQuestions([]);
      }
    } else {
      setQuestions([]); // Clear questions when no subject is selected
    }
  };

  // Function to handle question deletion
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8081/questions/${subject}/${id}`);
      setMessage(response.data.message); // Show message after deletion
      // Remove the deleted question from the list
      setQuestions(questions.filter(question => question.id !== id));
    } catch (error) {
      console.error('Error deleting question:', error);
      setMessage('Error deleting question');
    }
  };
  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };
  return (
    <div className="container">
      <div className="d-flex justify-content-center mb-4">
        
          <Button variant="secondary" onClick={handleBack}>Back</Button>
       
      </div>

      <h2 className="text-center mb-4">Delete Questions</h2>

      {/* Subject Selection Dropdown */}
      <Form.Group controlId="subjectSelect">
        <Form.Label>Select Subject</Form.Label>
        <Form.Control as="select" value={subject} onChange={handleSubjectChange}>
          <option value="">Choose Subject</option>
          <option value="Networks">Networks</option>
          <option value="Operating_Systems">Operating Systems</option>
          <option value="Data_Structures">Data Structures</option>
        </Form.Control>
      </Form.Group>

      {/* Display Questions */}
      {subject === '' ? (
        <p>Please select a subject to view the questions.</p>
      ) : questions.length > 0 ? (
        <div className="mt-4">
          <h4>Questions from {subject.replace('_', ' ')}</h4>
          <ul className="list-group">
            {questions.map((question) => (
              <li key={question.id} className="list-group-item d-flex justify-content-between align-items-center">
                {question.question}
                <Button
                  variant="danger"
                  onClick={() => handleDelete(question.id)}
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No questions available for this subject.</p>
      )}

      {/* Message for successful or error operations */}
      {message && (
        <div className="alert alert-info mt-4" role="alert">
          {message}
        </div>
      )}
    </div>
  );
};

export default DeleteQuestion;
