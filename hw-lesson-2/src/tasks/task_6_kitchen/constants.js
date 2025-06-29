export const ORDER_STATUS = {
  WAITING: 'waiting',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
}

export const STATUS_CONFIG = {
  [ORDER_STATUS.WAITING]: {
    color: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    icon: '⏳',
    label: 'Очікування',
  },
  [ORDER_STATUS.PROCESSING]: {
    color: 'bg-blue-50 border-blue-200 text-blue-800',
    icon: '👨‍🍳',
    label: 'Готується',
  },
  [ORDER_STATUS.COMPLETED]: {
    color: 'bg-green-50 border-green-200 text-green-800',
    icon: '✅',
    label: 'Готово',
  },
}

export const KANBAN_COLUMNS = [
  {
    key: 'waiting',
    title: STATUS_CONFIG[ORDER_STATUS.WAITING].label,
    icon: STATUS_CONFIG[ORDER_STATUS.WAITING].icon,
    status: ORDER_STATUS.WAITING,
    emptyText: 'Немає замовлень в очікуванні',
  },
  {
    key: 'processing',
    title: STATUS_CONFIG[ORDER_STATUS.PROCESSING].label,
    icon: STATUS_CONFIG[ORDER_STATUS.PROCESSING].icon,
    status: ORDER_STATUS.PROCESSING,
    emptyText: 'Немає замовлень в роботі',
  },
  {
    key: 'completed',
    title: STATUS_CONFIG[ORDER_STATUS.COMPLETED].label,
    icon: STATUS_CONFIG[ORDER_STATUS.COMPLETED].icon,
    status: ORDER_STATUS.COMPLETED,
    emptyText: 'Немає готових замовлень',
  },
]

export const BUTTON_LABELS = {
  REMOVE: 'Подано',
  NEXT: '→',
}
