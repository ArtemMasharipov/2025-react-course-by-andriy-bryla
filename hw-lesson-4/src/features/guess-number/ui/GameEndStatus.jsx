export default function GameEndStatus({ winner, targetNumber }) {
  return (
    <div className="bg-red-100 text-red-800 p-4 rounded-lg border-2 border-red-300">
      <h3 className="font-bold text-lg mb-2">🏁 Гра закінчена!</h3>
      <p className="mb-1">Програв: <strong>{winner}</strong></p>
      <p>Загадане число: <strong>{targetNumber.join('')}</strong></p>
    </div>
  )
}
