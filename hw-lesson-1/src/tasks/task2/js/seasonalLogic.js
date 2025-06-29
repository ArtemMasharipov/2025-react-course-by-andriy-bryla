import { validateRange } from '../../../shared/js/utils.js'
import { MONTH_NAMES, SEASONS } from './constants.js'

const validateMonth = value =>
  validateRange(value, 1, 12, 'Введіть номер місяця')

export const getMonthRecommendations = month => {
  const validation = validateMonth(month)

  if (!validation.isValid) {
    return { error: validation.error }
  }

  const monthNum = validation.value
  const seasonInfo = Object.values(SEASONS).find(season =>
    season.months.includes(monthNum)
  )

  if (!seasonInfo) {
    return { error: 'Невідомий місяць' }
  }

  return {
    month: monthNum,
    monthName: MONTH_NAMES[monthNum],
    season: seasonInfo.name.toLowerCase(),
    clothing: seasonInfo.clothing,
    forest: seasonInfo.forest,
  }
}
