export default function AppFooter() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-2 sm:mb-0">
            <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">E</span>
            </div>
            <span className="font-medium">ElectroShop</span>
          </div>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Всі права захищені
          </p>
        </div>
      </div>
    </footer>
  )
}
