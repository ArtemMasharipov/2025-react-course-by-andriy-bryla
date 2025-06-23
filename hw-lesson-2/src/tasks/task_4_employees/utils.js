export const formatSalary = amount => {
  return new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency: 'UAH',
    minimumFractionDigits: 0,
  }).format(amount)
}

export const calculateEmployeeStats = employees => {
  const totalEmployees = employees.length
  const totalSalary = employees.reduce(
    (sum, employee) => sum + employee.salary,
    0
  )
  const averageSalary = totalSalary / totalEmployees

  return {
    totalEmployees,
    totalSalary: formatSalary(totalSalary),
    averageSalary: formatSalary(averageSalary),
  }
}

export const getEmployeeInitials = name => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
}

export const getEmployeeNumber = index => index + 1
