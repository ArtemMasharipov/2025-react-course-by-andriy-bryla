import DigitsDisplay from './DigitsDisplay'
import { getPlayerCardClasses } from './styles'

export default function GamePlayerCard({ player, isActive, guessedDigits, totalMoves }) {
  const classes = getPlayerCardClasses(isActive)

  return (
    <div className={classes.card}>
      <div className="flex items-center justify-between mb-2">
        <h3 className={classes.title}>
          {isActive && <span className="mr-1">🎯</span>}
          {player}
        </h3>
        <div className={classes.moves}>
          {totalMoves} ходів
        </div>
      </div>

      <DigitsDisplay
        title="Вгадані цифри"
        digits={guessedDigits}
        variant={guessedDigits.length === 0 ? 'muted' : 'success'}
      />
    </div>
  )
}
