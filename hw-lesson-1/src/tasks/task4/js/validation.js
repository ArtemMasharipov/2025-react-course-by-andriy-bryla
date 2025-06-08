export const validateAmount = input => {
  const amount = Number(input)
  return amount > 0 && !Number.isNaN(amount) ? amount : null
}
