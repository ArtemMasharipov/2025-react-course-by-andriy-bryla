export const generateThreeDigitNumber = () => {
  const digits = []
  while (digits.length < 3) {
    const digit = Math.floor(Math.random() * 10)
    if (!digits.includes(digit)) {
      digits.push(digit)
    }
  }
  return digits
}

export const isDigitInNumber = (digit, targetNumber) => {
  return targetNumber.includes(digit)
}
