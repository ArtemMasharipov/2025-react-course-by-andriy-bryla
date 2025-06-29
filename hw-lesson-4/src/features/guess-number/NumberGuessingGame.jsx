import { useState } from 'react'
import { TASKS } from '../../app/constants'
import { Button, Card, TaskDescription } from '../../shared'

import { PLAYERS } from './constants'
import {
  DigitSelector,
  GameEndStatus,
  GuessedDigitsDisplay,
  PlayersPanel,
  UsedDigitsDisplay
} from './ui'
import { generateThreeDigitNumber, isDigitInNumber } from './utils'

export default function NumberGuessingGame() {
  const [targetNumber, setTargetNumber] = useState(() => generateThreeDigitNumber())
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const [usedDigits, setUsedDigits] = useState([])
  const [guessedDigits, setGuessedDigits] = useState([])
  const [playerGuesses, setPlayerGuesses] = useState({ [PLAYERS[0]]: [], [PLAYERS[1]]: [] })
  const [winner, setWinner] = useState('')

  const currentPlayer = PLAYERS[currentPlayerIndex]
  const availableDigits = Array.from({length: 10}, (_, i) => i).filter(digit => !usedDigits.includes(digit))
  const isGameFinished = winner !== ''

  const makeGuess = (digit) => {
    const newUsedDigits = [...usedDigits, digit]
    setUsedDigits(newUsedDigits)

    if (isDigitInNumber(digit, targetNumber)) {
      const newGuessedDigits = [...guessedDigits, digit]
      setGuessedDigits(newGuessedDigits)

      setPlayerGuesses(prev => ({
        ...prev,
        [currentPlayer]: [...prev[currentPlayer], digit]
      }))

      if (newGuessedDigits.length === 3) {
        setWinner(currentPlayer)
        return
      }
    }

    setCurrentPlayerIndex(prev => (prev + 1) % 2)
  }

  const resetGame = () => {
    setTargetNumber(generateThreeDigitNumber())
    setCurrentPlayerIndex(0)
    setUsedDigits([])
    setGuessedDigits([])
    setPlayerGuesses({ [PLAYERS[0]]: [], [PLAYERS[1]]: [] })
    setWinner('')
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

          {isGameFinished && (
            <GameEndStatus winner={winner} targetNumber={targetNumber} />
          )}

          <GuessedDigitsDisplay digits={guessedDigits} />

          <PlayersPanel
            players={PLAYERS}
            playerGuesses={playerGuesses}
            currentPlayer={currentPlayer}
            isGameFinished={isGameFinished}
            usedDigits={usedDigits}
          />

          <UsedDigitsDisplay digits={usedDigits} />

          {!isGameFinished ? (
            <DigitSelector
              availableDigits={availableDigits}
              onDigitClick={makeGuess}
            />
          ) : (
            <Button onClick={resetGame} size="lg" className="w-full sm:w-auto">
              Нова гра
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}
