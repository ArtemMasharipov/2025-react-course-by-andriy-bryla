export default function Spinner({ size = 12, balls = 4 }) {
  const arr = Array.from({ length: balls })
  return (
    <div className="flex justify-center items-center py-10" role="status" aria-label="Завантаження...">
      <div className="flex gap-2">
        {arr.map((_, i) => (
          <span
            key={i}
            style={{ width: size, height: size, animationDelay: `${i * 120}ms` }}
            className="inline-block rounded-full bg-green-500/80 animate-bounce [animation-duration:900ms] shadow-sm"
          />
        ))}
      </div>
    </div>
  )
}
