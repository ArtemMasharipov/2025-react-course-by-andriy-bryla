import TaskLogin from '../../tasks/task_1_login/TaskLogin.jsx'
import TaskTicket from '../../tasks/task_2_ticket/TaskTicket.jsx'
import TaskTrainer from '../../tasks/task_3_trainer/TaskTrainer.jsx'
import TaskEmployees from '../../tasks/task_4_employees/TaskEmployees.jsx'
import TaskSearch from '../../tasks/task_5_search/TaskSearch.jsx'
import TaskKitchen from '../../tasks/task_6_kitchen/TaskKitchen.jsx'

export const TASKS = [
  {
    id: 1,
    name: 'Завдання 1: Валідація входу',
    component: TaskLogin,
    description:
      'Вводимо логіна і пароль. Якщо логін вірний відображаємо смайл. Якщо ні, то: 1) якщо логін = Іван – колір повідомлення про помилку синій 2) якщо хтось інший, то колір повідомлення червоний',
    title: 'Задача 1',
  },
  {
    id: 2,
    name: 'Завдання 2: Авіаквиток',
    component: TaskTicket,
    description:
      'З випадаючого списку вибираємо клас квитка у літаку. Якщо 1) бізнес - виводимо елементи для вибору газети та коньяку (якщо вибрано коньяк, то запропонувати закуску (так/ні)), на фоні зображення бізнес кают 2) економ – виводимо елементи для вибору типу пива і чипсів, на фоні хмарки.',
    title: 'Задача 2',
  },
  {
    id: 3,
    name: 'Завдання 3: Тренажер англійських слів',
    component: TaskTrainer,
    description:
      'Елемент тренажера англійської. Виводимо зображення елемента і слово. Користувач вводить відповідь. Якщо вірно – відтворюємо фразу «Добре. Молодець!» (і додаємо зелену рамку до елемента), якщо ні - то відтворюємо фразу «Невірно, спробуйте ще раз» (і додаємо червону рамку).',
    title: 'Задача 3',
  },
  {
    id: 4,
    name: 'Завдання 4: Список працівників',
    component: TaskEmployees,
    description:
      'Вивести список як маркований список з елементами у форматі (name: salary)',
    title: 'Задача 4',
  },
  {
    id: 5,
    name: 'Завдання 5: Результати пошуку',
    component: TaskSearch,
    description:
      "Самостійно сформуйте масив даних та виведіть фрагмент на зразок поданого (дані не обов'язково повинні співпадати)",
    title: 'Задача 5',
  },
  {
    id: 6,
    name: 'Завдання 6: Кухонні замовлення',
    component: TaskKitchen,
    description:
      'На кухню поступають замовлення. Спочатку ми додаємо їх у список "Очікують на виконання", якщо повар береться робити — замовлення переходить у список "Виконуються", якщо замовлення виконано — переходить у список "Готові до виносу". Якщо натиснути на "Подано" - страва зникає з таблиці. Підказка: тут треба зберігати 3 масиви страв (waitingList, processingList, completedList)',
    title: 'Задача 6',
  },
]

export const APP_CONFIG = {
  name: 'HW Lesson 2: Styles. Conditional Rendering. Lists. Deploy',
  version: '1.0.0',
  description:
    'React homework demonstrating styles, conditional rendering, lists and deployment',
  defaultTask: 1,
}

export const THEME = {
  background: 'bg-gray-50',
  container: 'max-w-4xl mx-auto p-4',
  card: 'bg-white rounded-lg shadow p-6',
  transition: 'transition-all duration-200',
}

export const SELECTION_STYLES = {
  selected: 'border-indigo-500 bg-indigo-50 shadow-md transform scale-105',
  default: 'border-gray-200 bg-white hover:border-indigo-300 hover:shadow-sm',
  focusRing:
    'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
}

export const createSelectionClasses = (
  isSelected,
  baseClasses = '',
  theme = 'transition-all duration-200'
) => {
  const selectionClass = isSelected
    ? SELECTION_STYLES.selected
    : SELECTION_STYLES.default
  return `${baseClasses} ${theme} ${selectionClass}`.trim()
}
