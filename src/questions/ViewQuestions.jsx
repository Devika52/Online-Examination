import React from 'react'
import { useState,useEffect } from 'react'
import { Form } from 'react-bootstrap'
import axios from 'axios'

const ViewQuestions = () => {
    const fetch_api_url = 'http://localhost:8081/questions/view';
    const [questions,setQuestions] = useState([]);
    useEffect(()=>{
        // axios.get(fetch_api_url).then(response => {
        //     if (!response) {
        //       throw new Error('Network response was not ok');
        //     }
        //     return (response.data);
        //   }).then((data) => {
        //     if (typeof data != {}) {
        //         setQuestions(data)
        //     }
        //   })
    },[fetch_api_url])

    const handleSubmit = (e)=>{
        e.preventDefault()
        
    }
  return (
    <form name='exam' id='exam' onSubmit={handleSubmit}>
    <div className="container">
        <div className="questions">
            <div className="question">
                <h3>Test Question</h3>
                <div className="options-container">
                    <label htmlFor="option_1">Test 1</label>
                    <input type="radio" name='option_1' value='test 1' />
                </div>
                <div className="options-container">
                    <label htmlFor="option_1">Test 1</label>
                    <input type="radio" name='option_1' value='test 1' />
                </div>
            </div>
        </div>
    </div>
    </form>
//   {questions.map((question,index)=>{

//   })}
  )
}

export default ViewQuestions