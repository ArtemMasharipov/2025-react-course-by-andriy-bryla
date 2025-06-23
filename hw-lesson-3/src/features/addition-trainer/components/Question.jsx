import { Button, ProgressBar } from '../../../shared/ui'

export const Question = ({
  question,
  userAnswer,
  setUserAnswer,
  timeLeft,
  totalQuestions,
  currentQuestionNumber,
  onSubmit
}) => {
  if (!question || typeof question.a !== 'number' || typeof question.b !== 'number') {
    return null
  }

  const progress = Math.round(currentQuestionNumber / totalQuestions * 100)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center text-sm text-gray-600">
        <span>Питання {currentQuestionNumber} з {totalQuestions}</span>
        <span className={timeLeft <= 3 ? 'text-red-600 font-bold' : ''}>
          ⏱️ {timeLeft}с
        </span>
      </div>

      <ProgressBar value={progress} />

      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <div className="text-4xl font-bold text-gray-800 mb-4">
          {question.a} + {question.b} = ?
        </div>
        <input
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Ваша відповідь"
          className="w-40 px-4 py-3 border border-gray-300 rounded-lg text-center text-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          onKeyPress={(e) => e.key === 'Enter' && onSubmit()}
          autoFocus
        />
      </div>

      <div className="flex justify-center gap-4">
        <Button onClick={onSubmit} variant="success">
          ➡️ Наступне
        </Button>
      </div>
    </div>
  )
}
