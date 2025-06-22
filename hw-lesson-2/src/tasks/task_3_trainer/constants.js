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
