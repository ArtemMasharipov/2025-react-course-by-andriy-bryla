export const ROOM_PRICES = {
  'single-standard': 800,
  'double-standard': 1200,
  'double-improved': 1600,
  luxury: 2500,
  'presidential-luxury': 5000,
}

export const ROOM_NAMES = {
  'single-standard': 'Одномісний стандарт',
  'double-standard': 'Двомісний стандарт',
  'double-improved': 'Двомісний покращений',
  luxury: 'Люкс',
  'presidential-luxury': 'Президентський люкс',
}

export const ROOM_OPTIONS = [
  { value: 'single-standard', label: '🛏️ Одномісний стандарт (800 грн/ніч)' },
  { value: 'double-standard', label: '🛏️🛏️ Двомісний стандарт (1200 грн/ніч)' },
  {
    value: 'double-improved',
    label: '🛏️🛏️ Двомісний покращений (1600 грн/ніч)',
  },
  { value: 'luxury', label: '👑 Люкс (2500 грн/ніч)' },
  {
    value: 'presidential-luxury',
    label: '💎 Президентський люкс (5000 грн/ніч)',
  },
]

export const GUEST_OPTIONS = [
  { value: '1', label: '1 гість' },
  { value: '2', label: '2 гостя' },
  { value: '3', label: '3 гостя' },
  { value: '4', label: '4 гостя' },
  { value: '5', label: '5+ гостей' },
]

export const CONFIG = {
  SUCCESS_MESSAGE_TIMEOUT: 3000,
  MILLISECONDS_PER_DAY: 1000 * 60 * 60 * 24,
}
