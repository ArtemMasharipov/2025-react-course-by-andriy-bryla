export function ErrorDisplay({ error, message = "Помилка" }) {
  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="text-sm text-red-700">
        {message}: {error?.toString() || error}
      </div>
    </div>
  )
}
