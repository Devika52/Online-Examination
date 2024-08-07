import React from 'react'
import { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Countdown from 'react-countdown';
import { getUser } from '../hooks/useAuth';
import { useNavigate,Link } from 'react-router-dom';

const ViewQuestions = () => {
    const fetch_api_url = 'http://localhost:8081/questions/get';
    const form_submit_url = 'http://localhost:8081/questions/submit_answers';
    const navigate = useNavigate()
    const current_user = getUser()
    const [questions, setQuestions] = useState([]);
    const [timeOut,setTimeOut] = useState(false)
    useEffect(() => {
        axios.get(fetch_api_url).then(response => {
            if (!response) {
                throw new Error('Network response was not ok');
            }
            return (response.data);
        }).then((data) => {
            if (typeof data != {}) {
                setQuestions(data.results)
            }
        })
        
    }, [fetch_api_url])

    const Completionist = () => {<span>Time's Up !!!</span>
        {setTimeout(setTimeOut(true),1000)}
    }
;
    const handleComplete = ()=>{
        setTimeOut(true)
    }
    const handleBack = () => {
        navigate(-1); // Navigate back to the previous page
      };
    const handleSubmit = (e) => {
        e.preventDefault()
        let formData = new FormData(e.target);
        formData = Object.fromEntries(formData.entries())
        console.log(formData);
        const payload = {
            user_id : current_user.id,
            formData : formData
        }
        console.log("current user",current_user.name)
        axios.post(form_submit_url ,payload).then(response => {
            if(response.data.success){
                console.log(response.data);
                navigate('/admin/results')
                
            }
        })
    }
    return (
        <div className="container">
             <div className="d-flex justify-content-center mb-4">
        <button className="btn btn-secondary back-button" onClick={handleBack}>Back</button>
      </div>
           {!timeOut && <h3> Time Remaining: {<Countdown date={Date.now() + 60000} onComplete={handleComplete}>
            </Countdown>}
            </h3>}
            {timeOut && <h3 style={{color:'red'}}>Time's Up</h3>}
            <br/>
            <Form onSubmit={handleSubmit}>
                {questions.length > 0 && questions.map((question, index) => {
                    return (
                        <>
                            <Form.Group key={index} className="mb-3">
                                <Form.Label>{(index + 1) + '. ' + question.question}</Form.Label>
                                <Form.Check type='radio' name={question.id} value={question.option_1} label={question.option_1} />
                                <Form.Check type='radio' name={question.id} value={question.option_2} label={question.option_2} />
                                <Form.Check type='radio' name={question.id} value={question.option_3} label={question.option_3} />
                                <Form.Check type='radio' name={question.id} value={question.option_4} label={question.option_4} />
                            </Form.Group>
                            <br />
                        </>
                    )
                })}
                <Button type="submit" disabled={timeOut}>Submit form</Button>
            </Form>
        </div>
        //   {questions.map((question,index)=>{

        //   })}
    )
}

export default ViewQuestions