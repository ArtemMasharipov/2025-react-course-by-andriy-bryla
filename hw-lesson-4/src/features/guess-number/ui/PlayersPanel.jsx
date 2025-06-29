import Chip from './Chip'

export default function PlayersPanel({
  players,
  playerGuesses,
  currentPlayer,
  isGameFinished,
  usedDigits
}) {
  const getPlayerTotalMoves = (player) => {
    const playerIndex = players.indexOf(player)
    return usedDigits.filter((_, index) => index % 2 === playerIndex).length
  }

  const getPlayerCardClasses = (isActive) => {
    const baseClasses = 'p-4 rounded-lg border-2 transition-all duration-300'
    const activeClasses = 'bg-blue-50 border-blue-400 shadow-lg transform scale-105'
    const inactiveClasses = 'bg-gray-50 border-gray-200'

    return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
  }

  const getPlayerNameClasses = (isActive) => {
    const baseClasses = 'font-semibold text-sm sm:text-base'
    const colorClasses = isActive ? 'text-blue-800' : 'text-gray-700'

    return `${baseClasses} ${colorClasses}`
  }

  const getMovesCountClasses = (isActive) => {
    const baseClasses = 'text-xs px-2 py-1 rounded-full'
    const colorClasses = isActive
      ? 'bg-blue-200 text-blue-800'
      : 'bg-gray-200 text-gray-600'

    return `${baseClasses} ${colorClasses}`
  }

  const renderPlayerGuesses = (player) => {
    const guesses = playerGuesses[player]

    if (guesses.length === 0) {
      return <Chip variant="muted">немає</Chip>
    }

    return guesses.map((digit, index) => (
      <Chip key={index} variant="success">
        {digit}
      </Chip>
    ))
  }

  return (
    <div className="space-y-4">
      {!isGameFinished && (
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
            <span className="text-lg">🎯</span>
            <span className="font-semibold">Хід гравця: {currentPlayer}</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {players.map(player => {
          const isActive = !isGameFinished && player === currentPlayer
          const totalMoves = getPlayerTotalMoves(player)

          return (
            <div key={player} className={getPlayerCardClasses(isActive)}>
              <div className="flex items-center justify-between mb-2">
                <h3 className={getPlayerNameClasses(isActive)}>
                  {isActive && <span className="mr-1">🎯</span>}
                  {player}
                </h3>
                <div className={getMovesCountClasses(isActive)}>
                  {totalMoves} ходів
                </div>
              </div>

              <div className="text-xs text-gray-600 mb-2">Вгадані цифри:</div>
              <div className="flex gap-1 flex-wrap justify-center sm:justify-start">
                {renderPlayerGuesses(player)}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
