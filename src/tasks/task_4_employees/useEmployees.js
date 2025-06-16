import { EMPLOYEES, formatSalary } from './constants.js'

export const useEmployees = () => {
  const totalEmployees = EMPLOYEES.length
  const totalSalary = EMPLOYEES.reduce(
    (sum, employee) => sum + employee.salary,
    0
  )
  const averageSalary = totalSalary / totalEmployees

  const formattedEmployees = EMPLOYEES.map(employee => ({
    ...employee,
    formattedSalary: formatSalary(employee.salary),
  }))

  return {
    employees: formattedEmployees,
    totalEmployees,
    totalSalary: formatSalary(totalSalary),
    averageSalary: formatSalary(averageSalary),
  }
}
