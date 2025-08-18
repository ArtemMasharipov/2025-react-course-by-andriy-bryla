import { buildRoute } from '@/routes/routes.constants'
import AppButton from '@/shared/ui/AppButton'
import Spinner from '@/shared/ui/Spinner'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { teacherAPI } from '../api/teacher.api'
import TeacherList from '../components/TeacherList'
import { useTeachersWithMeetings } from '../hooks/useTeachersWithMeetings'

function MeetingStatus({ meeting }) {
  if (!meeting) return null
  const count = meeting.participants.length
  const base = 'space-y-1'
  if (count === 0) {
    return (
      <div className={base}>
        <p className="font-medium">Поточні збори: 0 / 2 учасників</p>
        <p className="text-xs sm:text-sm opacity-90">Поки що немає учасників. Додайте викладача (максимум 2).</p>
      </div>
    )
  }
  if (count === 1) {
    return (
      <div className={base}>
        <p className="font-medium">Поточні збори: 1 / 2 учасники</p>
        <p className="text-xs sm:text-sm opacity-90">Є 1 учасник. Можна додати ще одного.</p>
      </div>
    )
  }
  return (
    <div className={base}>
      <p className="font-medium">Поточні збори: 2 / 2 учасників</p>
      <p className="text-xs sm:text-sm opacity-90">Досягнуто максимум (2). Спочатку зніміть одного, щоб додати іншого.</p>
    </div>
  )
}

export default function TeachersPage() {
  const navigate = useNavigate()
  const { teachers, meeting, isFull, loading, error, actionId, assign, unassign, mutateTeachers, setMeeting } =
    useTeachersWithMeetings()
  const selectedIds = useMemo(() => new Set((meeting?.participants || []).map(String)), [meeting])

  const handleAdd = () => navigate(buildRoute.teacherNew())
  const handleEdit = id => navigate(buildRoute.teacherEdit(id))
  const handleAssign = assign
  const handleUnassign = unassign

  const handleDelete = async id => {
    if (!confirm('Видалити викладача? Цю дію не можна скасувати.')) return
  const prevTeachers = teachers
  const wasParticipant = !!meeting?.participants?.includes(id)
  mutateTeachers(ts => ts.filter(t => t._id !== id))
    if (wasParticipant) {
      const remaining = meeting.participants.filter(p => p !== id)
      setMeeting(remaining.length ? { ...meeting, participants: remaining } : null)
    }
    try {
      await teacherAPI.delete(id)
    } catch {
      mutateTeachers(() => prevTeachers)
      if (wasParticipant) setMeeting(meeting)
    }
  }

  if (loading) return <Spinner />
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <section className="space-y-4 sm:space-y-6">
      <header className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h1 className="text-xl sm:text-2xl font-semibold text-slate-800">Список викладачів</h1>
        <div className="flex">
          <AppButton onClick={handleAdd} className="w-full sm:w-auto">
            <span className="hidden sm:inline">Додати викладача</span>
            <span className="sm:hidden">Додати</span>
          </AppButton>
        </div>
      </header>

      {meeting && (
        <div className="p-3 sm:p-4 rounded-md bg-green-50 text-sm text-green-800 border border-green-200 space-y-2">
          <MeetingStatus meeting={meeting} />
        </div>
      )}

      <TeacherList
        teachers={teachers}
        selectedIds={selectedIds}
        onAssign={id => (isFull ? null : handleAssign(id))}
        onUnassign={handleUnassign}
        onDelete={handleDelete}
        loadingId={actionId}
        meetingFull={isFull}
        onAdd={handleAdd}
        onEdit={handleEdit}
      />
    </section>
  )
}
