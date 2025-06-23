export const generateExample = () => {
  const a = Math.floor(Math.random() * 10)
  const b = Math.floor(Math.random() * 10)
  return { a, b, answer: a + b }
}

export const formatResult = (example, userAnswer) => {
  const resultText = `${example.a} + ${example.b} = ${example.answer}`
  const answerText = userAnswer || 'пропущено'
  return `${resultText} (ваша відповідь: ${answerText})`
}
