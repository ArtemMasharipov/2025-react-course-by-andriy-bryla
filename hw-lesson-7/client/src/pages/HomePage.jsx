export default function HomePage() {
  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Вітаємо в ElectroShop!</h1>

          <div className="text-lg text-gray-700 leading-relaxed space-y-4">
            <p>Це магазин належить програмісту на фрілансі.</p>

            <p className="font-medium">Тому:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>магазин працює коли хоче;</li>
              <li>товари надсилає швидко;</li>
              <li>на запитання відповідає коли виспиться.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
