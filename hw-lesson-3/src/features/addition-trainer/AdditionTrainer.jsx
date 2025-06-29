import { useCallback, useEffect, useRef, useState } from 'react'
import { TASK_METADATA, TIMEOUTS } from '../../shared/appConstants'
import { Card, TaskDescription } from '../../shared/ui'
import { Question, Results, TrainerForm } from './components'
import { TRAINER_CONFIG } from './constants'
import { formatResult, generateExample } from './utils'

export const AdditionTrainer = () => {
  const [total, setTotal] = useState(0)
  const [error, setError] = useState('')
  const [gameState, setGameState] = useState({
    currentExample: null,
    userAnswer: '',
    results: { correct: [], wrong: [] },
    timeLeft: TRAINER_CONFIG.TIME_PER_QUESTION  })

  const timerRef = useRef(null)
  const errorTimeoutRef = useRef(null)
  const isActive = gameState.currentExample !== null
  const answered = gameState.results.correct.length + gameState.results.wrong.length
  const hasResults = answered > 0
  const currentQuestionNumber = answered + 1

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }  }, [])

  const processAnswer = useCallback(
    answerValue => {
      if (!gameState.currentExample) return

      clearTimer()

      const isCorrect = Number(answerValue) === gameState.currentExample.answer
      const formattedResult = formatResult(gameState.currentExample, answerValue)

      setGameState(prev => {
        const newResults = {
          correct: isCorrect ? [...prev.results.correct, formattedResult] : prev.results.correct,
          wrong: !isCorrect ? [...prev.results.wrong, formattedResult] : prev.results.wrong,
        }

        const newAnswered = newResults.correct.length + newResults.wrong.length

        return {
          ...prev,
          userAnswer: '',
          results: newResults,
          currentExample: newAnswered >= total ? null : generateExample(),
          timeLeft: newAnswered >= total ? 0 : TRAINER_CONFIG.TIME_PER_QUESTION
        }
      })
    },
    [gameState.currentExample, total, clearTimer]  )

  const showError = message => {
    if (errorTimeoutRef.current) {
      clearTimeout(errorTimeoutRef.current)
    }
    setError(message)
    errorTimeoutRef.current = setTimeout(
      () => setError(''),
      TIMEOUTS.ALERT_DISPLAY
    )  }

  const startTraining = () => {
    if (
      total < TRAINER_CONFIG.MIN_EXAMPLES ||
      total > TRAINER_CONFIG.MAX_EXAMPLES
    ) {      showError(
        `Введіть кількість від ${TRAINER_CONFIG.MIN_EXAMPLES} до ${TRAINER_CONFIG.MAX_EXAMPLES}`
      )
      return
    }

    clearTimer()
    setGameState({
      currentExample: generateExample(),
      userAnswer: '',
      results: { correct: [], wrong: [] },
      timeLeft: TRAINER_CONFIG.TIME_PER_QUESTION
    })
    setError('')  }

  const restartTraining = () => {
    clearTimer()
    setGameState({
      currentExample: null,
      userAnswer: '',
      results: { correct: [], wrong: [] },
      timeLeft: TRAINER_CONFIG.TIME_PER_QUESTION
    })
    setError('')  }

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          timeLeft: prev.timeLeft - 1
        }))
      }, 1000)
    }
    return clearTimer  }, [isActive, answered, clearTimer])

  useEffect(() => {
    if (isActive && gameState.timeLeft <= 0) {
      processAnswer(gameState.userAnswer)
    }  }, [isActive, gameState.timeLeft, gameState.userAnswer, processAnswer])

  useEffect(() => {
    return () => {
      clearTimer()
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current)
      }
    }
  }, [clearTimer])

  const taskData = TASK_METADATA['addition-trainer']
  return (
    <Card>
      <TaskDescription
        title={taskData.title}
        description={taskData.description}
        instructions={taskData.instructions}
      />
      {!isActive && !hasResults && (
        <TrainerForm
          total={total}
          setTotal={setTotal}
          onStart={startTraining}
          error={error}
        />
      )}      {isActive && (
        <Question
          question={gameState.currentExample}
          userAnswer={gameState.userAnswer}
          setUserAnswer={value => setGameState(prev => ({ ...prev, userAnswer: value }))}
          timeLeft={gameState.timeLeft}
          totalQuestions={total}
          currentQuestionNumber={currentQuestionNumber}
          onSubmit={() => processAnswer(gameState.userAnswer)}
        />
      )}
      {!isActive && hasResults && (
        <Results
          correctAnswers={gameState.results.correct.length}
          incorrectAnswers={gameState.results.wrong.length}
          totalQuestions={total}
          onRestart={restartTraining}
        />
      )}
    </Card>
  )
}
