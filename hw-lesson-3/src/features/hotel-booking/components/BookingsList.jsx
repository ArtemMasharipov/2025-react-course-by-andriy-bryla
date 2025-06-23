import { Button, Card } from '../../../shared/ui'
import { formatPrice } from '../../../shared/utils'

const BookingItem = ({ booking, onDelete }) => (
  <Card>
    <div className="flex justify-between items-start">
      <div className="flex-1">
        <h4 className="font-semibold text-gray-800 mb-2">{booking.name}</h4>
        <div className="space-y-1 text-sm text-gray-600">
          <p><span className="font-medium">Номер:</span> {booking.room}</p>
          <p><span className="font-medium">Період:</span> {booking.checkIn} — {booking.checkOut}</p>
          <p><span className="font-medium">Ночей:</span> {booking.nights}</p>
          <p><span className="font-medium">Гостей:</span> {booking.guests}</p>
          <p><span className="font-medium">Телефон:</span> {booking.phone}</p>
          <p><span className="font-medium">Email:</span> {booking.email}</p>
          <p className="text-lg font-bold text-green-600">
            💰 {formatPrice(booking.totalPrice)} грн
          </p>
        </div>
      </div>
      <Button
        variant="danger"
        size="sm"
        onClick={() => onDelete(booking.id)}
        className="ml-4"
      >
        🗑️
      </Button>
    </div>
  </Card>
)

const EmptyBookingsList = () => (
  <Card>
    <div className="text-center py-8">
      <div className="text-6xl mb-4">🏨</div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        Ще немає бронювань
      </h3>
      <p className="text-gray-500">
        Заповніть форму зліва, щоб створити ваше перше бронювання
      </p>
    </div>
  </Card>
)

export const BookingsList = ({ bookings, deleteBooking, clearAllBookings }) => {
  if (bookings.length === 0) {
    return (
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Мої бронювання</h3>
        <EmptyBookingsList />
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">
          Мої бронювання ({bookings.length})
        </h3>
        <Button
          variant="danger"
          onClick={clearAllBookings}
          className="text-sm"
        >
          🗑️ Очистити все
        </Button>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {bookings.map(booking => (
          <BookingItem
            key={booking.id}
            booking={booking}
            onDelete={deleteBooking}
          />
        ))}
      </div>
    </div>
  )
}
