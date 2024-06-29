import React, { useState } from 'react';
import question from './question'; // Assuming question is imported correctly
import './Appp.css'; // Import CSS file for styling
import Timer from './Timer';
function Appp() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption === question[currentQuestion].answer) {
      setScore(score + 1);
    }
    setSelectedOption('');
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < question.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="appp-container">
      {showScore ? (
        <div>
          <h2>Your Score: {score}</h2>
        </div>
      ) : (
        <div>
            <Timer/>
          <h2>Question {currentQuestion + 1}</h2>
          <h3>{question[currentQuestion].question}</h3>
          <ul className="options-list">
            {question[currentQuestion].options.map((option, index) => (
              <li key={index}>
                <label>
                  <input
                    type="radio"
                    name="option"
                    value={option}
                    checked={selectedOption === option}
                    onChange={() => handleOptionSelect(option)}
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>
          <button onClick={handleNextQuestion}>Next</button>
        </div>
      )}
    </div>
  );
}

export default Appp;
