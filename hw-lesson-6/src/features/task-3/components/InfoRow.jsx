const InfoRow = ({ label, value, valueColor = 'text-blue-600', valueFont = 'font-mono' }) => {
  return (
    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
      <span className="font-medium text-gray-700">
        {label}:
      </span>
      <span className={`text-lg ${valueFont} ${valueColor}`}>
        {value}
      </span>
    </div>
  )
}

export default InfoRow
