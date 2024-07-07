import React from 'react';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation

const AddQuestion = () => {
  const post_api_url = 'http://localhost:8081/questions/add';
  const [formData, setFormData] = useState({
    question: '',
    option_1: '',
    option_2: '',
    option_3: '',
    option_4: '',
    answer: ''
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(post_api_url, formData)
      .then(response => {
        if (response.data.success) {
          setSuccess(true);
          setFormData({
            question: '',
            option_1: '',
            option_2: '',
            option_3: '',
            option_4: '',
            answer: ''
          });
        }
      })
      .catch(error => {
        console.error('Error adding question:', error);
      });
  };

  return (
    <div className='container'>
      <div className="d-flex justify-content-center mb-4">
      <Link to="/admin" className="btn btn-secondary mt-3">Back</Link> {/* Back button */}
      </div>
      <h3 className="text-center mb-4">Add Question</h3>
      {success && <h4 style={{ color: 'darkgreen' }}>Question Added Successfully</h4>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Question</Form.Label>
          <Form.Control type="text" placeholder="Enter Your Question" value={formData.question} name='question' onChange={handleChange} />
          <Form.Label>Option 1</Form.Label>
          <Form.Control type="text" name='option_1' value={formData.option_1} onChange={handleChange} />
          <Form.Label>Option 2</Form.Label>
          <Form.Control type="text" name='option_2' value={formData.option_2} onChange={handleChange} />
          <Form.Label>Option 3</Form.Label>
          <Form.Control type="text" name='option_3' value={formData.option_3} onChange={handleChange} />
          <Form.Label>Option 4</Form.Label>
          <Form.Control type="text" name='option_4' value={formData.option_4} onChange={handleChange} />
          <Form.Label>Answer</Form.Label>
          <Form.Control type="text" name='answer' value={formData.answer} onChange={handleChange} />
          <button style={{ marginTop: '1rem', backgroundColor: 'darkgreen', color: 'white' }} type="submit" className="btn btn-primary">Submit</button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default AddQuestion;
