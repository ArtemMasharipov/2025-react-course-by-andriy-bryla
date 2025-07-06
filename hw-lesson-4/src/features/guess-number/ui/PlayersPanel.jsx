import GamePlayerCard from './GamePlayerCard'
import { getTurnIndicatorClasses } from './styles'

const PlayerTurnIndicator = ({ currentPlayer }) => (
  <div className="text-center">
    <div className={getTurnIndicatorClasses()}>
      <span className="text-lg">🎯</span>
      <span className="font-semibold">Хід гравця: {currentPlayer}</span>
    </div>
  </div>
)

export default function PlayersPanel({
  players,
  playerGuesses,
  currentPlayer,
  isGameFinished,
  usedDigits
}) {
  const playerCards = players.map((player, playerIndex) => ({
    player,
    isActive: !isGameFinished && player === currentPlayer,
    totalMoves: usedDigits.filter((_, index) => index % 2 === playerIndex).length,
    guessedDigits: playerGuesses[player] || []
  }))

  return (
    <div className="space-y-4">
      {!isGameFinished && <PlayerTurnIndicator currentPlayer={currentPlayer} />}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {playerCards.map(({ player, isActive, guessedDigits, totalMoves }) => (
          <GamePlayerCard
            key={player}
            player={player}
            isActive={isActive}
            guessedDigits={guessedDigits}
            totalMoves={totalMoves}
          />
        ))}
      </div>
    </div>
  )
}
