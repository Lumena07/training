import { useState } from 'react';
import { useTrainingStore } from '../../../store/trainingStore';
import { ArrowRight, CheckCircle2, RotateCw } from 'lucide-react';

interface InteractiveModuleProps {
  
}

interface Scenario {
  id: string;
  situation: string;
  options: string[];
  correctOption: number;
  feedback: string[];
}

const mockScenarios: Scenario[] = [
  {
    id: '1',
    situation: 'During taxi, you notice unusual vibration from the nose gear. What is your immediate action?',
    options: [
      'Continue taxi and check after parking',
      'Stop immediately and request maintenance inspection',
      'Increase taxi speed to check if vibration persists',
      'Ignore if vibration is intermittent'
    ],
    correctOption: 1,
    feedback: [
      'Safety critical issue requires immediate attention',
      'Correct! Stopping for inspection is the safest course of action',
      'Increasing speed could worsen potential mechanical issues',
      'Intermittent issues should still be investigated immediately'
    ]
  }
];

export function InteractiveModule({}: InteractiveModuleProps) {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const updateModuleProgress = useTrainingStore((state) => state.updateModuleProgress);

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    setShowFeedback(true);
    setAttempts(attempts + 1);

    // Update progress based on correct answers
    const progress = Math.round(
      ((currentScenario + (optionIndex === mockScenarios[currentScenario].correctOption ? 1 : 0)) /
        mockScenarios.length) *
        100
    );
    updateModuleProgress('3', progress); // Replace with actual module ID
  };

  const handleNext = () => {
    if (currentScenario < mockScenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    }
  };

  const handleRetry = () => {
    setSelectedOption(null);
    setShowFeedback(false);
  };

  const scenario = mockScenarios[currentScenario];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium mb-4">Scenario {currentScenario + 1}</h3>
        <p className="text-gray-700 mb-6">{scenario.situation}</p>

        <div className="space-y-3">
          {scenario.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showFeedback && handleOptionSelect(index)}
              disabled={showFeedback}
              className={`w-full text-left p-4 rounded-lg border transition-colors ${
                showFeedback
                  ? index === scenario.correctOption
                    ? 'border-green-500 bg-green-50'
                    : selectedOption === index
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200'
                  : selectedOption === index
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {option}
              {showFeedback && index === scenario.correctOption && (
                <CheckCircle2 className="inline-block ml-2 h-5 w-5 text-green-500" />
              )}
            </button>
          ))}
        </div>

        {showFeedback && (
          <div className="mt-6">
            <p className={`text-sm ${
              selectedOption === scenario.correctOption ? 'text-green-600' : 'text-red-600'
            }`}>
              {scenario.feedback[selectedOption ?? 0]}
            </p>
            
            <div className="mt-4 flex justify-end space-x-4">
              {selectedOption !== scenario.correctOption && (
                <button
                  onClick={handleRetry}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <RotateCw className="h-4 w-4 mr-2" />
                  Try Again
                </button>
              )}
              {(selectedOption === scenario.correctOption || attempts >= 2) && (
                <button
                  onClick={handleNext}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Next Scenario
                  <ArrowRight className="h-4 w-4 ml-2" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>Scenario {currentScenario + 1} of {mockScenarios.length}</span>
        <span>Attempts: {attempts}</span>
      </div>
    </div>
  );
}