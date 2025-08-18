import AppButton from '@/shared/ui/AppButton'
import { fileToBase64 } from '@/shared/utils/fileToBase64'
import { useEffect, useState } from 'react'
import AppSubjectSelect from '../../subject/components/SubjectSelect'

export default function TeacherForm({ initialData, onSubmit, onCancel, loading }) {
  const [fullName, setFullName] = useState(initialData?.fullName ?? '')
  const [subject, setSubject] = useState(initialData?.subject ?? '')
  const [photoBase64, setPhotoBase64] = useState(initialData?.photoBase64 || '')
  const [error, setError] = useState(null)

  useEffect(() => {
    if (initialData) {
      setFullName(initialData.fullName || '')
      setSubject(initialData.subject || '')
      setPhotoBase64(initialData.photoBase64 || '')
    }
  }, [initialData])

  const handleSubmit = e => {
    e.preventDefault()
    if (!fullName.trim()) {
      setError('Введіть ПІБ викладача')
      return
    }
    if (!subject.trim()) {
      setError('Оберіть предмет')
      return
    }
    setError(null)
  onSubmit({ fullName, subject, photoBase64 })
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-1">
        <label className="block text-sm font-medium text-slate-700">ПІБ викладача</label>
        <input
          type="text"
          className="w-full rounded-md border border-green-200 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-slate-100"
          value={fullName}
          onChange={e => setFullName(e.target.value)}
          disabled={loading}
          placeholder="Прізвище Ім'я По батькові"
        />
      </div>
      <div className="space-y-1">
        <label className="block text-sm font-medium text-slate-700">Предмет</label>
        <AppSubjectSelect value={subject} onChange={setSubject} disabled={loading} />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700">Аватар (до 1MB)</label>
        {photoBase64 ? (
          <img
            src={photoBase64}
            alt="Аватар"
            className="w-20 h-20 rounded-full object-cover ring-2 ring-green-200 shadow-sm"
          />
        ) : (
          <div
            className="w-20 h-20 rounded-full ring-2 ring-dashed ring-green-300 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center text-slate-400 text-xl font-semibold select-none"
            aria-label="Заглушка аватара"
            title="Заглушка аватара"
          >
            {(fullName.trim()[0] || '?').toUpperCase()}
          </div>
        )}
        <input
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/webp,image/gif"
          disabled={loading}
          onChange={async e => {
            const file = e.target.files?.[0]
            if (!file) return
            if (file.size > 1024 * 1024) {
              setError('Зображення більше 1MB')
              return
            }
            try {
              const base64 = await fileToBase64(file)
              setPhotoBase64(base64)
            } catch {
              setError('Не вдалося прочитати файл')
            }
          }}
          className="block w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-green-600 file:text-white hover:file:bg-green-700 disabled:opacity-60"
        />
        {photoBase64 && (
          <button
            type="button"
            onClick={() => setPhotoBase64('')}
            className="text-xs text-red-600 hover:underline"
            disabled={loading}
          >Очистити аватар</button>
        )}
      </div>
      {error && <p className="text-red-600 text-sm font-medium p-3 bg-red-50 border border-red-200 rounded-md">{error}</p>}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <AppButton type="submit" disabled={loading} className="w-full sm:w-auto">
          Зберегти
        </AppButton>
        {onCancel && (
          <AppButton type="button" onClick={onCancel} variant="outline" disabled={loading} className="w-full sm:w-auto">
            Скасувати
          </AppButton>
        )}
      </div>
    </form>
  )
}
