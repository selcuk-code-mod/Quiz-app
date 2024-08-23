/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import "./QuizApp.css";

interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

const QuizApp = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const decodeEntities = (html: string) => {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = html;
    return textarea.value;
  };

  const handleClick = (answer: string) => {
    if (answer === questions[currentQuestion].correct_answer) {
      setScore(score + 1);
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
    }
  };

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(
          "https://opentdb.com/api.php?amount=10&category=18&type=multiple"
        );

        const data = await response.json();
        const formattedQuestion: Question[] = data.results.map(
          (question: any) => ({
            ...question,
            question: decodeEntities(question.question),
            incorrect_answers: question.incorrect_answers.map(decodeEntities),
            correct_answers: decodeEntities(question.correct_answers),
          })
        );
        setQuestions(formattedQuestion);
      } catch (error) {
        console.error("error", error);
      }
    };
    fetchQuiz();
  }, []);
  return (
    <>
      <div className="flex justify-center items-center mt-5">
        <h1 className="text-white text-3xl font-bold border border-2 border-white rounded-full p-4 shadow-white-950">
          Quiz
        </h1>
      </div>
      <div className="h-screen w-screen bg-cover items-center bg-center flex  pb-6 justify-center">
        <div className="flex justify-center  border border-3 border-stone-100 p-6 bg-stone-200 shadow-stone-700 rounded-lg w-2/3 h-2/3">
          {questions.length > 0 ? (
            showScore ? (
              <div className="grid grid-rows-2 gap-4">
                <h2 className="border border-2 bg-stone-400 flex justify-center text-center font-bold cursor-pointer items-center rounded-full p-4">
                  Your score: <br />
                  {score}/{questions.length}
                </h2>
                <button
                  className="border border-2 bg-blue-500 hover:bg-blue-300 flex justify-center text-center font-bold cursor-pointer items-center rounded-lg p-8 p-4"
                  onClick={() => window.location.reload()}
                >
                  Restart Quiz
                </button>
              </div>
            ) : (
              <div className="grid grid-rows-3 gap-4 w-2/3 h-2/3">
                <h2 className="font-bold text-lg text-stone-500 text-center">
                  Question
                  <span className="pl-2">
                    {currentQuestion + 1}/{questions.length}
                  </span>
                </h2>
                <p className="text-center font-semibold border border-2 bg-purple-500 flex  p-3 rounded-lg justify-center items-center">
                  {questions[currentQuestion].question}
                </p>
                <div className="lg:grid lg:grid-cols-2 lg:gap-8 xs:grid xs:grid-cols-1 xs:gap-2">
                  {questions[currentQuestion].incorrect_answers.map(
                    (option, index) => (
                      <button
                        className="text-center font-semibold border border-2 bg-blue-400 hover:bg-blue-200 flex p-1  rounded-md justify-center items-center"
                        key={index}
                        onClick={() => handleClick(option)}
                      >
                        {option}
                      </button>
                    )
                  )}
                  <button
                    className="text-center font-semibold border border-2 bg-blue-400 hover:bg-blue-200 flex p-1 rounded-lg justify-center items-center"
                    onClick={() =>
                      handleClick(questions[currentQuestion].correct_answer)
                    }
                  >
                    {questions[currentQuestion].correct_answer}
                  </button>
                </div>
              </div>
            )
          ) : (
            <p className="flex justify-center items-center text-center text-stone-600 font-semibold text-xl">
              Loading...
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default QuizApp;
