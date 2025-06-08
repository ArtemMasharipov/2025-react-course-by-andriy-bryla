export const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const createRandomGeneratorResult = (min, max) => {
  const randomNumber = generateRandomNumber(min, max)
  return {
    number: randomNumber,
    range: `${min}-${max}`,
  }
}
