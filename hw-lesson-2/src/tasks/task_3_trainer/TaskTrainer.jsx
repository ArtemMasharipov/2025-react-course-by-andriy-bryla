import { useEffect, useRef, useState } from 'react';
import Button from '../../shared/components/Button.jsx';
import Input from '../../shared/components/Input.jsx';
import TaskDescription from '../../shared/components/TaskDescription.jsx';
import TaskLayout from '../../shared/components/layouts/TaskLayout.jsx';
import { THEME } from '../../shared/constants/index.js';

import {
  STATES,
  TIMING,
  WORD_PAIRS,
} from './constants.js';
import {
  getBackgroundClass,
  getFeedbackClassName,
  getFeedbackIcon,
  getFeedbackMessage,
  getInputClass,
} from './utils.js';

const TaskTrainer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [state, setState] = useState(STATES.TRAINING);
  const [completedWords, setCompletedWords] = useState([]);
  const inputRef = useRef(null);

  const currentWord = WORD_PAIRS[currentIndex];
  const isCompleted = state === STATES.COMPLETED;

  useEffect(() => {
    if (state === STATES.TRAINING && inputRef.current) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, TIMING.FOCUS_DELAY);
    }
  }, [state]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const checkAnswer = () => {
    const isCorrect =
      userInput.toLowerCase().trim() === currentWord.english.toLowerCase();

    if (isCorrect) {
      setState(STATES.CORRECT);
      setCompletedWords(prev => [...prev, currentWord]);

      setTimeout(() => {
        const nextIndex = currentIndex + 1;
        if (nextIndex >= WORD_PAIRS.length) {
          setState(STATES.COMPLETED);
          setUserInput('');
        } else {
          setCurrentIndex(nextIndex);
          setUserInput('');
          setState(STATES.TRAINING);
        }
      }, TIMING.FEEDBACK_DURATION);
    } else {
      setState(STATES.INCORRECT);
      setUserInput('');
      setTimeout(() => {
        setState(STATES.TRAINING);
      }, TIMING.FEEDBACK_DURATION);
    }
  };

  const handleInputChange = e => {
    setUserInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (userInput.trim() && !isCompleted) {
      checkAnswer();
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setUserInput('');
    setState(STATES.TRAINING);
    setCompletedWords([]);
  };

  return (    <div className={`min-h-screen ${getBackgroundClass(state)}`}>
      <TaskLayout>
        <TaskDescription taskId={3} />

        {!isCompleted ? (
          <div className={THEME.card}>
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">{currentWord?.emoji}</div>

              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {currentWord?.translation}
              </h2>
              <p className="text-gray-600">
                Введіть переклад англійською мовою
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={handleInputChange}
                placeholder="Введіть переклад..."
                className={`text-center text-xl ${getInputClass(state)}`}
                autoComplete="off"
              />

              <div className="flex gap-4">
                <Button
                  type="submit"
                  variant="primary"
                  className="flex-1"
                  disabled={!userInput.trim()}
                >
                  Перевірити
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                >
                  🔄 Спочатку
                </Button>
              </div>
            </form>

            {(state === STATES.CORRECT || state === STATES.INCORRECT) && (
              <div className={getFeedbackClassName(state)}>
                <div className="text-2xl mb-2">
                  {getFeedbackIcon(state)}
                </div>
                <p className="font-semibold text-lg">
                  {getFeedbackMessage(state)}
                </p>
                {state === STATES.INCORRECT && (
                  <p className="mt-2">
                    Правильна відповідь: <strong>{currentWord?.english}</strong>
                  </p>
                )}
              </div>
            )}

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Прогрес: {completedWords.length} / {WORD_PAIRS.length}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${(completedWords.length / WORD_PAIRS.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className={THEME.card}>
            <div className="text-center">
              <div className="text-6xl mb-4">🏆</div>
              <h2 className="text-3xl font-bold text-purple-800 mb-4">
                Вітаємо! Тренування завершено!
              </h2>
              <p className="text-gray-600 mb-6">
                Ви успішно завершили всі {WORD_PAIRS.length} слів
              </p>
              <Button
                variant="primary"
                onClick={handleReset}
                className="px-8 py-3"
              >
                🔄 Почати знову
              </Button>
            </div>
          </div>
        )}
      </TaskLayout>
    </div>
  );
};

export default TaskTrainer;
