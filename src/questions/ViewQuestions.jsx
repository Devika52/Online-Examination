import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import Countdown from 'react-countdown';
import { getUser } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const ViewQuestions = () => {
  const fetch_api_url = 'http://localhost:8081/questions/get';
  const form_submit_url = 'http://localhost:8081/questions/submit_answers';
  const user_status_url = 'http://localhost:8081/users/status'; // Endpoint to check user status
  const navigate = useNavigate();
  const current_user = getUser();
  const [questions, setQuestions] = useState([]);
  const [showQuestions, setShowQuestions] = useState(false);
  const [timeOut, setTimeOut] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const response = await axios.get(user_status_url, {
          params: { user_id: current_user.id },
        });
        if (response.data.status === 'pending') {
          setStatusMessage('You have to be approved by the admin');
        } else {
          // No need to fetch questions until the "Start Exam" button is clicked
        }
      } catch (error) {
        console.error('Error fetching user status:', error);
      }
    };

    checkUserStatus();
  }, [user_status_url, current_user.id]);

  const startExam = async () => {
    try {
      const response = await axios.get(fetch_api_url);
      if (!response) throw new Error('Network response was not ok');
      const data = response.data;
      if (typeof data === 'object') {
        setQuestions(data.results);
        setShowQuestions(true);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const Completionist = () => <span>Time's Up !!!</span>;

  const handleComplete = () => {
    setTimeOut(true);
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    formData = Object.fromEntries(formData.entries());
    const payload = {
      user_id: current_user.id,
      formData: formData,
    };
    axios.post(form_submit_url, payload).then((response) => {
      if (response.data.success) {
        navigate('/admin/results');
      }
    });
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center mb-4">
        <Button className="btn btn-secondary back-button" onClick={handleBack}>
          Back
        </Button>
      </div>
      {statusMessage ? (
        <Alert variant="danger">{statusMessage}</Alert>
      ) : (
        <>
          {!showQuestions ? (
            <div className="text-center">
              <h3>Start the Exam</h3>
              <Button variant="primary" onClick={startExam} className="mt-3">
                Start Now
              </Button>
            </div>
          ) : (
            <>
              {!timeOut && (
                <h3>
                  Time Remaining:{' '}
                  <Countdown date={Date.now() + 60000} onComplete={handleComplete} />
                </h3>
              )}
              {timeOut && <h3 style={{ color: 'red' }}>Time's Up</h3>}
              <br />
              <Form onSubmit={handleSubmit}>
                {questions.length > 0 &&
                  questions.map((question, index) => (
                    <React.Fragment key={index}>
                      <Form.Group className="mb-3">
                        <Form.Label>{`${index + 1}. ${question.question}`}</Form.Label>
                        <Form.Check type="radio" name={question.id} value={question.option_1} label={question.option_1} />
                        <Form.Check type="radio" name={question.id} value={question.option_2} label={question.option_2} />
                        <Form.Check type="radio" name={question.id} value={question.option_3} label={question.option_3} />
                        <Form.Check type="radio" name={question.id} value={question.option_4} label={question.option_4} />
                      </Form.Group>
                      <br />
                    </React.Fragment>
                  ))}
                <Button type="submit" disabled={timeOut}>
                  Submit form
                </Button>
              </Form>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ViewQuestions;
