export function validatePositiveInteger(value) {
  const num = Number(value)

  if (isNaN(num) || num <= 0) {
    return { isValid: false, error: 'Введіть число більше нуля' }
  }

  return { isValid: true, value: Math.floor(num) }
}

export function validateRange(
  value,
  min,
  max,
  errorMessage = 'Некоректне значення'
) {
  const num = Number(value)

  if (isNaN(num) || !Number.isInteger(num) || num < min || num > max) {
    return {
      isValid: false,
      error: `${errorMessage} (${min}-${max})`,
    }
  }

  return { isValid: true, value: num }
}
