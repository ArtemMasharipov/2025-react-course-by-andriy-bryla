export const APP_CONFIG = {
  APP_NAME: 'HW Lesson 3. useRef, useEffect',
}

export const TASK_METADATA = {
  'addition-trainer': {
    id: 'addition-trainer',
    title: '🧮 Тренер додавання',
    description: 'Задача 13. Тренажер додавання',
    instructions: [
      'Вводимо загальну кількість прикладів і натискаємо на кнопку «Старт»',
      'Після запуску (натисканні на кнопку «Старт») кожні 10 секунд (10 секунд між завданнями) користувачу задають випадковий приклад з додавання двох цифр і робиться перевірка',
      'Формується список тих, які він відповів правильно, і які він відповів неправильно',
      'Загальна кількість прикладів вводиться',
    ],
    taskNumber: 13,
  },
  'hotel-booking': {
    id: 'hotel-booking',
    title: '🏨 Бронювання готелю',
    description: 'Задача 14. Розробити форму для бронювання номера у готелі',
    instructions: [
      'Розробити форму для бронювання номера у готелі (придумайте самі які мають бути поля)',
    ],
    taskNumber: 14,
  },
}

export const TIMEOUTS = {
  ALERT_DISPLAY: 3000,
}

export const VALIDATION = {
  MIN_NUMBER_INPUT: 1,
  MAX_NUMBER_INPUT: 100,
  PHONE_PATTERN: '[0-9]{10,12}',
  EMAIL_PATTERN: '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$',
}
