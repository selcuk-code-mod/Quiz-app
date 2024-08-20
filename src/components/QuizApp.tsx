/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";

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
          "https://opentdb.com/api.php?amount=10&category=18"
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
      <div>
        <div>
          <h1>Quiz App</h1>
          {questions.length > 0 ? (
            showScore ? (
              <div>
                <h2>
                  Your score:{score}/{questions.length}
                </h2>
                <button onClick={() => window.location.reload()}>
                  Restart Quiz
                </button>
              </div>
            ) : (
              <div>
                <h2>
                  Question{currentQuestion + 1}/{questions.length}
                </h2>
                <p>{questions[currentQuestion].question}</p>
                <div>
                  {questions[currentQuestion].incorrect_answers.map(
                    (option, index) => (
                      <button key={index} onClick={() => handleClick(option)}>
                        {option}
                      </button>
                    )
                  )}
                  <button
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
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default QuizApp;
