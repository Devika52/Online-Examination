import React from 'react'
import { useState } from 'react'
import { Form } from 'react-bootstrap'
import axios from 'axios'

const AddQuestion = () => {
    const post_api_url = 'http://localhost:8081/questions/add'
    const [formData,setFormData] = useState({
        question : '',
        option_1:'',
        option_2:'',
        option_3: '',
        option_4: '',
        answer: ''
    })
    const handleChange = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setFormData(()=>({
            ...formData,
            [name]: value
        }))
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(formData);
        axios.post(post_api_url,formData).then(response => {
            if(response.data.success){
                console.log(response.data);
            }
        })
    }
  return (
    <div className='container'>
        <h3>Add Question</h3>
        <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Question</Form.Label>
        <Form.Control type="text" placeholder="Enter Your Question" value={formData.question} name='question' onChange={handleChange} />
        <Form.Label>Option 1</Form.Label>
        <Form.Control type="text" name='option_1' value={formData.option_1} onChange={handleChange} />
        <Form.Label>Option 2</Form.Label>
        <Form.Control type="text"  name='option_2' value={formData.option_2} onChange={handleChange}/>
        <Form.Label>Option 3</Form.Label>
        <Form.Control type="text" name='option_3' value={formData.option_3} onChange={handleChange} />
        <Form.Label>Option 4</Form.Label>
        <Form.Control type="text"  name='option_4' value={formData.option_4} onChange={handleChange}/>
        <Form.Label>Answer</Form.Label>
        <Form.Control type="text" name='answer' value={formData.answer} onChange={handleChange}/>
        <Form.Control type="submit"/>
      </Form.Group>

    </Form>
    </div>
  )
}

export default AddQuestion