import { useQuiz } from "../context/QuestionContext";
import Options from "./Option";

function Question() {
  const { questions, index, dispatch, answer } = useQuiz();

  const question = questions[index];

  if (!question) return <p>Loading question...</p>;

  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;
