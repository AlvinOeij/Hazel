import React, { useState } from 'react';
import styled from 'styled-components';

interface LoveQuizProps {
  onBack: () => void;
}

interface Question {
  id: number;
  text: string;
  options: string[];
  answer: number;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  padding: 15px;
  overflow-y: auto;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #9c27b0;
  margin-bottom: 15px;
  font-weight: 600;
`;

const QuestionText = styled.p`
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 15px;
  text-align: center;
`;

const OptionButton = styled.button<{ selected: boolean }>`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 2px solid ${(props) => (props.selected ? '#9c27b0' : '#e1bee7')};
  border-radius: 8px;
  background-color: ${(props) => (props.selected ? '#e1bee7' : 'white')};
  color: #333;
  text-align: left;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${(props) => (props.selected ? '#e1bee7' : '#f3e5f5')};
  }
`;

const NextButton = styled.button`
  padding: 8px 16px;
  background-color: #9c27b0;
  color: white;
  border: none;
  border-radius: 20px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 10px;
  
  &:hover {
    background-color: #7b1fa2;
  }
`;

const BackButton = styled.button`
  padding: 8px 16px;
  background-color: #9c27b0;
  color: white;
  border: none;
  border-radius: 20px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 10px;
  
  &:hover {
    background-color: #7b1fa2;
  }
`;

const Result = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const ResultTitle = styled.h3`
  font-size: 1.3rem;
  color: #9c27b0;
  margin-bottom: 10px;
`;

const ResultMessage = styled.p`
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 15px;
`;

const HeartIcon = styled.span`
  color: #e91e63;
  font-size: 2rem;
  margin: 10px 0;
  display: block;
`;

// Questions for the love quiz
const questions: Question[] = [
  {
    id: 1,
    text: "When did we officially become a couple?",
    options: ["April 29", "May 6", "May 10", "April 25"],
    answer: 1  // May 6
  },
  {
    id: 2,
    text: "When did we meet for the first time?",
    options: ["April 14", "April 10", "April 18", "April 12"],
    answer: 0  // April 14
  },
  {
    id: 3,
    text: "When did I confess my feelings to you?",
    options: ["April 18", "April 25", "April 20", "April 15"],
    answer: 2  // April 20
  },
  {
    id: 4,
    text: "When did you confess your feelings to me?",
    options: ["April 22", "April 21", "April 25", "April 23"],
    answer: 3  // April 23
  },
  {
    id: 5,
    text: "When did we set our first couple profile pictures?",
    options: ["April 16", "April 20", "April 15", "April 18"],
    answer: 2  // April 15
  }
];

const LoveQuiz: React.FC<LoveQuizProps> = ({ onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [quizComplete, setQuizComplete] = useState<boolean>(false);
  
  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };
  
  const handleNextQuestion = () => {
    // Check if the selected answer is correct
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    
    // Move to the next question or complete quiz
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      setQuizComplete(true);
    }
  };
  
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setQuizComplete(false);
  };
  
  const getResultMessage = () => {
    const percentage = (score / questions.length) * 100;
    
    if (percentage === 100) {
      return "Wow! You know me perfectly! You're definitely my perfect match! ❤️";
    } else if (percentage >= 80) {
      return "Amazing! You know me so well! We're meant to be together! 💕";
    } else if (percentage >= 60) {
      return "Pretty good! You know quite a bit about me. I'm happy we're together! 😊";
    } else if (percentage >= 40) {
      return "Not bad! We still have more to learn about each other. That's what makes our journey special! 💝";
    } else {
      return "Looks like we have a lot to discover about each other! That's what makes our relationship exciting! 💖";
    }
  };
  
  return (
    <Container>
      <Title>Love Quiz</Title>
      
      {!quizComplete ? (
        <>
          <QuestionText>
            Question {currentQuestion + 1}/{questions.length}: {questions[currentQuestion].text}
          </QuestionText>
          
          {questions[currentQuestion].options.map((option, index) => (
            <OptionButton
              key={index}
              selected={selectedOption === index}
              onClick={() => handleOptionSelect(index)}
            >
              {option}
            </OptionButton>
          ))}
          
          <NextButton
            onClick={handleNextQuestion}
            disabled={selectedOption === null}
            style={{ opacity: selectedOption === null ? 0.6 : 1 }}
          >
            {currentQuestion < questions.length - 1 ? "Next Question" : "Finish Quiz"}
          </NextButton>
        </>
      ) : (
        <Result>
          <ResultTitle>Quiz Complete!</ResultTitle>
          <HeartIcon>❤️</HeartIcon>
          <ResultMessage>
            You scored {score} out of {questions.length}!
          </ResultMessage>
          <ResultMessage>
            {getResultMessage()}
          </ResultMessage>
          <div>
            <BackButton onClick={resetQuiz} style={{ marginRight: 10 }}>
              Play Again
            </BackButton>
            <BackButton onClick={onBack}>
              Back to Menu
            </BackButton>
          </div>
        </Result>
      )}
      
      {!quizComplete && (
        <BackButton onClick={onBack} style={{ marginTop: 15 }}>
          Back to Menu
        </BackButton>
      )}
    </Container>
  );
};

export default LoveQuiz;