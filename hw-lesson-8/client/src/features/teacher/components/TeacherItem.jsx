const DEFAULT_BG = 'bg-gradient-to-br from-slate-100 to-slate-200'

export default function TeacherItem({
  fullName,
  subject,
  photoBase64,
  selected = false,
  loading = false,
  onSelect,
  onUnassign,
  onDelete,
  onEdit,
  meetingFull = false,
  readonly = false,
}) {
  const baseCard = 'relative flex flex-col gap-4 p-4 rounded-lg border shadow-sm bg-white transition hover:shadow-md focus-within:shadow-md outline-none'
  const selectedRing = selected ? 'ring-2 ring-offset-2 ring-green-500' : 'hover:ring-1 hover:ring-green-300'
  const disabledOpacity = loading ? 'opacity-60 cursor-progress' : ''

  return (
    <li className={`${baseCard} ${selectedRing} ${disabledOpacity}`} tabIndex={0} aria-busy={loading} aria-selected={selected}>
      <div className="flex items-start gap-4 flex-1 min-w-0">
        {photoBase64 ? (
          <img
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover ring-2 ring-white shadow-sm flex-shrink-0"
            src={photoBase64}
            alt={fullName}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full ring-2 ring-white shadow-sm flex items-center justify-center text-lg sm:text-xl font-semibold text-slate-600 flex-shrink-0 ${DEFAULT_BG}`}
            aria-label={`Аватар ${fullName || ''}`.trim()}
            title={fullName}
          >
            {(fullName?.trim()?.[0] || '?').toUpperCase()}
          </div>
        )}
        <div className="space-y-1 min-w-0 flex-1">
          <h3 className="text-base font-semibold text-slate-800 truncate" title={fullName}>{fullName}</h3>
          <p className="text-sm text-slate-600 flex flex-col sm:flex-row sm:items-center gap-1">
            <span className="font-medium text-slate-700">Предмет:</span>
            <span className="truncate" title={subject}>{subject || '—'}</span>
          </p>
          {selected && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 ring-1 ring-inset ring-green-200 w-fit">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Вибрано
            </span>
          )}
        </div>
      </div>
      {!readonly && (
        <div className="flex flex-col gap-2 pt-2 border-t border-slate-100 sm:flex-row">
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-1">
            <button
              type="button"
              onClick={onEdit}
              disabled={loading}
              className="w-full sm:w-auto px-3 py-1.5 text-sm font-medium rounded-md border border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 transition-colors"
            >
              <span className="hidden sm:inline">Редагувати</span>
              <span className="sm:hidden">Ред.</span>
            </button>
            <button
              type="button"
              onClick={onDelete}
              disabled={loading}
              className="w-full sm:w-auto px-3 py-1.5 text-sm font-medium rounded-md border border-red-300 bg-red-50 text-red-700 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 transition-colors"
            >
              <span className="hidden sm:inline">Видалити</span>
              <span className="sm:hidden">Вид.</span>
            </button>
          </div>
          {selected ? (
            <button
              type="button"
              onClick={onUnassign}
              disabled={loading}
              className="w-full sm:w-auto px-3 py-1.5 text-sm font-medium rounded-md border border-green-400 bg-white text-green-700 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 transition-colors"
            >
              Зняти
            </button>
          ) : (
            <button
              type="button"
              onClick={onSelect}
              disabled={loading || meetingFull}
              className="w-full sm:w-auto px-3 py-1.5 text-sm font-medium rounded-md border border-green-500 bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-green-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              <span className="hidden sm:inline">{meetingFull ? 'Макс 2 учасники' : 'Вибрати на збори'}</span>
              <span className="sm:hidden">{meetingFull ? 'Макс 2' : 'Вибрати'}</span>
            </button>
          )}
        </div>
      )}
    </li>
  )
}
