import { ERROR_MESSAGES } from './constants.js'

export const validateRange = (min, max) => {
  if (!min?.trim() || !max?.trim()) {
    return { error: ERROR_MESSAGES.EMPTY_FIELDS }
  }

  const minNum = Number(min)
  const maxNum = Number(max)

  if (isNaN(minNum) || isNaN(maxNum)) {
    return { error: ERROR_MESSAGES.INVALID_MIN }
  }

  if (minNum > maxNum) {
    return { error: ERROR_MESSAGES.INVALID_RANGE }
  }

  return {
    isValid: true,
    minValue: minNum,
    maxValue: maxNum,
  }
}
