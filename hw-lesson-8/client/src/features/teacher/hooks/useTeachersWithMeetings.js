import {
  startTransition,
  useCallback,
  useEffect,
  useMemo,
  useOptimistic,
  useState,
} from 'react'
import { meetingAPI } from '../../meetings/api/meeting.api'
import { teacherAPI } from '../api/teacher.api'

export function useTeachersWithMeetings() {
  const [teachers, setTeachers] = useState([])
  const [meeting, setMeeting] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [actionId, setActionId] = useState(null)

  // Optimistic meeting state reducer
  const [optimisticMeeting, applyOptimistic] = useOptimistic(
    meeting,
    (curr, action) => {
      if (!curr && action.type !== 'replace') curr = { participants: [] }
      switch (action.type) {
        case 'assign': {
          if (!curr) curr = { participants: [] }
          const id = String(action.id)
          if (curr.participants?.some(p => String(p) === id)) return curr
          // Limit: only 2 participants (business rule)
          if (curr.participants?.length >= 2) return curr
          return { ...curr, participants: [...curr.participants, id] }
        }
        case 'unassign': {
          if (!curr) return curr
          const id = String(action.id)
          const remaining = curr.participants.filter(p => String(p) !== id)
          return remaining.length ? { ...curr, participants: remaining } : null
        }
        case 'replace':
          return action.meeting || null
        default:
          return curr
      }
    }
  )

  // Helpers to keep code DRY
  const transitionApply = useCallback(
    action => {
      startTransition(() => {
        applyOptimistic(action)
      })
    },
    [applyOptimistic]
  )

  const syncMeeting = useCallback(
    m => {
      setMeeting(m || null)
      transitionApply({ type: 'replace', meeting: m || null })
    },
    [transitionApply]
  )

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [ts, m] = await Promise.all([teacherAPI.getAll(), meetingAPI.get()])
      setTeachers(ts)
      syncMeeting(m || null)
    } catch (e) {
      console.error(e)
      setError('Помилка завантаження')
    } finally {
      setLoading(false)
    }
  }, [syncMeeting])

  useEffect(() => {
    load()
  }, [load])

  const effectiveMeeting = optimisticMeeting ?? meeting
  const participants = useMemo(
    () => effectiveMeeting?.participants || [],
    [effectiveMeeting]
  )
  const isFull = participants.length >= 2

  const isAssigned = useCallback(
    id => participants.some(p => String(p) === String(id)),
    [participants]
  )

  // Generic mutate helper (assign / unassign)
  const mutate = useCallback(
    async (id, kind) => {
      const idStr = String(id)
      if (kind === 'assign') {
        if (isFull || isAssigned(idStr)) return
        transitionApply({ type: 'assign', id: idStr })
      } else if (kind === 'unassign') {
        if (!isAssigned(idStr)) return
        transitionApply({ type: 'unassign', id: idStr })
      }
      setActionId(idStr)
      try {
        const m = await (kind === 'assign'
          ? meetingAPI.assign(idStr)
          : meetingAPI.unassign(idStr))
        syncMeeting(m || null)
      } catch (e) {
        console.error(e)
        await load() // fallback reload
      } finally {
        setActionId(null)
      }
    },
    [isAssigned, isFull, transitionApply, syncMeeting, load]
  )

  const assign = id => mutate(id, 'assign')
  const unassign = id => mutate(id, 'unassign')

  return {
    teachers,
    meeting: effectiveMeeting,
    isFull,
    loading,
    error,
    actionId,
    reload: load,
    assign,
    unassign,
    mutateTeachers: updater => setTeachers(prev => updater(prev)),
    setMeeting: m => syncMeeting(m),
  }
}
