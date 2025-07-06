import { useState } from 'react'
import { TASKS } from '../../app/constants'
import { Card, TaskDescription, UIButton } from '../../shared'

import { PLAYERS } from './constants'
import {
  DigitsDisplay,
  DigitSelector,
  GameEndStatus,
  PlayersPanel
} from './ui'
import {
  createGameDigits,
  generateThreeDigitNumber
} from './utils'

export default function NumberGuessingGame() {

  const createInitialGameState = () => {
    const targetNumber = generateThreeDigitNumber()
    return {
      targetNumber,
      gameDigits: createGameDigits(targetNumber),
      currentPlayerIndex: 0,
      usedDigits: [],
      winner: ''
    }
  }

  const [gameState, setGameState] = useState(createInitialGameState)

  const { targetNumber, gameDigits, currentPlayerIndex, usedDigits, winner } = gameState

  const currentPlayer = PLAYERS[currentPlayerIndex]
  const isGameFinished = winner !== ''
  const availableDigits = Array.from({length: 10}, (_, i) => i).filter(digit => !usedDigits.includes(digit))

  const guessedDigitsData = gameDigits.filter(digit => digit.isGuessed)
  const guessedDigits = guessedDigitsData.map(digit => digit.value)
  const playerGuesses = {
    [PLAYERS[0]]: guessedDigitsData.filter(digit => digit.guessedBy === PLAYERS[0]).map(digit => digit.value),
    [PLAYERS[1]]: guessedDigitsData.filter(digit => digit.guessedBy === PLAYERS[1]).map(digit => digit.value)
  }

  const makeGuess = (digit) => {
    setGameState(prevState => {
      const newUsedDigits = [...prevState.usedDigits, digit]

      if (prevState.targetNumber.includes(digit)) {
        const newGameDigits = prevState.gameDigits.map(gameDigit =>
          gameDigit.value === digit
            ? { ...gameDigit, isGuessed: true, guessedBy: currentPlayer }
            : gameDigit
        )

        const guessedCount = newGameDigits.filter(d => d.isGuessed).length
        const gameWon = guessedCount === 3

        return {
          ...prevState,
          usedDigits: newUsedDigits,
          gameDigits: newGameDigits,
          winner: gameWon ? currentPlayer : '',
          currentPlayerIndex: gameWon ? prevState.currentPlayerIndex : (prevState.currentPlayerIndex + 1) % 2
        }
      }

      return {
        ...prevState,
        usedDigits: newUsedDigits,
        currentPlayerIndex: (prevState.currentPlayerIndex + 1) % 2
      }
    })
  }

  const resetGame = () => {
    setGameState(createInitialGameState())
  }

  const taskInfo = TASKS.find(task => task.id === 'guess-number')

  return (
    <div className="space-y-6">
      <TaskDescription
        title={taskInfo.title}
        description={taskInfo.description}
        requirements={taskInfo.requirements}
      />

      <Card>
        <div className="text-center space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
              Вгадай тризначне число
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Комп'ютер загадав тризначне число з різними цифрами. Гравці по черзі називають цифри.
              Програє той, хто вгадав останню цифру!
            </p>
          </div>

          {isGameFinished && <GameEndStatus winner={winner} targetNumber={targetNumber} />}

          <DigitsDisplay
            title="Вгадані цифри"
            digits={guessedDigits}
            type="large"
          />

          <PlayersPanel
            players={PLAYERS}
            playerGuesses={playerGuesses}
            currentPlayer={currentPlayer}
            isGameFinished={isGameFinished}
            usedDigits={usedDigits}
          />

          <DigitsDisplay
            title="Використані цифри"
            digits={usedDigits}
          />

          {isGameFinished ? (
            <UIButton onClick={resetGame} size="lg" className="w-full sm:w-auto">
              Нова гра
            </UIButton>
          ) : (
            <DigitSelector
              availableDigits={availableDigits}
              onDigitClick={makeGuess}
            />
          )}
        </div>
      </Card>
    </div>
  )
}
