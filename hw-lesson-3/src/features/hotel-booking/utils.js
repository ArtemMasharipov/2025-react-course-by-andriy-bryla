import { v4 as uuidv4 } from 'uuid'
import { CONFIG, ROOM_NAMES, ROOM_PRICES } from './constants'

/**
 * Вычисляет количество ночей между датами
 */
export const calculateNights = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return 0
  const start = new Date(checkIn)
  const end = new Date(checkOut)
  const diffTime = end - start
  return Math.max(0, Math.ceil(diffTime / CONFIG.MILLISECONDS_PER_DAY))
}

/**
 * Вычисляет общую стоимость бронирования
 */
export const calculateTotalPrice = (roomType, nights) => {
  const pricePerNight = ROOM_PRICES[roomType] || 0
  return nights * pricePerNight
}

/**
 * Создает объект бронирования
 */
export const createBooking = (formData, nights, totalPrice) => {
  return {
    id: uuidv4(),
    name: formData.name,
    room: ROOM_NAMES[formData.roomType] || formData.roomType,
    checkIn: formData.checkIn,
    checkOut: formData.checkOut,
    nights: nights,
    guests: formData.guests,
    phone: formData.phone,
    email: formData.email,
    totalPrice: totalPrice,
    pricePerNight: ROOM_PRICES[formData.roomType] || 0,
    createdAt: new Date().toLocaleString('uk-UA'),
  }
}

/**
 * Фильтрует телефон - оставляет только цифры
 */
export const filterPhone = value => {
  return value.replace(/\D/g, '')
}
