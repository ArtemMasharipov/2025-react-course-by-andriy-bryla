import Spinner from '@/shared/ui/Spinner'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { teacherAPI } from '../../teacher/api/teacher.api'
import { TeacherItem } from '../../teacher/components'
import { meetingAPI } from '../api/meeting.api'

export default function MeetingsPage() {
  const navigate = useNavigate()
  const [meeting, setMeeting] = useState(null)
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
  const [m, ts] = await Promise.all([meetingAPI.get(), teacherAPI.getAll()])

  setMeeting(m)
      setTeachers(ts)
    } catch (e) {
      console.error(e)
      setError('Не вдалося завантажити дані')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  if (loading) return <Spinner />
  if (error) return <p className="text-red-500">{error}</p>

  const teacherById = id => teachers.find(t => t._id === id)

  const participants = meeting?.participants || []
  const enriched = participants.map(pid => teacherById(pid)).filter(Boolean)
  const count = enriched.length



  return (
    <section className="space-y-4 sm:space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl sm:text-2xl font-semibold text-slate-800">Учасники зборів</h1>
        <button
          type="button"
          onClick={() => navigate('/teachers')}
          className="inline-flex items-center justify-center rounded-md border border-green-500 bg-white px-3 py-2 text-sm font-medium text-green-700 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors w-full sm:w-auto"
        >
          <span className="hidden sm:inline">Повернутися до списку вчителів</span>
          <span className="sm:hidden">До списку вчителів</span>
        </button>
      </header>

      <div className="bg-green-50 border border-green-200 rounded-md p-3 sm:p-4">
        <p className="text-sm text-green-800 font-medium">
          Список вчителів ({enriched.length}) для виклику на збори
        </p>
      </div>

  {count > 0 && (
        <ul className="space-y-3">
          {enriched.map(t => (
            <TeacherItem
              key={t._id}
              fullName={t.fullName}
              subject={t.subject}
              photoBase64={t.photoBase64}
              selected={false}
              loading={false}
              readonly
            />
          ))}
        </ul>
      )}

  <p className="text-[11px] text-slate-500">Додавання/зняття учасників виконується тільки на сторінці вчителів.</p>
    </section>
  )
}
