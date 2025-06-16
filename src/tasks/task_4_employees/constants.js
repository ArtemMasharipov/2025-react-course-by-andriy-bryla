export const EMPLOYEES = [
  { id: 1, name: 'Іван Петров', salary: 75000 },
  { id: 2, name: 'Марія Сидорова', salary: 82000 },
  { id: 3, name: 'Олексій Козлов', salary: 68000 },
  { id: 4, name: 'Катерина Смирнова', salary: 95000 },
  { id: 5, name: 'Дмитро Вовков', salary: 71000 },
  { id: 6, name: 'Ольга Морозова', salary: 88000 },
  { id: 7, name: 'Андрій Лебедєв', salary: 79000 },
  { id: 8, name: 'Наталя Орлова', salary: 84000 },
]

export const formatSalary = amount => {
  return new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency: 'UAH',
    minimumFractionDigits: 0,
  }).format(amount)
}

export const STATS_CONFIG = [
  {
    key: 'totalEmployees',
    icon: '👥',
    title: 'Всього співробітників',
    color: 'blue',
  },
  {
    key: 'totalSalary',
    icon: '💰',
    title: 'Загальний фонд',
    color: 'green',
  },
  {
    key: 'averageSalary',
    icon: '📊',
    title: 'Середня зарплата',
    color: 'orange',
  },
]
