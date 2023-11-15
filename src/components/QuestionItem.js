import React, { useState } from "react";

function QuestionItem({ question, onDeleteItem, onUpdateItem, }) {
  const { id, prompt, answers, correctIndex } = question;

  const BASE_URL = "http://localhost:4000/questions"
  
  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));
  const [correctedIndex, setCorrectIndex] = useState(correctIndex)


  const handleDelete = () => {
    fetch(`${BASE_URL}/${question.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => onDeleteItem(question));
  }
 
  const handleSelectedOption = async () => {
    try {
      await fetch(`${BASE_URL}/${question.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correctIndex: correctedIndex,
        }),
      });
      onUpdateItem({ ...question, correctIndex: correctedIndex });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const selectedIndex = e.target.value;
    setCorrectIndex(selectedIndex);
  };

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select
          value={correctedIndex}
          onChange={handleChange}
          onClick={handleSelectedOption} 
        >
          {options}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}
export default QuestionItem;
