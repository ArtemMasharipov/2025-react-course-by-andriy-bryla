/**
 * Утилита для обработки ошибок
 */

/**
 * Обрабатывает ошибки с логированием и уведомлениями
 * @param {Error} error - Ошибка
 * @param {string} context - Контекст ошибки
 * @param {Function} showNotification - Функция для показа уведомления (опционально)
 */
export function handleError(error, context = 'Operation', showNotification = null) {
  // Логируем ошибку в консоль только в development режиме
  if (process.env.NODE_ENV === 'development') {
    console.error(`${context} failed:`, error)
  }
  
  // Показываем уведомление пользователю, если функция предоставлена
  if (showNotification && typeof showNotification === 'function') {
    showNotification({
      type: 'error',
      message: `${context} failed. Please try again.`
    })
  }
}

/**
 * Обрабатывает ошибки API с дополнительной информацией
 * @param {Error} error - Ошибка API
 * @param {string} operation - Операция, которая не удалась
 * @param {Function} showNotification - Функция для показа уведомления (опционально)
 */
export function handleApiError(error, operation = 'API request', showNotification = null) {
  const message = error?.data?.message || error?.message || 'Unknown error occurred'
  
  if (process.env.NODE_ENV === 'development') {
    console.error(`${operation} failed:`, {
      message,
      status: error?.status,
      data: error?.data
    })
  }
  
  if (showNotification && typeof showNotification === 'function') {
    showNotification({
      type: 'error',
      message: `${operation} failed: ${message}`
    })
  }
}
