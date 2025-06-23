export const getErrorStyles = errorMessageType => {
  if (errorMessageType === 'info') {
    return {
      containerClass:
        'p-4 rounded-lg border-l-4 bg-blue-50 border-blue-400 text-blue-700',
      icon: 'ℹ️',
    }
  }
  return {
    containerClass:
      'p-4 rounded-lg border-l-4 bg-red-50 border-red-400 text-red-700',
    icon: '❌',
  }
}
