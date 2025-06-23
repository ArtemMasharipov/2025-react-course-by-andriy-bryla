import { Button, Card, Input } from '../../../shared/ui'
import { formatPrice } from '../../../shared/utils'
import { GUEST_OPTIONS, ROOM_OPTIONS, ROOM_PRICES } from '../constants'

const PriceCalculation = ({ nights, roomType, totalPrice }) => {
  const pricePerNight = ROOM_PRICES[roomType]

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
      <h4 className="text-lg font-semibold text-green-800 mb-2">
        💰 Розрахунок вартості
      </h4>
      <div className="space-y-1 text-sm text-green-700">
        <p>Кількість ночей: <span className="font-semibold">{nights}</span></p>
        <p>Ціна за ніч: <span className="font-semibold">{formatPrice(pricePerNight)} грн</span></p>
        <div className="border-t border-green-200 pt-2 mt-2">
          <p className="text-lg font-bold text-green-800">
            Загальна вартість: {formatPrice(totalPrice)} грн
          </p>
        </div>
      </div>
    </div>
  )
}

export const BookingForm = ({
  handleSubmit,
  formData,
  handleFormDataChange,
  nights,
  totalPrice,
}) => {
  const today = new Date().toISOString().split('T')[0]
  return (
    <Card>
      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">Нове бронювання</h3>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <Input
          label="Повне ім'я *"
          type="text"
          required
          placeholder="Введіть ваше повне ім'я"
          value={formData.name}
          onChange={e => handleFormDataChange('name', e.target.value)}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Тип номера *
          </label>
          <select
            value={formData.roomType}
            onChange={e => handleFormDataChange('roomType', e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
          >
            <option value="">Оберіть тип номера</option>
            {ROOM_OPTIONS.map(room => (
              <option key={room.value} value={room.value}>
                {room.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <Input
            label="Дата заїзду *"
            type="date"
            value={formData.checkIn}
            onChange={(e) => handleFormDataChange('checkIn', e.target.value)}
            required
            min={today}
          />

          <Input
            label="Дата виїзду *"
            type="date"
            value={formData.checkOut}
            onChange={(e) => handleFormDataChange('checkOut', e.target.value)}
            required
            min={formData.checkIn || today}
          />
        </div>

        {nights > 0 && formData.roomType && (
          <PriceCalculation
            nights={nights}
            roomType={formData.roomType}
            totalPrice={totalPrice}
          />
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Кількість гостей *
          </label>
          <select
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
            value={formData.guests}
            onChange={e => handleFormDataChange('guests', e.target.value)}
          >
            <option value="">Оберіть кількість гостей</option>
            {GUEST_OPTIONS.map(guest => (
              <option key={guest.value} value={guest.value}>
                {guest.label}
              </option>
            ))}
          </select>
        </div>

        <Input
          label="Номер телефону *"
          type="tel"
          required
          placeholder="380501234567"
          pattern="\d{12}"
          minLength={12}
          maxLength={12}
          value={formData.phone}
          onChange={e => handleFormDataChange('phone', e.target.value)}
        />

        <Input
          label="Email адреса *"
          type="email"
          required
          placeholder="example@email.com"
          value={formData.email}
          onChange={e => handleFormDataChange('email', e.target.value)}
        />

        <Button type="submit" variant="primary" fullWidth>
          🎯 Забронювати номер
        </Button>
      </form>
    </Card>
  )
}
