export const SPECIAL_USER = 'Іван'
export const SUCCESS_EMOJI = '✅'
export const FORM_FIELDS = {
  LOGIN: 'login',
  PASSWORD: 'password',
}

export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Невірний логін або пароль',
}

export const SUCCESS_MESSAGE = 'Успішний вхід у систему!'

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
