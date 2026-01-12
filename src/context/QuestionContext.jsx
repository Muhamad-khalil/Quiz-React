import { createContext, useContext, useEffect, useReducer } from "react";
import { initialState, reducer } from "../Reducer/questionReducer";

const QuestionContext = createContext();

function QuestionProvider({ children }) {
  const [
    { questions, status, index, answer, points, highscore, secondRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0);

  useEffect(() => {
    fetch("https://6965352fe8ce952ce1f483ab.mockapi.io/questions")
      .then((res) => res.json())
      .then((data) =>
        dispatch({
          type: "dataReceived",
          payload: data,
        })
      )
      .catch((err) =>
        dispatch({
          type: "dataFailed",
        })
      );
  }, []);

  return (
    <QuestionContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondRemaining,
        numQuestions,
        maxPoints,
        dispatch,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuestionContext);
  if (!context)
    throw new Error("useQuiz must be used within a QuestionProvider");
  return context;
}

export { QuestionProvider, useQuiz };
