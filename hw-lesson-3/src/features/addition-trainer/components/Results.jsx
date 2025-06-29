import { Button } from '../../../shared/ui'

export const Results = ({ correctAnswers, incorrectAnswers, totalQuestions, onRestart }) => {
  const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-center">📊 Результати</h3>

      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <div className="text-3xl font-bold text-gray-800 mb-2">
          {correctAnswers} з {totalQuestions}
        </div>
        <div className="text-lg text-gray-600">
          Точність: {accuracy}%
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-semibold text-green-800 mb-3">
            ✅ Правильні ({correctAnswers})
          </h4>
          <div className="text-green-700 text-center">
            {correctAnswers > 0 ? `Відмінно! ${correctAnswers} правильних відповідей` : 'Немає правильних відповідей'}
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h4 className="font-semibold text-red-800 mb-3">
            ❌ Неправильні ({incorrectAnswers})
          </h4>
          <div className="text-red-700 text-center">
            {incorrectAnswers > 0 ? `${incorrectAnswers} помилок` : 'Відмінно! Немає помилок'}
          </div>
        </div>
      </div>

      <div className="text-center">
        <Button onClick={onRestart} variant="primary" size="lg">
          🔄 Новий тренінг
        </Button>
      </div>
    </div>
  )
}
