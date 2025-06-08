export const validatePassengers = value => {
  const passengers = parseInt(value)

  if (isNaN(passengers) || passengers <= 0) {
    return { isValid: false, value: null }
  }

  return { isValid: true, value: passengers }
}
