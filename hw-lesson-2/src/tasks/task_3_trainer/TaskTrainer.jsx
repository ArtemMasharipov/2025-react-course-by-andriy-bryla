import Button from '../../shared/components/Button.jsx';
import Input from '../../shared/components/Input.jsx';
import TaskDescription from '../../shared/components/TaskDescription.jsx';
import TaskLayout from '../../shared/components/layouts/TaskLayout.jsx';
import { THEME } from '../../shared/constants/index.js';

import {
    STATES,
    WORD_PAIRS,
    getBackgroundClass,
    getFeedbackClassName,
    getFeedbackIcon,
    getFeedbackMessage,
    getInputClass
} from './constants.js';
import { useTrainer } from './useTrainer.js';

const TaskTrainer = () => {
  const {
    currentWord,
    userInput,
    state,
    completedWords,
    isCompleted,
    inputRef,
    handleInputChange,
    handleSubmit,
    handleReset,
  } = useTrainer();

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
