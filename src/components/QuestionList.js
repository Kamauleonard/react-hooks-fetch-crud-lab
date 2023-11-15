import React,{useState, useEffect} from "react";
import QuestionItem from "./QuestionItem"
function QuestionList() {
  const [questions, setQuestion] = useState([])

  useEffect(()=>{
    fetch("http://localhost:4000/questions")
    .then((res) => res.json())
    .then(data => setQuestion(data))
    .catch(error => console.error(error) )
  }, [])

  function handleDeleteItem(deletedItem) {
    console.log("Deleted item:", deletedItem);
    const updatedItems = questions.filter((question) => question.id !== deletedItem.id);
    setQuestion(updatedItems);
  } 
  function handleUpdateItem(data) {
    console.log("Updating item with ID:", data.id);
    const updatedItems = questions.map((question) =>
      question.id === data.id ? data : question
    );
    console.log("Updated items:", updatedItems);
    setQuestion(updatedItems);
  }

  
  
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
  {questions.map((question) => (
    <QuestionItem key={question.id} question={question} onDeleteItem={handleDeleteItem} onUpdateItem={handleUpdateItem} />
  ))}
</ul>

    </section>
  );
}

export default QuestionList;
