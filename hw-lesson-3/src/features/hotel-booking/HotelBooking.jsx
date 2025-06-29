import { useEffect, useRef, useState } from 'react'
import { TASK_METADATA } from '../../shared/appConstants'
import { Card, TaskDescription } from '../../shared/ui'
import { BookingForm, BookingsList } from './components'
import { CONFIG } from './constants'
import {
  calculateNights,
  calculateTotalPrice,
  createBooking,
  filterPhone,
} from './utils'

const initialFormData = {
  name: '',
  email: '',
  phone: '',
  guests: '',
  roomType: '',
  checkIn: '',
  checkOut: '',
}

export const HotelBooking = () => {
  const successTimeoutRef = useRef(null)

  const [bookings, setBookings] = useState([])
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState(initialFormData)

  const [nights, setNights] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    const newNights = calculateNights(formData.checkIn, formData.checkOut)
    const newTotalPrice = calculateTotalPrice(
      formData.roomType,
      newNights
    )
    setNights(newNights)
    setTotalPrice(newTotalPrice)
  }, [formData.checkIn, formData.checkOut, formData.roomType])


  const resetForm = () => {
    setFormData(initialFormData)
  }

  const showSuccessMessage = () => {
    if (successTimeoutRef.current) {
      clearTimeout(successTimeoutRef.current)
    }
    setShowSuccess(true)
    successTimeoutRef.current = setTimeout(
      () => setShowSuccess(false),
      CONFIG.SUCCESS_MESSAGE_TIMEOUT    )
  }

  const handleSubmit = e => {
    e.preventDefault()
    const newBooking = createBooking(formData, nights, totalPrice)
    setBookings(prev => [...prev, newBooking])
    showSuccessMessage()
    resetForm()
  }

  const deleteBooking = id => {
    setBookings(prev => prev.filter(booking => booking.id !== id))
  }

  const clearAllBookings = () => {
    setBookings([])
  }

  const handleFormDataChange = (field, value) => {
    const processedValue = field === 'phone' ? filterPhone(value) : value
    setFormData(prev => ({ ...prev, [field]: processedValue }))
  }

  useEffect(() => {
    return () => {
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current)
      }
    }
  }, [])

  const taskData = TASK_METADATA['hotel-booking']
  return (
    <Card>
      <TaskDescription
        title={taskData.title}
        description={taskData.description}
        instructions={taskData.instructions}
      />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 xl:gap-8">
        <BookingForm
          handleSubmit={handleSubmit}
          formData={formData}
          handleFormDataChange={handleFormDataChange}
          nights={nights}
          totalPrice={totalPrice}
        />

        <BookingsList
          bookings={bookings}
          deleteBooking={deleteBooking}
          clearAllBookings={clearAllBookings}
        />
      </div>

      {/* Floating Success Message */}
      {showSuccess && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-bottom-2 duration-300">
          <div className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-lg shadow-lg">
            <div className="flex items-center gap-3">
              <svg
                className="w-5 h-5 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">Номер успішно заброньовано!</span>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}
