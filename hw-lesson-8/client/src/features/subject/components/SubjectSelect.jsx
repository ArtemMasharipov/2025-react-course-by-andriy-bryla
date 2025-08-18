import subjects from '../subjects.constants'

export default function AppSubjectSelect({ value = '', onChange, disabled }) {
  const handleChange = (e) => {
    if (disabled) return
    onChange(e.target.value)
  }

  return (
    <select
      value={value}
      onChange={handleChange}
      disabled={disabled}
      className="w-full rounded-md border border-green-200 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-slate-100 disabled:cursor-not-allowed"
    >
      <option value="">Оберіть предмет...</option>
      {subjects.map(subject => (
        <option key={subject} value={subject}>
          {subject}
        </option>
      ))}
    </select>
  )
}
