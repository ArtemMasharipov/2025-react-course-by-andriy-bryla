import { ORDER_STATUS } from './constants.js'

export const getNextStatus = currentStatus => {
  switch (currentStatus) {
    case ORDER_STATUS.WAITING:
      return ORDER_STATUS.PROCESSING
    case ORDER_STATUS.PROCESSING:
      return ORDER_STATUS.COMPLETED
    default:
      return null
  }
}

export const getRemoveCondition = status => {
  return status === ORDER_STATUS.COMPLETED
}

export const getStatsCards = (
  waitingCount,
  processingCount,
  completedCount
) => {
  const totalCount = waitingCount + processingCount + completedCount

  return [
    { icon: '📋', title: 'Всього замовлень', value: totalCount, color: 'gray' },
    { icon: '⏳', title: 'В очікуванні', value: waitingCount, color: 'yellow' },
    { icon: '👨‍🍳', title: 'Готується', value: processingCount, color: 'blue' },
    { icon: '✅', title: 'Готово', value: completedCount, color: 'green' },
  ]
}
