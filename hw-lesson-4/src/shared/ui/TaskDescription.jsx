export default function TaskDescription({ title, description, requirements }) {
  return (
    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
        <h3 className="text-lg font-semibold text-blue-900 mb-2 sm:mb-0">
          {title}
        </h3>
      </div>

      <p className="text-blue-800 mb-3 text-sm sm:text-base">
        {description}
      </p>

      {requirements && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-blue-900">Вимоги:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-blue-700">
            {requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
