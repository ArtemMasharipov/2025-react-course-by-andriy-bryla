export const VIRTUALIZATION_CONFIG = {
  DEFAULT_ITEM_HEIGHT: 40,
  DEFAULT_CONTAINER_HEIGHT: 400,
  DEFAULT_OVERSCAN_COUNT: 5,
}

export const DATA_GENERATION_CONFIG = {
  DEFAULT_RECORDS_COUNT: 10000,
  SALARY_MIN: 30000,
  SALARY_RANGE: 50000,
  AGE_MIN: 20,
  AGE_RANGE: 40,
}

export const COLUMNS = [
  { key: 'id', title: 'ID', width: 80 },
  { key: 'name', title: 'Name', width: 150 },
  { key: 'email', title: 'Email', width: 200 },
  { key: 'department', title: 'Department', width: 120 },
  { key: 'salary', title: 'Salary', width: 100 },
  { key: 'age', title: 'Age', width: 80 },
]

export const generateTestData = (
  count = DATA_GENERATION_CONFIG.DEFAULT_RECORDS_COUNT
) => {
  const names = [
    'John',
    'Jane',
    'Bob',
    'Alice',
    'Charlie',
    'Diana',
    'Eve',
    'Frank',
  ]
  const departments = [
    'IT',
    'HR',
    'Finance',
    'Marketing',
    'Sales',
    'Operations',
  ]

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: names[Math.floor(Math.random() * names.length)] + ' ' + (i + 1),
    email: `user${i + 1}@company.com`,
    department: departments[Math.floor(Math.random() * departments.length)],
    salary:
      Math.floor(Math.random() * DATA_GENERATION_CONFIG.SALARY_RANGE) +
      DATA_GENERATION_CONFIG.SALARY_MIN,
    age:
      Math.floor(Math.random() * DATA_GENERATION_CONFIG.AGE_RANGE) +
      DATA_GENERATION_CONFIG.AGE_MIN,
  }))
}
