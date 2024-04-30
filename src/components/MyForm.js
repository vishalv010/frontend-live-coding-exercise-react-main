import { useState, useEffect } from 'react';
import { QUESTIONS } from "../questions";
import { calculateAverageScore, calculateScore } from "../utility";
const STORAGE_KEY = 'scores';

export const MyForm = () => {
  const [myScore, setMyScore] = useState();
  const [avgScore, setAvgScore] = useState();
  const [scores, setScores] = useState();
  useEffect(() => {
    const storedScores = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const avg = calculateAverageScore(storedScores);
    setAvgScore(avg);
    setScores(storedScores);
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    const score = calculateScore(data);
    setMyScore(score);
    if(score) {
        const newScores = [...scores];
        newScores.push(score);
        setScores(newScores);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newScores));
        const avg = calculateAverageScore(newScores);
        setAvgScore(avg);
    }
    //to reset the form values to initial values
    event.target.reset();
  }
  return (
    <>
    {avgScore && <h1>{`Average Score: ${avgScore}`}</h1>}
    <form onSubmit={handleSubmit}>
      {Object.entries(QUESTIONS).map(([quesNum, question]) => {
        return (
          <div className="control" key={quesNum}>
            <label htmlFor={`question-${quesNum}`}>{question}</label>
            <select name={`question-${quesNum}`}>
              <option value="">Select</option>
              <option value={1}>Yes</option>
              <option value={0}>No</option>
            </select>
          </div>
        );
      })}
      <button type='submit'>Submit</button>
      {myScore ? <p>Your Score is {myScore}</p> : <p>Please select values from dropdown to get your score!!</p>}
    </form>
    </>
  );
};
