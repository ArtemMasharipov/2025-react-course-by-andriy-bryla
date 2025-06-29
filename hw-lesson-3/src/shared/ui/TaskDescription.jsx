export const TaskDescription = ({
  title,
  description,
  instructions,
  className = ''
}) => (
  <div className={`mb-10 ${className}`}>
    <div className="text-center">
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-3">
        {title}
      </h1>
      <p className="text-gray-600 text-sm sm:text-base mb-6 max-w-2xl mx-auto leading-relaxed">
        {description}
      </p>
      <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-5 sm:p-6 text-left max-w-3xl mx-auto">
        <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
          <span className="text-base">📋</span>
          Технічне завдання
        </h3>
        <div className="text-sm text-blue-800 space-y-2">
          {instructions.map((instruction, index) => (
            <p key={index} className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              <span className="leading-relaxed">{instruction}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  </div>
)
