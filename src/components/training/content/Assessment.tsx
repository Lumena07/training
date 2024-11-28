import { useState } from 'react';
import { AssessmentQuestion } from '../../../types/training';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

interface AssessmentProps {
  questions: AssessmentQuestion[];
}

export function Assessment({ questions }: AssessmentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
    setAnswers([...answers, isCorrect]);
    if (isCorrect) setScore(score + 1);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResults(true);
    }
  };

  if (showResults) {
    const percentage = (score / questions.length) * 100;
    return (
      <div className="space-y-6 p-6 bg-white rounded-lg">
        <h3 className="text-2xl font-bold text-center">Assessment Complete</h3>
        <div className="text-center">
          <div className="text-6xl font-bold mb-4">{percentage}%</div>
          <p className="text-gray-600">
            You got {score} out of {questions.length} questions correct
          </p>
        </div>
        <div className="space-y-4 mt-8">
          {questions.map((question, index) => (
            <div key={index} className="flex items-start space-x-3">
              {answers[index] ? (
                <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0" />
              ) : (
                <XCircle className="h-6 w-6 text-red-500 flex-shrink-0" />
              )}
              <div>
                <p className="font-medium">{question.question}</p>
                <p className="text-sm text-gray-500">
                  Correct answer: {question.options[question.correctAnswer]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          Question {currentQuestion + 1} of {questions.length}
        </span>
        <span className="text-sm font-medium">Score: {score}</span>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium mb-4">{question.question}</h3>
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className={`w-full text-left p-4 rounded-lg border ${
                selectedAnswer === index
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleNext}
        disabled={selectedAnswer === null}
        className="flex items-center justify-center w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
        <ArrowRight className="ml-2 h-4 w-4" />
      </button>
    </div>
  );
}