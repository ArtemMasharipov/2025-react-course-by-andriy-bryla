export const WORD_PAIRS = [
  { emoji: '🍎', english: 'apple', translation: 'яблуко' },
  { emoji: '🐱', english: 'cat', translation: 'кіт' },
  { emoji: '🏠', english: 'house', translation: 'дім' },
  { emoji: '📚', english: 'book', translation: 'книга' },
  { emoji: '🌟', english: 'star', translation: 'зірка' },
  { emoji: '🚗', english: 'car', translation: 'машина' },
  { emoji: '🌸', english: 'flower', translation: 'квітка' },
  { emoji: '🌊', english: 'water', translation: 'вода' },
]

export const STATES = {
  TRAINING: 'training',
  CORRECT: 'correct',
  INCORRECT: 'incorrect',
  COMPLETED: 'completed',
}

export const MESSAGES = {
  CORRECT: 'Правильно! Чудово!',
  INCORRECT: 'Неправильно. Спробуйте ще раз! 💪',
  COMPLETED: 'Вітаємо! Ви вивчили всі слова! 🎊',
  PLACEHOLDER: 'Введіть переклад українською...',
  WORD_COUNT: 'слово з',
  WORDS_LEARNED: 'Вивчено слів:',
  PROGRESS: 'Прогрес',
  CORRECT_ANSWER: 'Правильна відповідь:',
  TRY_AGAIN: 'Почати заново',
}

export const TIMING = {
  FEEDBACK_DURATION: 1500,
  FOCUS_DELAY: 100,
}

export const getBackgroundClass = state => {
  const backgroundMap = {
    [STATES.TRAINING]: 'bg-gray-50',
    [STATES.CORRECT]: 'bg-green-50',
    [STATES.INCORRECT]: 'bg-red-50',
    [STATES.COMPLETED]: 'bg-purple-50',
  }
  return backgroundMap[state] || 'bg-gray-50'
}

export const getFeedbackClassName = state => {
  const feedbackMap = {
    [STATES.CORRECT]:
      'mt-6 p-4 bg-green-100 border border-green-300 rounded-lg text-center text-green-800',
    [STATES.INCORRECT]:
      'mt-6 p-4 bg-red-100 border border-red-300 rounded-lg text-center text-red-800',
  }
  return feedbackMap[state] || ''
}

export const getFeedbackIcon = state => {
  const iconMap = {
    [STATES.CORRECT]: '✅',
    [STATES.INCORRECT]: '❌',
  }
  return iconMap[state] || ''
}

export const getFeedbackMessage = state => {
  const messageMap = {
    [STATES.CORRECT]: MESSAGES.CORRECT,
    [STATES.INCORRECT]: MESSAGES.INCORRECT,
  }
  return messageMap[state] || ''
}

export const getInputClass = state => {
  const inputMap = {
    [STATES.CORRECT]: 'border-green-500 bg-green-50',
    [STATES.INCORRECT]: 'border-red-500 bg-red-50',
  }
  return inputMap[state] || ''
}
